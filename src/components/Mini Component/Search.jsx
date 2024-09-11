import React from "react";
import { CiSearch } from "react-icons/ci";

function Search() {
  return (
    <div className="flex items-center rounded-full bg-white  dark:bg-gray-400 mt-6 px-4 py-2 w-80">
      <CiSearch className="text-black dark:text-white text-lg block float-left cursor-pointer mr-2" />
      <input
        type={"search"}
        placeholder="Search"
        className="text-base bg-transparent w-80 dark:text-white text-black  focus:outline-none"
      />
    </div>
  );
}

export default Search;
