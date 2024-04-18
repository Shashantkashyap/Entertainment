import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import Movies from "../components/Movies";
import Nav from "../components/Nav";
import { IoSearchSharp } from "react-icons/io5";
import { selectedSearch } from "../redux/searchSlice"; // Import your Redux action
import { useNavigate } from "react-router-dom";

function MoviePage() {
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const [searchValue, setSearchValue] = useState(""); // State to hold input value
  const navigate = useNavigate()
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    dispatch(selectedSearch(value)); // Dispatch action to update Redux state
  };

  return (
    <div>
      <div className="min-h-screen flex flex-row gap-5 p-6 max-md:flex-col">
        <div className="w-[5%] max-md:w-full">
          <Nav />
        </div>

        <div className="w-[90%] mx-auto flex flex-col gap-4">
          <div className="bg-[#10141E] mt-8 w-full">
            <div className="flex gap-10 items-center w-full max-md:gap-5">
              <IoSearchSharp
                color="white"
                fontSize={25}
                onClick={()=> navigate("/search")}
              />
              <input
                type="text"
                value={searchValue} // Bind input value to state
                onChange={handleInputChange} // Call handleInputChange on change
                className="bg-[#10141E] text-gray-400 text-[18px] w-[80%] border-none outline-none max-md:text-[16px]"
                placeholder="Search for movies or TV series"
              />
            </div>
          </div>

          <p className="text-[32px] p-6 text-white">Popular Movies : </p>

          <div className="mt-5 mx-auto ">
            <Movies />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
