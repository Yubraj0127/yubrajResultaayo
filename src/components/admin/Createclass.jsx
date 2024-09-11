

import React from "react";

function Createclass({ onClose }) {
  return (
    <div>
      <div className="bg-white flex rounded-3xl shadow-2xl max-w-3xl p-3 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-3xl font-bold"
        >
          &times;
        </button>

        <div className="sm:w-1/2 px=15">
          <div className="flex items-center mt-4">
            <img
              src="/assets/Addstudentorteacher.png"
              className="h-12 w-12 mr-2"
            />
            <h1 className="text-[#253553] underline text-2xl font-bold">
              Create Class
            </h1>
          </div>

          <form className="flex-col gap-2">
            
            <input
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl "
              type="text"
              placeholder="  Name"
            />
            <input
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              type="date"
              placeholder="  Result Date"
            />
            <input
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl "
              type="time"
              placeholder="    Result Time"
            />

            <button className="text-white shadow-xl font-bold bg-[#8AA4D6] w-80 p-3 mt-10 rounded-xl hover:bg-[#253553] duration-300">
              A D D 
            </button>
          </form>
        </div>

    
        <img className="rounded-3xl" src="/assets/popup.png" alt="" />
      </div>
    </div>
  );
}

export default Createclass
