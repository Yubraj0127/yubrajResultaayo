
// "use client";
// import React, { useState, useEffect } from "react";
// import supabase from "@/utils/client";

// // Function to convert Gregorian year to Nepali year
// const convertToNepaliYear = (year) => {
//   // This conversion may vary; adjust based on accurate conversion logic
//   return year + 56; // Rough approximation; adjust according to actual conversion
// };

// export default function CreateExam({ onClose }) {
//   const [examType, setExamType] = useState("");
//   const [teacherDeadlineDate, setTeacherDeadlineDate] = useState("");
//   const [teacherDeadlineTime, setTeacherDeadlineTime] = useState("");
//   const [resultDate, setResultDate] = useState("");
//   const [resultTime, setResultTime] = useState("");
//   const [classValue, setClassValue] = useState("");
//   const [year, setYear] = useState(""); // New state for year
//   const [yearOptions, setYearOptions] = useState([]); // State for year options

//   useEffect(() => {
//     // Generate year options based on current year
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear; i >= currentYear - 10; i--) {
//       years.push(i);
//     }
//     setYearOptions(years.map(year => ({
//       gregorian: year,
//       nepali: convertToNepaliYear(year)
//     })));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation to ensure all fields are filled
//     if (!examType || !teacherDeadlineDate || !teacherDeadlineTime || !resultDate || !resultTime || !classValue || !year) {
//       alert("Please fill in all fields");
//       return;
//     }

//     try {
//       // Insert data into the Supabase 'exam' table
//       const { data, error } = await supabase
//         .from("exam")
//         .insert([
//           {
//             examType,
//             teacherDeadlineDate,
//             teacherDeadlineTime,
//             resultDate,
//             resultTime,
//             class: classValue,
//             year, // Include year in the data to be inserted
//           },
//         ]);

//       if (error) {
//         throw error; // Throw the error to be caught by the catch block
//       } else {
//         console.log("Data inserted successfully:", data);
//         alert("Exam added successfully!");
//         onClose(); // Close the form after submission
//       }
//     } catch (error) {
//       console.error("Error inserting data:", error.message);
//       alert(`Failed to add exam. Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <div className="bg-white flex rounded-3xl shadow-2xl max-w-5xl p-3 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-3xl font-bold"
//         >
//           &times;
//         </button>

//         <div className="flex w-full">
//           <div className="w-2/3 px-4">
//             <div className="flex items-center mt-4">
//               <img
//                 src="/assets/Addstudentorteacher.png"
//                 className="h-12 w-12 mr-2"
//                 alt="Add Icon"
//               />
//               <h1 className="text-[#253553] underline text-2xl font-bold">
//                 Create Exam
//               </h1>
//             </div>

//             <form className="grid grid-cols-2 gap-4 mt-6" onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="year" className="block mb-2">
//                   Year:
//                 </label>
//                 <select
//                   className="txt p-2 rounded-xl border w-full h-10 shadow-xl"
//                   id="year"
//                   value={year}
//                   onChange={(e) => setYear(e.target.value)}
//                 >
//                   <option value="" disabled>Select Year</option>
//                   {yearOptions.map(({ gregorian, nepali }) => (
//                     <option key={gregorian} value={nepali}>
//                       {nepali} ({gregorian})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="examType" className="block mb-2">
//                   Exam Type:
//                 </label>
//                 <select
//                   className="txt p-2 rounded-xl border w-full h-10 shadow-xl"
//                   id="examType"
//                   value={examType}
//                   onChange={(e) => setExamType(e.target.value)}
//                 >
//                   <option value="">Select Exam Type</option>
//                   <option value="First Term">1st Term</option>
//                   <option value="2nd Terminal">2nd Term</option>
//                   <option value="3rd Terminal">3rd Term</option>
//                   <option value="Final Terminal">Final Term</option>
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="deadlineDate" className="block mb-2">
//                   Deadline Date for Teacher:
//                 </label>
//                 <input
//                   className="txt p-2 rounded-xl w-full h-10 border shadow-xl"
//                   type="date"
//                   id="deadlineDate"
//                   value={teacherDeadlineDate}
//                   onChange={(e) => setTeacherDeadlineDate(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="deadlineTime" className="block mb-2">
//                   Deadline Time for Teacher:
//                 </label>
//                 <input
//                   className="txt p-2 rounded-xl w-full h-10 border shadow-xl"
//                   type="time"
//                   id="deadlineTime"
//                   value={teacherDeadlineTime}
//                   onChange={(e) => setTeacherDeadlineTime(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="resultDate" className="block mb-2">
//                   Result Date:
//                 </label>
//                 <input
//                   className="txt p-2 rounded-xl w-full h-10 border shadow-xl"
//                   type="date"
//                   id="resultDate"
//                   value={resultDate}
//                   onChange={(e) => setResultDate(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="resultTime" className="block mb-2">
//                   Result Time:
//                 </label>
//                 <input
//                   className="txt p-2 rounded-xl w-full h-10 border shadow-xl"
//                   type="time"
//                   id="resultTime"
//                   value={resultTime}
//                   onChange={(e) => setResultTime(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="class" className="block mb-2">
//                   Class:
//                 </label>
//                 <select
//                   className="txt p-2 rounded-xl border w-full h-10 shadow-xl"
//                   id="class"
//                   value={classValue}
//                   onChange={(e) => setClassValue(e.target.value)}
//                 >
//                   <option value="" disabled>Select Class</option>
//                   {[...Array(10).keys()].map((num) => (
//                     <option key={num + 1} value={num + 1}>
//                       {num + 1}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-span-2 mt-6">
//                 <button
//                   type="submit"
//                   className="text-white shadow-xl font-bold bg-[#8AA4D6] w-80 p-3 mt-6 rounded-xl hover:bg-[#253553] duration-300"
//                 >
//                   A D D
//                 </button>
//               </div>
//             </form>
//           </div>

//           <div className="w-1/3">
//             <img
//               className="rounded-3xl w-full h-full object-cover"
//               src="/assets/popup.png"
//               alt="Popup"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import supabase from "@/utils/client";

// Function to convert Gregorian year to Nepali year
const convertToNepaliYear = (year) => {
  // This conversion may vary; adjust based on accurate conversion logic
  return year + 56; // Rough approximation; adjust according to actual conversion
};

export default function CreateExam({ onClose }) {
  const [examType, setExamType] = useState("");
  const [teacherDeadlineDate, setTeacherDeadlineDate] = useState("");
  const [teacherDeadlineTime, setTeacherDeadlineTime] = useState("");
  const [resultDate, setResultDate] = useState("");
  const [resultTime, setResultTime] = useState("");
  const [classValue, setClassValue] = useState("");
  const [year, setYear] = useState(""); // New state for year
  const [yearOptions, setYearOptions] = useState([]); // State for year options
  const [subject, setSubject] = useState(""); // New state for subject
  const [fullMarks, setFullMarks] = useState(""); // New state for full marks
  const [passMarks, setPassMarks] = useState(""); // New state for pass marks

  useEffect(() => {
    // Generate year options based on current year
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 10; i--) {
      years.push(i);
    }
    setYearOptions(years.map(year => ({
      gregorian: year,
      nepali: convertToNepaliYear(year)
    })));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure all fields are filled
    if (!examType || !teacherDeadlineDate || !teacherDeadlineTime || !resultDate || !resultTime || !classValue || !year || !subject || !fullMarks || !passMarks) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Insert data into the Supabase 'exam' table
      const { data, error } = await supabase
        .from("exam")
        .insert([
          {
            examType,
            teacherDeadlineDate,
            teacherDeadlineTime,
            resultDate,
            resultTime,
            class: classValue,
            year, // Include year in the data to be inserted
            subject,
            fullMarks,
            passMarks,
          },
        ]);

      if (error) {
        throw error; // Throw the error to be caught by the catch block
      } else {
        console.log("Data inserted successfully:", data);
        alert("Exam added successfully!");
        onClose(); // Close the form after submission
      }
    } catch (error) {
      console.error("Error inserting data:", error.message);
      alert(`Failed to add exam. Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="bg-white flex rounded-3xl shadow-2xl max-w-5xl p-3 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-3xl font-bold"
        >
          &times;
        </button>

        <div className="flex w-full">
          <div className="w-2/3 px-4">
            <div className="flex items-center mt-4">
              <img
                src="/assets/Addstudentorteacher.png"
                className="h-12 w-12 mr-2"
                alt="Add Icon"
              />
              <h1 className="text-[#253553] underline text-2xl font-bold">
                Create Exam
              </h1>
            </div>

            <form className="grid grid-cols-2 gap-4 mt-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="year" className="block mb-2">
                  Year:
                </label>
                <select
                  className="txt p-2 rounded-xl border w-full h-10 shadow-xl"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="" disabled>Select Year</option>
                  {yearOptions.map(({ gregorian, nepali }) => (
                    <option key={gregorian} value={nepali}>
                      {nepali} ({gregorian})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="examType" className="block mb-2">
                  Exam Type:
                </label>
                <select
                  className="txt p-2 rounded-xl border w-full h-10 shadow-xl"
                  id="examType"
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                >
                  <option value="">Select Exam Type</option>
                  <option value="First Term">1st Term</option>
                  <option value="2nd Terminal">2nd Term</option>
                  <option value="3rd Terminal">3rd Term</option>
                  <option value="Final Terminal">Final Term</option>
                </select>
              </div>

              <div>
                <label htmlFor="deadlineDate" className="block mb-2">
                  Deadline Date for Teacher:
                </label>
                <input
                  className="txt p-2 rounded-xl w-full h-10 border shadow-xl"
                  type="date"
                  id="deadlineDate"
                  value={teacherDeadlineDate}
                  onChange={(e) => setTeacherDeadlineDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="deadlineTime" className="block mb-2">
                  Deadline Time for Teacher:
                </label>
                <input
                  className="txt p-2 rounded-xl w-full h-10 border shadow-xl"
                  type="time"
                  id="deadlineTime"
                  value={teacherDeadlineTime}
                  onChange={(e) => setTeacherDeadlineTime(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="resultDate" className="block mb-2">
                  Result Date:
                </label>
                <input
                  className="txt p-2 rounded-xl w-full h-10 border shadow-xl"
                  type="date"
                  id="resultDate"
                  value={resultDate}
                  onChange={(e) => setResultDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="resultTime" className="block mb-2">
                  Result Time:
                </label>
                <input
                  className="txt p-2 rounded-xl w-full h-10 border shadow-xl"
                  type="time"
                  id="resultTime"
                  value={resultTime}
                  onChange={(e) => setResultTime(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="class" className="block mb-2">
                  Class:
                </label>
                <select
                  className="txt p-2 rounded-xl border w-full h-10 shadow-xl"
                  id="class"
                  value={classValue}
                  onChange={(e) => setClassValue(e.target.value)}
                >
                  <option value="" disabled>Select Class</option>
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2">
                  Subject:
                </label>
                <select
                  className="txt p-2 rounded-xl border w-full h-10 shadow-xl"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="" disabled>Select Subject</option>
                  <option value="Computer">Computer</option>
                  <option value="Science">Science</option>
                  <option value="Math">Math</option>
                  <option value="Nepali">Nepali</option>
                  <option value="Local subject">Local subject</option>
                  <option value="Social">Social</option>
                  <option value="English">English</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div>
                <label htmlFor="fullMarks" className="block mb-2">
                  Full Marks:
                </label>
                <input
                  className="txt p-2 rounded-xl w-full h-10 border shadow-xl"
                  type="number"
                  id="fullMarks"
                  value={fullMarks}
                  onChange={(e) => setFullMarks(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="passMarks" className="block mb-2">
                  Pass Marks:
                </label>
                <input
                  className="txt p-2 rounded-xl w-full h-10 border shadow-xl"
                  type="number"
                  id="passMarks"
                  value={passMarks}
                  onChange={(e) => setPassMarks(e.target.value)}
                />
              </div>

              <div className="col-span-2 mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-xl hover:bg-blue-600"
                >
                  Add Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
