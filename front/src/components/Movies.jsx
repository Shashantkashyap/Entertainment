import React, { useEffect, useState } from "react";
import fetchData from "../api/ApiHit";
import LoadingPage from "../components/Loading";
import { useDispatch } from "react-redux";
import { selectedCard } from "../redux/cardSlice";
import { useNavigate } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { IoIosBookmark } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function Movies() {
  const BaseUri = "https://entertainment-p1n8.onrender.com/api"
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to track hovered movie index
  const imageUri = "https://image.tmdb.org/t/p/original";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Array to store bookmark states for each movie
  const [bookmarkStates, setBookmarkStates] = useState([]);

  async function getPopularMovies() {
    setLoading(true);
    const data = await fetchData("movie/popular");
    setMovies(data.results);
    // Initialize bookmark states array with false for each movie
    setBookmarkStates(new Array(data.results.length).fill(false));
    setLoading(false);
  }

  useEffect(() => {
    getPopularMovies();
  }, []);

  // Function to toggle bookmark state for a specific movie
  const toggleBookmark = (index) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    } else {
      const ID = String(movies[index].id);
      axios
        .post(`${BaseUri}/addBookmark`, { id: ID }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log("Bookmark added successfully:", response.data);
          const newBookmarkStates = [...bookmarkStates];
          newBookmarkStates[index] = true;
          setBookmarkStates(newBookmarkStates);
          toast.success("Bookmark added successfully!");
        })
        .catch((error) => {
          console.error("Error adding bookmark:", error);
          toast.error("Failed to add bookmark. Please try again later.");
        });
    }
  };

  return (
    <div className="grid grid-cols-7 max-md:grid-cols-4 max-sm:grid-cols-2 gap-2">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Toaster />
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="flex flex-col items-center relative hover:scale-[1.05] transition-scale duration-500 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
              onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index on mouse leave
            >
              <img
                src={`${imageUri}/${movie.poster_path}`}
                alt={movie.title}
                className="w-[140px] rounded-lg"
              />
              <p className="text-center text-white mb-3 font-semibold mt-2">
                {movie.title}
              </p>
              {hoveredIndex === index && ( // Conditionally render absolute div when hovered
                <div className="absolute w-full">
                  <div className="text-[30px] absolute right-[10%] cursor-pointer">
                    {/* Use bookmarkStates[index] to determine which icon to display */}
                    {bookmarkStates[index] ? (
                      <IoIosBookmark
                        color="red"
                        onClick={() => {
                          toast.error("This movie is already bookmarked!");
                          toggleBookmark(index);
                        }}
                      />
                    ) : (
                      <CiBookmark
                        color="white"
                        onClick={() => toggleBookmark(index)}
                      />
                    )}
                  </div>
                  <div
                    className="rounded-full font-semibold py-1 px-4 border-[2px] absolute border-red-600 border-opacity-50 text-center top-[90px] left-[30%] text-white cursor-pointer bg-gray-900 bg-opacity-70"
                    onClick={() => {
                      dispatch(selectedCard(movie.id));
                      navigate("/details");
                    }}
                  >
                    Details
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Movies;
