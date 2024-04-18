import React from "react";
import LoadingPage from "../components/Loading";
import Nav from "../components/Nav";
import BookmarkFIles from "../components/BookmarkFIles";

function Bookmark() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <div className="min-h-screen flex flex-row gap-5 p-6 max-md:flex-col">
        <div className="w-[5%] max-md:w-full">
          <Nav />
        </div>

        <div>
          {token ? (
            <div className="">
                <BookmarkFIles/>
            </div>
          ) : (
            <div className="text-[35px] text-gray-400 p-6 max-md:text-[22px] max-md:p-2">
              You need to login first , to enjoy bookmark functionality . . .
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
