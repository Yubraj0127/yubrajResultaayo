
// "use client";

// import React, { useState, useEffect } from "react";
// import supabase from "@/utils/client";
// import Addstudent from "./Addstudent";

// export default function Studenttable() {
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedClass, setSelectedClass] = useState("");
//   const [students, setStudents] = useState([]);
//   const [showAddStudent, setShowAddStudent] = useState(false);

//   const years = ["2079", "2080", "2081"];
//   const classes = ["8", "9", "10"];

//   const handleYearChange = (e) => setSelectedYear(e.target.value);
//   const handleClassChange = (e) => setSelectedClass(e.target.value);

//   const showTable = selectedYear && selectedClass;

//   useEffect(() => {
//     if (showTable) {
//       const fetchStudents = async () => {
//         const { data, error } = await supabase
//           .from('students')
//           .select('*')
//           .eq('Year', selectedYear)
//           .eq('Class', selectedClass);

//         if (error) {
//           console.error('Error fetching students:', error);
//         } else {
//           setStudents(data);
//         }
//       };

//       fetchStudents();
//     }
//   }, [selectedYear, selectedClass]);

//   const handleEdit = (id) => {
//     console.log('Edit student with ID:', id);
//     // Logic for editing a student
//   };

//   const handleDelete = async (id) => {
//     const { error } = await supabase
//       .from('students')
//       .delete()
//       .eq('id', id);

//     if (error) {
//       console.error('Error deleting student:', error);
//     } else {
//       setStudents((prevStudents) => prevStudents.filter(student => student.id !== id));
//       console.log('Deleted student with ID:', id);
//     }
//   };

//   return (
//     <div className="relative overflow-x-auto shadow-md">
//       <div className="flex space-x-4 mb-4 p-4 justify-center mt-4">
//         <select
//           value={selectedYear}
//           onChange={handleYearChange}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
//         >
//           <option value="">Select Year</option>
//           {years.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//         <select
//           value={selectedClass}
//           onChange={handleClassChange}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
//         >
//           <option value="">Select Class</option>
//           {classes.map((cls) => (
//             <option key={cls} value={cls}>
//               {cls}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={() => setShowAddStudent(true)}
//           className="bg-[#8AA4D6] hover:bg-[#253553] hover:text-white text-gray-700 py-2 px-4 mt-4 rounded text-xs absolute top-4 right-4"
//         >
//           +Add Student
//         </button>

//         {showAddStudent && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
//             <Addstudent onClose={() => setShowAddStudent(false)} />
//           </div>
//         )}
//       </div>

