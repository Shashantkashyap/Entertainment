import React, { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from "../components/Nav";
import { IoSearchSharp } from "react-icons/io5";
import fetchData from "../api/ApiHit";
import { useDispatch } from "react-redux";
import { selectedCard } from "../redux/cardSlice";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/Loading";
import {selectedSearch} from "../redux/searchSlice"

function Home() {

  console.log(localStorage.getItem("token"))

  const [trendingValue, setTrendingValue] = useState([]);
  const [recommendedValue, setRecommendedValue] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [searchValue, setSearchValue] = useState(""); // State to hold input value

  const imageUri = "https://image.tmdb.org/t/p/original";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchTrendingData = useCallback(async () => {
    setLoading(true); // Set loading state to true when fetching data
    const data = await fetchData("trending/all/day");
    setTrendingValue(data.results);
    setLoading(false); // Set loading state to false when data fetching is complete
  }, []);

  const fetchRecommendedData = useCallback(async () => {
    setLoading(true); // Set loading state to true when fetching data
    const data = await fetchData("discover/movie");
    setRecommendedValue(data.results);
    setLoading(false); // Set loading state to false when data fetching is complete
  }, []);

  useEffect(() => {
    fetchTrendingData();
    fetchRecommendedData();
  }, [fetchTrendingData, fetchRecommendedData]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    dispatch(selectedSearch(value)); // Dispatch action to update Redux state
  };

  return (
    <div className="min-h-screen flex flex-row gap-5 p-6 max-md:flex-col">
      <div className="w-[5%] max-md:w-full">
        <Nav />
      </div>

      <div className="w-[90%] mx-auto flex flex-col gap-4">
        <div className="bg-[#10141E] mt-8 w-full">
          <div className="flex gap-10 items-center w-full max-md:gap-5" >
            <IoSearchSharp color="white" fontSize={25} onClick={()=> navigate("/search")}/>
            <input
              type="text"
              className="bg-[#10141E] text-gray-400 text-[18px] w-[80%] border-none outline-none max-md:text-[16px]"
              placeholder="Search for movies or TV series"
              value={searchValue} // Bind input value to state
                onChange={handleInputChange} // Call handleInputChange on change
            />
          </div>
        </div>

        {/* Trending */}
        <div className="">
          <p className="text-[32px] text-gray-100 mb-[11px] font-semibold">
            Trending :
          </p>

          {loading ? (
            <LoadingPage /> // Show loading page while data is fetching
          ) : (
            <Slider
              slidesToShow={3}
              slidesToScroll={1}
              infinite={true}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                  },
                },
              ]}
            >
              {trendingValue.map((val) => (
                <div key={val.id}>
                  <div
                    style={{
                      //for screen greater than sm
                      backgroundImage: `url(${imageUri}/${val.backdrop_path})`,

                     
                      backgroundSize: "cover", // Ensure image covers entire background
                    }}
                    className="w-[95%] max-sm:w-[100%] h-[220px] object-contain rounded-lg cursor-pointer hover:scale-[1.05] transition-scale duration-500"
                    onClick={() => {
                      dispatch(selectedCard(val.id));
                      navigate("/details");
                    }}
                  ></div>
                  <p className="text-[14px] mt-2 text-white text-center">
                    {val.original_title || val.name}
                  </p>
                </div>
              ))}
            </Slider>
          )}
        </div>

        <div>
          {/* Recommended */}
          <div className=" flex flex-col gap-3">
            <p className="text-[32px] text-gray-100 font-semibold">
              Recommended :
            </p>

            {loading ? (
              <LoadingPage /> // Show loading page while data is fetching
            ) : (
              <Slider
                slidesToShow={8}
                slidesToScroll={1}
                infinite={true}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 6,
                    },
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                    },
                  },
                ]}
              >
                {recommendedValue.map((val) => (
                  <div key={val.id}>
                    <div
                      style={{
                        backgroundImage: `url(${imageUri}/${val.poster_path})`,
                        backgroundSize: "cover", // Ensure image covers entire background
                      }}
                      className="w-[85%] h-[150px] object-contain rounded-lg cursor-pointer hover:scale-[1.05] transition-scale duration-500"
                      onClick={() => {
                        dispatch(selectedCard(val.id));
                        navigate("/details");
                      }}
                    ></div>
                    <p className="text-[14px] mt-2 text-white text-center">
                      {val.original_title || val.name}
                    </p>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
