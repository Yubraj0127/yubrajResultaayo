import React from "react";
import Image from "next/image";
import { IoIosNotificationsOutline } from "react-icons/io";

function Notice() {
  return (
    <div className=" cursor-pointer m-1 rounded-2xl flex flex-col justify-start items-center w-96 border-8 border-gradient-to-1 from-blue-300 via-white to-blue-300 bg-gradient-to-tr h-50 ">
      <div>
        <div className="flex justify-center items-center py-4">
          <div className=" rounded-lg- sepia" />
          <IoIosNotificationsOutline />

          <h1 className="text-neutral-700 font-bold text-3xl text-center">
            Notice
          </h1>
        </div>
        <p className="text-sm text-neutral-600 text-center mx-10">
          NOTICE TO TITLE{" "}
        </p>
      </div>
    </div>
  );
}

export default Notice;
