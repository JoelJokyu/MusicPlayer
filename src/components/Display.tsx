import React from "react";
import { Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";

const Display: React.FC = () => {
  return (
    <>
      <div className="w-full m-2 px-6 pt-4 rounded bg-[rgba(18,18,18,0.3)] backdrop-blur-xs text-white overflow-auto lg:w-[75%] lg:ml-0">
        <Routes>
          <Route path="/" element={<DisplayHome />} />
        </Routes>
      </div>
    </>
  );
};

export default Display;
