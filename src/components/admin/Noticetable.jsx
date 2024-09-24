
// "use client";
// import React, { useState, useEffect } from "react";
// import Createnotice from "./Createnotice";
// import supabase from "@/utils/client"; 

// export default function Noticetable() {
//   const [showCreateNotice, setShowCreateNotice] = useState(false);
//   const [showEditNotice, setShowEditNotice] = useState(false);
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentNotice, setCurrentNotice] = useState(null);

//   useEffect(() => {
//     const fetchNotices = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const { data, error } = await supabase
//           .from("notices")
//           .select("*")
//           .order("created_at", { ascending: false });

//         if (error) throw new Error(error.message);

//         setNotices(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotices();
//   }, [showCreateNotice, showEditNotice]);

//   const handleEditNotice = (notice) => {
//     setCurrentNotice(notice);
//     setShowEditNotice(true);
//   };

//   const handleDeleteNotice = async (id) => {
//     const { error } = await supabase
//       .from("notices")
//       .delete()
//       .eq("id", id);

//     if (error) {
//       console.error("Error deleting notice:", error);
//       return;
//     }

//     // Refresh notices after deletion
//     setNotices((prevNotices) => prevNotices.filter(notice => notice.id !== id));
//   };

//   return (
//     <div className="relative overflow-x-auto shadow-md">
//       <button
//         onClick={() => setShowCreateNotice(true)}
//         className="bg-[#8AA4D6] hover:bg-[#253553] hover:text-white text-gray-700 py-2 px-4 mt-4 rounded text-xs absolute top-4 right-4"
//       >
//         +Create Notice
//       </button>

//       {showCreateNotice && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
//           <Createnotice onClose={() => setShowCreateNotice(false)} />
//         </div>
//       )}

//       {showEditNotice && currentNotice && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
//           <Createnotice
//             notice={currentNotice}
//             onClose={() => {
//               setShowEditNotice(false);
//               setCurrentNotice(null);
//             }}
//           />
//         </div>
//       )}

//       <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900 mt-20"></div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : notices.length === 0 ? (
//         <p>No notices available.</p>
//       ) : (
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-[#8AA4D6] dark:bg-gray-700 dark:text-gray-400">
//             <tr className="[&>th]:px-3 [&>th]:py-3 [&>th]:pr-9 [&>th]:border-r-4 [&>th]:border-r-white last:[&>th]:border-r-0">
//               <th scope="col" className="p-4">
//                 <div className="flex items-center">
//                   <input
//                     id="checkbox-all-search"
//                     type="checkbox"
//                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   />
//                   <label htmlFor="checkbox-all-search" className="sr-only">
//                     checkbox
//                   </label>
//                 </div>
//               </th>
//               <th scope="col">DATE CREATED</th>
//               <th scope="col">TITLE</th>
//               <th scope="col">PICTURE</th>
//               <th scope="col">ACTION</th>
//             </tr>
//           </thead>
//           <tbody>
//             {notices.map((notice) => (
//               <tr
//                 key={notice.id}
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//               >
//                 <td className="w-4 p-4">
//                   <div className="flex items-center">
//                     <input
//                       id={`checkbox-${notice.id}`}
//                       type="checkbox"
//                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <label htmlFor={`checkbox-${notice.id}`} className="sr-only">
//                       checkbox
//                     </label>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">{new Date(notice.created_at).toLocaleDateString()}</td>
//                 <td className="px-6 py-4">{notice.title}</td>
//                 <td className="px-6 py-4">
//                   {notice.image_url ? (
//                     <img
//                       src={notice.image_url}
//                       alt={notice.title}
//                       className="h-20 w-20 object-cover"
//                     />
//                   ) : (
//                     "No Image"
//                   )}
//                 </td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => handleEditNotice(notice)}
//                     className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteNotice(notice.id)}
//                     className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import Createnotice from "./Createnotice";
import supabase from "@/utils/client";

export default function Noticetable() {
  const [showCreateNotice, setShowCreateNotice] = useState(false);
  const [showEditNotice, setShowEditNotice] = useState(false);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentNotice, setCurrentNotice] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("notices")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw new Error(error.message);

        setNotices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [showCreateNotice, showEditNotice]);

  const handleEditNotice = (notice) => {
    setCurrentNotice(notice);
    setShowEditNotice(true);
  };

  const handleDeleteNotice = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("notices")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting notice:", error);
      return;
    }

    // Optimistically update the notices array
    setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== id));
  };

  return (
    <div className="relative overflow-x-auto shadow-md">
      <button
        onClick={() => setShowCreateNotice(true)}
        className="bg-[#8AA4D6] hover:bg-[#253553] hover:text-white text-gray-700 py-2 px-4 mt-4 rounded text-xs absolute top-4 right-4"
      >
        + Create Notice
      </button>

      {showCreateNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
          <Createnotice onClose={() => setShowCreateNotice(false)} />
        </div>
      )}

      {showEditNotice && currentNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
          <Createnotice
            notice={currentNotice}
            onClose={() => {
              setShowEditNotice(false);
              setCurrentNotice(null);
            }}
          />
        </div>
      )}

      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900 mt-20"></div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : notices.length === 0 ? (
        <p>No notices available.</p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-[#8AA4D6] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col">DATE CREATED</th>
              <th scope="col">TITLE</th>
              <th scope="col">PICTURE</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-${notice.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor={`checkbox-${notice.id}`} className="sr-only">checkbox</label>
                  </div>
                </td>
                <td className="px-6 py-4">{new Date(notice.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">{notice.title}</td>
                <td className="px-6 py-4">
                  {notice.image_url ? (
                    <img src={notice.image_url} alt={notice.title} className="h-20 w-20 object-cover" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditNotice(notice)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
