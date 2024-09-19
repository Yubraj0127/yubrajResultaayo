
import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import supabase from "@/utils/client";

function Createclass({ onClose, updateDropdown }) {
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [Subjects, setSubjects] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear()); // Automatically set to current year

  const handleCreateClass = async (e) => {
    e.preventDefault();

    if (!className || !section || Subjects.length === 0) {
      alert("Please fill all fields");
      return;
    }

    // Insert the new class data into the 'classes' table
    const { error } = await supabase.from('classes').insert([
      {
        class: className,
        section: section,
        subject: Subjects.join(", "), // Store subjects as a comma-separated string
        year: year,
      }
    ]);

    if (error) {
      console.error("Error creating class:", error);
      alert("Failed to create class. Try again.");
    } else {
      alert("Class created successfully!");
      updateDropdown(className, section); // Update dropdown after class creation
      onClose(); // Close the modal after success
    }
  };

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
            <img src="/assets/Addstudentorteacher.png" className="h-12 w-12 mr-2" />
            <h1 className="text-[#253553] underline text-2xl font-bold">
              Create Class
            </h1>
          </div>
          <form className="flex flex-col gap-4 mt-6" onSubmit={handleCreateClass}>
            <div>
              <label className="block mb-2">Class:</label>
              <input
                className="txt p-2 w-80 rounded-xl border shadow-xl"
                type="text"
                placeholder="Enter Class"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2">Section:</label>
              <input
                className="txt p-2 w-80 rounded-xl border shadow-xl"
                type="text"
                placeholder="Enter section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2">Subject:</label>
              <TagsInput
                value={Subjects}
                onChange={setSubjects}
                name="Subjects"
                placeHolder="Enter Subjects"
              />
            </div>

            <button className="text-white shadow-xl font-bold bg-[#8AA4D6] w-80 p-3 mt-6 rounded-xl hover:bg-[#253553] duration-300">
              Create
            </button>
          </form>
        </div>

        <img className="rounded-3xl" src="/assets/popup.png" alt="" />
      </div>
    </div>
  );
}

export default Createclass;
