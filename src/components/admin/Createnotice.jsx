
// "use client";
// import React, { useState } from "react";
// import supabase from "@/utils/client";
// import { v4 as uuidv4 } from "uuid";

// function CreateNotice({ onClose }) {
//   const [title, setTitle] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title) {
//       alert("Please enter a title");
//       return;
//     }

//     setLoading(true);

//     try {
//       let imageUrl = null;

//       if (imageFile) {
//         const uniqueId = uuidv4();
//         const filePath = `Image/${uniqueId}_${imageFile.name}`;

//         const { data: uploadData, error: uploadError } = await supabase.storage
//           .from("Teacher")
//           .upload(filePath, imageFile);

//         if (uploadError) {
//           console.error("Upload Error:", uploadError.message);
//           throw uploadError;
//         }

//         const { data: imageUrlData, error: imageUrlError } = await supabase.storage
//           .from("Teacher")
//           .getPublicUrl(filePath);

//         if (imageUrlError) {
//           console.error("Get Public URL Error:", imageUrlError.message);
//           throw imageUrlError;
//         }

//         imageUrl = imageUrlData.publicUrl;
//       }

//       // Insert notice into the database
//       const { data: insertData, error: insertError } = await supabase
//         .from("notices")
//         .insert([
//           {
//             title,
//             image_url: imageUrl, // If no image, this will be null
//           },
//         ]);

//       if (insertError) {
//         console.error("Insert Error:", insertError.message);
//         throw insertError;
//       }

//       // Reset the form
//       setTitle("");
//       setImageFile(null);
//       onClose();
//     } catch (error) {
//       console.error("An error occurred:", error.message);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="bg-white flex rounded-3xl shadow-2xl max-w-3xl p-3 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-3xl font-bold"
//         >
//           &times;
//         </button>

//         <div className="sm:w-1/2 px-6">
//           <div className="flex items-center mt-4">
//             <img src="/assets/Addstudentorteacher.png" className="h-12 w-12 mr-2" />
//             <h1 className="text-[#253553] underline text-2xl font-bold">
//               _C r e a t e _ N o t i c e
//             </h1>
//           </div>

//           <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
//             <div>
//               <label className="block mb-2">Title</label>
//               <input
//                 className="txt p-2 w-80 rounded-xl border shadow-xl"
//                 type="text"
//                 placeholder="Enter title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="block mb-2">Image (Optional)</label>
//               <input
//                 className="txt p-2 w-80 rounded-xl border shadow-xl"
//                 type="file"
//                 onChange={handleFileChange}
//               />
//             </div>

//             <button
//               type="submit"
//               className="text-white shadow-xl font-bold bg-[#8AA4D6] w-80 p-3 mt-6 rounded-xl hover:bg-[#253553] duration-300"
//               disabled={loading}
//             >
//               {loading ? "Creating..." : "Create"}
//             </button>
//           </form>
//         </div>

//         <img className="rounded-3xl" src="/assets/popup.png" alt="" />
//       </div>
//     </div>
//   );
// }

// export default CreateNotice;
"use client";
import React, { useState, useEffect } from "react";
import supabase from "@/utils/client";
import { v4 as uuidv4 } from "uuid";

function CreateNotice({ notice, onClose }) {
  const [title, setTitle] = useState(notice ? notice.title : "");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notice) {
      setTitle(notice.title);
    } else {
      setTitle("");
    }
  }, [notice]);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please enter a title");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      if (imageFile) {
        const uniqueId = uuidv4();
        const filePath = `Image/${uniqueId}_${imageFile.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("Teacher")
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error("Upload Error:", uploadError.message);
          alert("Image upload failed. Please try again.");
          return;
        }

        const { data: imageUrlData, error: imageUrlError } = await supabase.storage
          .from("Teacher")
          .getPublicUrl(filePath);

        if (imageUrlError) {
          console.error("Get Public URL Error:", imageUrlError.message);
          alert("Failed to retrieve image URL. Please try again.");
          return;
        }

        imageUrl = imageUrlData.publicUrl;
      }

      // Insert or Update notice in the database
      const { data: insertData, error: insertError } = notice
        ? await supabase.from("notices").update({ title, image_url: imageUrl }).eq("id", notice.id)
        : await supabase.from("notices").insert([{ title, image_url: imageUrl }]);

      if (insertError) {
        console.error("Insert/Update Error:", insertError.message);
        alert("Failed to save notice. Please try again.");
        return;
      }

      // Reset the form
      setTitle("");
      setImageFile(null);
      onClose();
    } catch (error) {
      console.error("An error occurred:", error.message);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <img src="/notice.svg" alt="Notice" className="h-20 w-20" />
        <h1 className="text-2xl ml-4 font-bold text-[#253553]">{notice ? "Edit Notice" : "Create Notice"}</h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className={`bg-[#8AA4D6] text-white py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : notice ? "Update Notice" : "Save Notice"}
        </button>
      </form>
    </div>
  );
}

export default CreateNotice;
