import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingPage from "./Loading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { selectedCard } from "../redux/cardSlice";

function BookmarkFiles() {

  const BaseUri = "http://localhost:3000/api"
  const [IDs, setIDs] = useState([]);
  const [imdbID, setImdbID] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmark, setBookmark] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const imageUri = "https://image.tmdb.org/t/p/original";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to track whether the "Remove from Bookmark" button should be shown for each card
  const [showRemoveBookmark, setShowRemoveBookmark] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const res = await axios.get(`${BaseUri}/getBookmark`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setIDs(res.data.data);
    } catch (error) {
      console.error('Error fetching bookmark data:', error);
    }
  };

  const removeBookmark = async (idToRemove) => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const ID = String(idToRemove)
      await axios.post(`${BaseUri}/removeBookmark`, { id: ID }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
      toast.success("Bookmark removed successfully");
    } catch (error) {
      console.error('Error removing bookmark:', error);
      toast.error("Failed to remove bookmark");
    } finally {
      setLoading(false);
    }
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWQzYzBjODkwOWM5YWM5NzY1ODcyZmFkMzkyMzVmZSIsInN1YiI6IjY1NzQyNTZhN2EzYzUyMDEwY2RkN2Y5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pQzQYYdHD8xWI2oJT4Sp_X9JVyoqE9T2pQoFBEubyjA'
    }
  };

  const TMDBfiles = async () => {
    setLoading(true);
    const files = await Promise.all(
      IDs.map(async (id) => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/external_ids`,
            options
          );
          const data = await response.json();
          setLoading(false);
          return data;
        } catch (error) {
          console.error('Error fetching data:', error);
          return null;
        }
      })
    );

    setImdbID(files);
  };

  const getIMDBfiles = async () => {
    setLoading(true);
    try {
      const files = await Promise.all(
        imdbID.map(async (id) => {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/find/${id.imdb_id}?external_source=imdb_id`,
              options
            );
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error fetching data:', error);
            return null;
          }
        })
      );
      setBookmark(files);
      // Initialize the showRemoveBookmark state array with false values for each card
      setShowRemoveBookmark(Array(files.length).fill(false));
    } catch (error) {
      console.error('Error fetching IMDB files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (IDs.length > 0) {
      TMDBfiles();
    }
  }, [IDs]);

  useEffect(() => {
    if (imdbID.length > 0) {
      getIMDBfiles();
    }
  }, [imdbID]);

  return (
    <div>
      {bookmark.length === 0 ? (
        <div className="text-[35px] text-gray-400 p-6 max-md:text-[22px] max-md:p-2">You can make your personalized bookmark list</div>
      ):(
        <div className="grid grid-cols-7 max-md:grid-cols-4 max-sm:grid-cols-2 gap-2">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Toaster />
          {bookmark.map((movie, index) => (
            movie.movie_results.map((ele, idx) => ( // Use a separate index variable to avoid key conflicts
              <div
                key={index + idx} // Use a unique key for each item
                className="flex flex-col items-center relative hover:scale-[1.05] transition-scale duration-500 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={`${imageUri}/${ele.poster_path}`}
                  alt={movie.title}
                  className="w-[140px] rounded-lg"
                />
                <p className="text-center text-white mb-3 font-semibold mt-2">
                  {ele.title}
                </p>
                {hoveredIndex === index && (
                  <div className="absolute w-full">
                    <div className="absolute top-2 right-[15%]">
                      <BsThreeDotsVertical
                        fontSize={20}
                        color="white"
                        onClick={() => {
                          console.log("Clicked on three dots icon");
                          setSelectedMovieId(ele.id);
                          setShowRemoveBookmark(prevState => {
                            const newState = [...prevState];
                            newState[index] = true; // Show "Remove from Bookmark" button for this card
                            return newState;
                          });
                          console.log("Selected movie ID:", ele.id);
                        }}
                      />
                    </div>
                    {showRemoveBookmark[index] && (
                      <div className="absolute top-10 right-4 bg-gray-800 bg-opacity-50 p-2 rounded-md text-white text-[14px]">
                        <button onClick={() => removeBookmark(ele.id)}>Remove </button>
                      </div>
                    )}
                    <div
                      className="rounded-full font-semibold py-1 px-4 border-[2px] absolute border-red-600 border-opacity-50 text-center top-[90px] left-[30%] text-white cursor-pointer bg-gray-900 bg-opacity-70"
                      onClick={() => {
                        dispatch(selectedCard(ele.id));
                        navigate("/details");
                      }}
                    >
                      Details
                    </div>
                  </div>
                )}
              </div>
            ))
          ))}
        </>
      )}
    </div>
      )
    }
      
    </div>
    
  );
}

export default BookmarkFiles;
