import React from "react";
import RightArrow from "../assets/right_arrow-icon.svg";
import LeftArrow from "../assets/left_arrow-icon.svg";

const Navbar: React.FC = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            className="w-8 bg-amber-50 rounded-2xl p-2 cursor-pointer"
            src={LeftArrow}
            alt="left"
          />
          <img
            className="w-8 bg-amber-50 rounded-2xl p-2 cursor-pointer"
            src={RightArrow}
            alt="right"
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-amber-50 text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore
          </p>
          <p className="bg-gray-900 py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
            More
          </p>
          <p className="bg-linear-to-br from-fuchsia-700 to-gray-100 text-black w-7 h-7 rounded-full flex items-center justify-center">
            J
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">All</p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Music</p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Podcast</p>
      </div>
    </>
  );
};

export default Navbar;
