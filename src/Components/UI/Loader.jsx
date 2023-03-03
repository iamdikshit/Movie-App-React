import React from "react";
import { IoReloadOutline } from "react-icons/io5";
const Loader = () => {
  return (
    <div className="bg-white mt-24 rounded-sm bg-opacity-20 backdrop-blur w-full p-4 flex justify-center">
      <div>
        <IoReloadOutline className="text-white w-6 h-6 animate-spin " />
      </div>
    </div>
  );
};

export default Loader;