//       {showTable && (
//         <>
//           <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900 mt-16"></div>
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-[#8AA4D6] dark:bg-gray-700 dark:text-gray-400">
//               <tr className="[&>th]:px-3 [&>th]:py-3 [&>th]:pr-9 [&>th]:border-r-4 [&>th]:border-r-white last:[&>th]:border-r-0">
//                 <th scope="col" className="p-4">
//                   <div className="flex items-center">
//                     <input
//                       id="checkbox-all-search"
//                       type="checkbox"
//                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <label htmlFor="checkbox-all-search" className="sr-only">
//                       checkbox
//                     </label>
//                   </div>
//                 </th>
//                 <th scope="col">ID</th>
//                 <th scope="col">Year</th>
//                 <th scope="col">Class</th>
//                 <th scope="col">Roll No</th>
//                 <th scope="col">Full Name</th>
//                 <th scope="col">E-mail</th>
//                 <th scope="col">Parent's Name</th>
//                 <th scope="col">Contact</th>
//                 <th scope="col">Address</th>
//                 <th scope="col">DOB</th>
//                 <th scope="col">Gender</th>
//                 <th scope="col">Username</th>
//                 <th scope="col">Password</th>
//                 <th scope="col">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student, index) => (
//                 <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                   <td className="w-4 p-4">
//                     <div className="flex items-center">
//                       <input
//                         id={`checkbox-table-search-${index}`}
//                         type="checkbox"
//                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                       />
//                       <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
//                         checkbox
//                       </label>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">{student.id}</td>
//                   <td className="px-6 py-4">{student.Year}</td>
//                   <td className="px-6 py-4">{student.Class}</td>
//                   <td className="px-6 py-4">{student.RollNo}</td>
//                   <th
//                     scope="row"
//                     className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
//                   >
//                     <img
//                       className="w-10 h-10 rounded-full"
//                       src={student.image}  // Ensure this is 'image' column from the database
//                       alt="Student image"
//                     />
//                     <div className="ps-3">
//                       <div className="text-base font-semibold">{student.Fullname}</div>
//                     </div>
//                   </th>
//                   <td className="px-6 py-4">{student.Email}</td>
//                   <td className="px-6 py-4">{student.ParentName}</td>
//                   <td className="px-6 py-4">{student.Contact}</td>
//                   <td className="px-6 py-4">{student.Address}</td>
//                   <td className="px-6 py-4">{student.DOB}</td>
//                   <td className="px-6 py-4">{student.Gender}</td>
//                   <td className="px-6 py-4">{student.username}</td>
//                   <td className="px-6 py-4">{student.password}</td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => handleEdit(student.id)}
//                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(student.id)}
//                       className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import supabase from "@/utils/client";
import Addstudent from "./Addstudent";

export default function Studenttable() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null); // New state for the student to be edited

  const years = ["2079", "2080", "2081"];
  const classes = ["8", "9", "10"];

  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleClassChange = (e) => setSelectedClass(e.target.value);

  const showTable = selectedYear && selectedClass;

  useEffect(() => {
    if (showTable) {
      const fetchStudents = async () => {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('Year', selectedYear)
          .eq('Class', selectedClass);

        if (error) {
          console.error('Error fetching students:', error);
        } else {
          setStudents(data);
        }
      };

      fetchStudents();
    }
  }, [selectedYear, selectedClass]);

  const handleEdit = (id) => {
    const studentToEdit = students.find(student => student.id === id);
    setCurrentStudent(studentToEdit); // Set the student to be edited
    setShowAddStudent(true); // Show the Addstudent form
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting student:', error);
    } else {
      setStudents((prevStudents) => prevStudents.filter(student => student.id !== id));
      console.log('Deleted student with ID:', id);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md">
      <div className="flex space-x-4 mb-4 p-4 justify-center mt-4">
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setCurrentStudent(null); // Reset current student when adding a new student
            setShowAddStudent(true);
          }}
          className="bg-[#8AA4D6] hover:bg-[#253553] hover:text-white text-gray-700 py-2 px-4 mt-4 rounded text-xs absolute top-4 right-4"
        >
          +Add Student
        </button>

        {showAddStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
            <Addstudent
              onClose={() => setShowAddStudent(false)}
              student={currentStudent} // Pass the current student data
              onSave={(updatedStudent) => {
                if (currentStudent) {
                  setStudents(students.map(student => student.id === updatedStudent.id ? updatedStudent : student));
                } else {
                  setStudents([...students, updatedStudent]);
                }
                setShowAddStudent(false);
              }}
            />
          </div>
        )}
      </div>

      {showTable && (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-[#8AA4D6] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* Table headers */}
                <th scope="col" className="p-4">ID</th>
                <th scope="col">Year</th>
                <th scope="col">Class</th>
                <th scope="col">Roll No</th>
                <th scope="col">Full Name</th>
                <th scope="col">E-mail</th>
                <th scope="col">Parent's Name</th>
                <th scope="col">Contact</th>
                <th scope="col">Address</th>
                <th scope="col">DOB</th>
                <th scope="col">Gender</th>
                <th scope="col">Username</th>
                <th scope="col">Password</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{student.id}</td>
                  <td className="px-6 py-4">{student.Year}</td>
                  <td className="px-6 py-4">{student.Class}</td>
                  <td className="px-6 py-4">{student.RollNo}</td>
                  <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={student.image} alt="Student image" />
                    <div className="ps-3">
                      <div className="text-base font-semibold">{student.Fullname}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{student.Email}</td>
                  <td className="px-6 py-4">{student.ParentName}</td>
                  <td className="px-6 py-4">{student.Contact}</td>
                  <td className="px-6 py-4">{student.Address}</td>
                  <td className="px-6 py-4">{student.DOB}</td>
                  <td className="px-6 py-4">{student.Gender}</td>
                  <td className="px-6 py-4">{student.username}</td>
                  <td className="px-6 py-4">{student.password}</td>
                  <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(student)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
