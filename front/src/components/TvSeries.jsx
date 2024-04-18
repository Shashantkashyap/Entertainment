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

function Series() {
  const BaseUri = "http://localhost:3000/api"
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null); // State to track hovered series index
  const imageUri = "https://image.tmdb.org/t/p/original";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookmarkStates, setBookmarkStates] = useState([]); // State to store bookmark states for each series

  async function getPopularTvSeries() {
    setLoading(true);
    const data = await fetchData("tv/popular");
    setSeries(data.results);
    // Initialize bookmark states array with false for each series
    setBookmarkStates(new Array(data.results.length).fill(false));
    setLoading(false);
  }

  useEffect(() => {
    getPopularTvSeries();
  }, []);

  // Function to toggle bookmark state for a specific series
  const toggleBookmark = (index) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    } else {
      const ID = String(series[index].id);
      axios
        .post(
          `${BaseUri}/addBookmark`,
          { id: ID },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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
      <Toaster />
      {loading ? (
        <LoadingPage />
      ) : (
        series.map((series, index) => (
          <div
            key={series.id}
            className="flex flex-col items-center relative hover:scale-[1.05] transition-scale duration-500 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
            onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index on mouse leave
            
          >
            <img
              src={`${imageUri}/${series.poster_path}`}
              alt={series.name}
              className="w-[140px] rounded-lg"
            />
            <p className="text-center text-white mb-3 font-semibold mt-2">
              {series.name}
            </p>
            {hoveredIndex === index && ( // Conditionally render absolute div when hovered
              <div className="absolute w-full">
                <div className="text-[30px] absolute right-[10%] cursor-pointer">
                  {/* Use bookmarkStates[index] to determine which icon to display */}
                  {bookmarkStates[index] ? (
                    <IoIosBookmark
                      color="red"
                      onClick={() => {
                        toast.error("This series is already bookmarked!");
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
                    dispatch(selectedCard(series.id));
                    navigate("/details");
                  }}
                >
                  Details
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Series;
