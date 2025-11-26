import React from "react";
import Home from "../assets/home-icon.svg";
import Search from "../assets/search-icon.svg";
import Stack from "../assets/stack-icon.svg";
import Right_Arrow from "../assets/right_arrow-icon.svg";
import Plus from "../assets/plus-icon.svg";

const Sidebar: React.FC = () => {
  return (
    <>
      <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
        <div className="bg-[rgba(18,18,18,0.7)] h-[15%] rounded flex flex-col justify-around backdrop-blur-xs">
          <div className="flex items-center gap-3 pl-8 cursor-pointer">
            <img
              className="w-6 bg-amber-50"
              src={Home}
              alt="home-icon"
              loading="lazy"
            />
            <p className="font-bold text-white">Welcome Joel</p>
          </div>
          <div className="flex items-center gap-3 pl-8 cursor-pointer">
            <img
              className="w-6 bg-amber-50"
              src={Search}
              alt="search-icon"
              loading="lazy"
            />
            <p className="font-bold text-white">Search</p>
          </div>
        </div>
        <div className="bg-[rgba(18,18,18,0.7)] h-[85%] rounded backdrop-blur-xs">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                className="w-8 bg-amber-50"
                src={Stack}
                alt="stack-icon"
                loading="lazy"
              />
              <p className="font-semibold">Library</p>
            </div>
            <div className="flex items-center gap-3">
              <img
                className="w-5 bg-amber-50 hover:bg-amber-500"
                src={Right_Arrow}
                alt="arrow-icon"
                loading="lazy"
              />
              <img
                className="w-5 bg-amber-50 hover:bg-amber-500"
                src={Plus}
                alt="add-icon"
                loading="lazy"
              />
            </div>
          </div>
          <div className="p-4 bg-[rgba(36,36,36,0.9)] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 backdrop-blur-md">
            <h1>Create First Playlist</h1>
            <p className="font-light">we will guide you</p>
            <button className="px-4 py-1.5 hover:bg-white text-[15px] text-black rounded-full mt-4">
              Create Playlist
            </button>
          </div>
          <div className="p-4 bg-[rgba(36,36,36,0.9)] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4 backdrop-blur-md">
            <h1>Feeling Podcasts?</h1>
            <p className="font-light">stay tuned for new episodes</p>
            <button className="px-4 py-1.5 hover:bg-white text-[15px] text-black rounded-full mt-4">
              Browse Podcasts
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
