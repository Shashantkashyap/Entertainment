import React, { useState } from "react";
import { MdMovie } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { PiTelevisionDuotone } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Nav.css"

function Nav() {
  const token = localStorage.getItem("token")
  const [active, setActive] = useState(0);
  const [blockVisible, setBlockVisible] = useState(false);
  const navigate = useNavigate();

  const handleHome = () => {
    setActive(1);
    navigate("/");
  };
  const handleMovie = () => {
    setActive(2);
    navigate("/movies");
  };
  const handleSeries = () => {
    setActive(3);
    navigate("/tvSeries");
  };
  const handleBookmark = () => {
    setActive(4);
    navigate("/bookmark");
  };

  const handleImageClick = () => {
    setBlockVisible(!blockVisible);
  };

  const handleEnjoy = () => {
    // Implement signin logic here
    navigate("/")
    setBlockVisible(false); // Hide the block after signin
  };

  const handleLogout = () => {
    // Implement logout logic here
    navigate("/auth")
    setBlockVisible(false); // Hide the block after logout
  };

  return (
    <div className="bg-[#161D2F] w-full rounded-xl">
      <div className="flex flex-col items-center justify-between lg:min-h-[93vh] max-md:w-full max-md:flex-row max-md:item-center max-md:justify-evenly max-md:p-2">
        <div className="flex flex-col max-md:flex-row max-md:items-center items-center gap-12 max-sm:gap-4">
          <div className="mt-8 max-md:mt-0 cursor-pointer" onClick={() => setActive(0)}>
            <MdMovie color="#FF0800" fontSize={35} />
          </div>

          <div className="flex flex-col max-md:flex-row gap-7 max-sm:gap-2">
            <IoIosHome
              color={active === 1 ? "red" : "white"}
              fontSize={25}
              onClick={handleHome}
              className="cursor-pointer"
            />

            <IoNewspaper
              color={active === 2 ? "red" : "white"}
              fontSize={25}
              onClick={handleMovie}
              className="cursor-pointer"
            />

            <PiTelevisionDuotone
              color={active === 3 ? "red" : "white"}
              fontSize={25}
              onClick={handleSeries}
              className="cursor-pointer"
            />

            <FaBookmark
              color={active === 4 ? "red" : "white"}
              fontSize={25}
              onClick={handleBookmark}
              className="cursor-pointer"
            />
          </div>
        </div>

        <div className="mb-10 max-md:mb-0 " onClick={handleImageClick}>
          <img
            src="https://w0.peakpx.com/wallpaper/764/399/HD-wallpaper-funny-boy-boy-crazy-cute-funny.jpg"
            alt=""
            className="w-8 h-8 rounded-full cursor-pointer"
          />


        </div>
      </div>
      

      {blockVisible && (
        <div className="block absolute top-0 left-[20%]  rounded-md p-3 w-[50%] bg-gradient-to-tr from-[#161D2F] via-[#5A698F] to-[#161D2F] ">
          <button onClick={handleEnjoy} className="w-1/2 text-[20px] leading-relaxed tracking-wider font-semibold text-gray-200 hover:scale-110 transition-scale duration-300">Enjoy</button>
          <button onClick={handleLogout} className="w-1/2 text-[20px] leading-relaxed tracking-wider font-semibold text-gray-200 hover:scale-110 transition-scale duration-300">
          {token ? <div onClick={()=> localStorage.removeItem("token")}>Logout</div> : <div onClick={()=> navigate("/auth")}>SignIn</div>}
          </button>
          
        </div>
      )}


    </div>
  );
}

export default Nav;

