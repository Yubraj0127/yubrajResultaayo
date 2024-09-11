
"use client";

import React, { useState, useEffect } from "react";
import supabase from "@/utils/client"; // Import Supabase client
import Createexam from "@/components/admin/Createexam";

export default function Examtable() {
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [examData, setExamData] = useState([]); // State to hold the retrieved exam data

  // Determine whether to show the table based on the selected options
  const showTable = selectedYear && selectedExamType && selectedClass;

  // Fetch exam data whenever the selected options change
  useEffect(() => {
    if (showTable) {
      fetchExamData();
    }
  }, [selectedYear, selectedExamType, selectedClass]);

  // Function to fetch exam data from Supabase
  const fetchExamData = async () => {
    try {
      let { data, error } = await supabase
        .from("exam")
        .select("*")
        .eq("year", selectedYear)
        .eq("examType", selectedExamType)
        .eq("class", selectedClass);

      if (error) {
        console.error("Error fetching exam data:", error.message);
      } else {
        setExamData(data);
      }
    } catch (error) {
      console.error("Error fetching exam data:", error.message);
    }
  };

  return (
    <div className="relative overflow-x-auto mt-7">
      <div className="flex justify-center items-center mb-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-3"
        >
          <option value="">Select Year</option>
          <option value="2080">2080</option>
          <option value="2081">2081</option>
        </select>
        <select
          value={selectedExamType}
          onChange={(e) => setSelectedExamType(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-3"
        >
          <option value="">Select Exam Type</option>
          <option value="1st Terminal">1st Terminal</option>
          <option value="2nd Terminal">2nd Terminal</option>
          <option value="3rd Terminal">3rd Terminal</option>
          <option value="Final Terminal">Final Terminal</option>
        </select>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-3"
        >
          <option value="">Select Class</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>

        <div className="flex space-x-2 absolute right-4">
          <button
            onClick={() => setShowCreateExam(true)}
            className="bg-[#8AA4D6] hover:bg-[#253553] hover:text-white text-gray-700 py-2 px-4 rounded text-xs"
          >
            +Create Exam
          </button>
          <button className="bg-[#8AA4D6] hover:bg-[#253553] hover:text-white text-gray-700 py-2 px-4 rounded text-xs">
            Edit
          </button>
          <button className="bg-[#8AA4D6] hover:bg-[#253553] hover:text-white text-gray-700 py-2 px-4 rounded text-xs">
            Delete
          </button>
        </div>
      </div>

      {showCreateExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
          <Createexam onClose={() => setShowCreateExam(false)} />
        </div>
      )}

      {showTable && examData.length > 0 && (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-9">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Subject
              </th>
              <th scope="col" className="px-6 py-3">
                Full Marks
              </th>
              <th scope="col" className="px-6 py-3">
                Pass Marks
              </th>
            </tr>
          </thead>
          <tbody>
            {examData.map((exam) => (
              <tr
                key={exam.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{exam.subject}</td>
                <td className="px-6 py-4">{exam.fullMarks}</td>
                <td className="px-6 py-4">{exam.passMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showTable && examData.length === 0 && (
        <div className="mt-9 text-center text-gray-500">
          No exam data available for the selected criteria.
        </div>
      )}
    </div>
  );
}
