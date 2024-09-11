
// "use client";
// import React, { useState, useEffect } from "react";
// import supabase from "@/utils/client";

// function Addstudent({ onClose, student, onSave }) {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [address, setAddress] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [joinedYear, setJoinedYear] = useState("2080");
//   const [studentClass, setStudentClass] = useState("8");
//   const [rollNo, setRollNo] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [parentName, setParentName] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     if (student) {
//       setFullName(student.Fullname);
//       setEmail(student.Email);
//       setContact(student.Contact);
//       setAddress(student.Address);
//       setDob(student.DOB);
//       setGender(student.Gender);
//       setJoinedYear(student.Year);
//       setStudentClass(student.Class);
//       setRollNo(student.Rollno);
//       setUsername(student.username);
//       setPassword(student.password);
//       setParentName(student.Parentsname);
//     }
//   }, [student]);

//   const uploadImage = async () => {
//     if (!imageFile) return null;
    
//     const fileName = `${Date.now()}_${imageFile.name}`;
//     const { data, error } = await supabase.storage
//       .from("Student")
//       .upload(fileName, imageFile);

//     if (error) {
//       console.error("Error uploading image:", error.message);
//       alert("Error uploading image: " + error.message);
//       return null;
//     }

//     const imageUrl = supabase.storage
//       .from("Student")
//       .getPublicUrl(data.path).data.publicUrl;

//     return imageUrl;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const imageUrl = await uploadImage();
//       let data, error;
//       if (student) {
//         // Update existing student
//         const { data: updateData, error: updateError } = await supabase
//           .from("students")
//           .update({
//             Fullname: fullName,
//             Email: email,
//             Contact: contact,
//             Address: address,
//             DOB: dob,
//             Gender: gender,
//             Year: joinedYear,
//             Class: studentClass,
//             Rollno: rollNo,
//             Parentsname: parentName,
//             username: username,
//             password: password,
//             image: imageUrl || student.image, // If no new image, keep the old one
//           })
//           .eq("id", student.id);

//         data = updateData;
//         error = updateError;
//       } else {
//         // Add new student
//         const { data: insertData, error: insertError } = await supabase
//           .from("students")
//           .insert([
//             {
//               Fullname: fullName,
//               Email: email,
//               Contact: contact,
//               Address: address,
//               DOB: dob,
//               Gender: gender,
//               Year: joinedYear,
//               Class: studentClass,
//               Rollno: rollNo,
//               Parentsname: parentName,
//               username: username,
//               password: password,
//               image: imageUrl,
//               role: "student",
//             },
//           ]);

//         data = insertData;
//         error = insertError;
//       }

//       if (error) {
//         console.error("Error saving data:", error.message);
//         alert("Error saving student: " + error.message);
//         return;
//       }

//       setSuccessMessage("Student saved successfully!");
//       onSave(data[0]);
//       onClose();
//     } catch (error) {
//       console.error("Unexpected error occurred:", error.message);
//       alert("Unexpected error occurred: " + error.message);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
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

//         <div className="sm:w-1/2 px=15">
//           <div className="flex items-center mt-4">
//             <img
//               src="/assets/Addstudentorteacher.png"
//               className="h-12 w-12 mr-2"
//             />
//             <h1 className="text-[#253553] underline text-2xl font-bold">
//               ____A d d _ S t u d e n t
//             </h1>
//           </div>

//           {successMessage && (
//             <div className="text-green-600 text-center mb-4">
//               {successMessage}
//             </div>
//           )}

//           <form className="flex-col gap-2" onSubmit={handleSubmit}>
//             <select
//               className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
//               value={joinedYear}
//               onChange={(e) => setJoinedYear(e.target.value)}
//             >
//               <option value="2080">2080</option>
//               <option value="2081">2081</option>
//               <option value="2082">2082</option>
//             </select>

//             <select
//               className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
//               value={studentClass}
//               onChange={(e) => setStudentClass(e.target.value)}
//             >
//               <option value="8">8</option>
//               <option value="9">9</option>
//               <option value="10">10</option>
//             </select>

//             <input
//               className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//             <input
//               className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
//               type="text"
//               placeholder="Roll no"
//               value={rollNo}
//               onChange={(e) => setRollNo(e.target.value)}
//               required
//             />
//             <input
//               className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
//               type="email"
//               placeholder="E-mail"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
//               type="text"
//               placeholder="Parent's Name"
//               value={parentName}
//               onChange={(e) => setParentName(e.target.value)}
//               required
//             />
//             <input
//               className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
//               type="text"
//               placeholder="Contact"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//               required
//             />
//             <input
//               className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
//               type="text"
//               placeholder="Address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             />
//             <input
//               className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
//               type="date"
//               value={dob}
//               onChange={(e) => setDob(e.target.value)}
//               required
//             />
//             <input
//               className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
//               type="text"
//               placeholder="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             <input
//               className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
//               type="text"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <br />
//             <select
//               className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Others">Others</option>
//             </select>
//             <br />

//             <button
//               type="submit"
//               className="text-white shadow-xl font-bold bg-[#8AA4D6] w-80 p-3 mt-10 rounded-xl hover:bg-[#253553] duration-300"
//             >
//               {student ? "U P D A T E" : "A D D"}
//             </button>
//           </form>
//         </div>

//         <div className="w-1/3">
//           <label htmlFor="photo-upload" className="cursor-pointer">
//             <div className="rounded-full overflow-hidden">
//               <img
//                 src="/assets/Importimage.png"
//                 alt="Student Photo"
//                 className="absolute inset-0 max-h-32 max-w-32 object-top mt-[8%] ml-[55%]"
//               />
//             </div>
//           </label>

//           <input type="file" id="photo-upload" className="hidden" onChange={handleFileChange} />
//         </div>
//         <img className="rounded-3xl" src="/assets/popup.png" alt="" />
//       </div>
//     </div>
//   );
// }

// export default Addstudent;
"use client";
import React, { useState, useEffect } from "react";
import supabase from "@/utils/client";

function Addstudent({ onClose, student, onSave }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [joinedYear, setJoinedYear] = useState("2080");
  const [studentClass, setStudentClass] = useState("8");
  const [rollNo, setRollNo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [parentName, setParentName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); // State to hold image preview

  useEffect(() => {
    if (student) {
      setFullName(student.Fullname);
      setEmail(student.Email);
      setContact(student.Contact);
      setAddress(student.Address);
      setDob(student.DOB);
      setGender(student.Gender);
      setJoinedYear(student.Year);
      setStudentClass(student.Class);
      setRollNo(student.Rollno);
      setUsername(student.username);
      setPassword(student.password);
      setParentName(student.Parentsname);
      setImagePreview(student.image); // Display the existing student image, if any
    }
  }, [student]);

  const uploadImage = async () => {
    if (!imageFile) return null;

    const fileName = `${Date.now()}_${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from("Student")
      .upload(fileName, imageFile);

    if (error) {
      console.error("Error uploading image:", error.message);
      alert("Error uploading image: " + error.message);
      return null;
    }

    const imageUrl = supabase.storage
      .from("Student")
      .getPublicUrl(data.path).data.publicUrl;

    return imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage();
      let data, error;
      if (student) {
        // Update existing student
        const { data: updateData, error: updateError } = await supabase
          .from("students")
          .update({
            Fullname: fullName,
            Email: email,
            Contact: contact,
            Address: address,
            DOB: dob,
            Gender: gender,
            Year: joinedYear,
            Class: studentClass,
            Rollno: rollNo,
            Parentsname: parentName,
            username: username,
            password: password,
            image: imageUrl || student.image, // If no new image, keep the old one
          })
          .eq("id", student.id);

        data = updateData;
        error = updateError;
      } else {
        // Add new student
        const { data: insertData, error: insertError } = await supabase
          .from("students")
          .insert([
            {
              Fullname: fullName,
              Email: email,
              Contact: contact,
              Address: address,
              DOB: dob,
              Gender: gender,
              Year: joinedYear,
              Class: studentClass,
              Rollno: rollNo,
              Parentsname: parentName,
              username: username,
              password: password,
              image: imageUrl,
              role: "student",
            },
          ]);

        data = insertData;
        error = insertError;
      }

      if (error) {
        console.error("Error saving data:", error.message);
        alert("Error saving student: " + error.message);
        return;
      }

      setSuccessMessage("Student saved successfully!");
      onSave(data[0]);
      onClose();
    } catch (error) {
      console.error("Unexpected error occurred:", error.message);
      alert("Unexpected error occurred: " + error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Set the image preview
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
            <img
              src="/assets/Addstudentorteacher.png"
              className="h-12 w-12 mr-2"
            />
            <h1 className="text-[#253553] underline text-2xl font-bold">
              ____A d d _ S t u d e n t
            </h1>
          </div>

          {successMessage && (
            <div className="text-green-600 text-center mb-4">
              {successMessage}
            </div>
          )}

          <form className="flex-col gap-2" onSubmit={handleSubmit}>
            <select
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              value={joinedYear}
              onChange={(e) => setJoinedYear(e.target.value)}
            >
              <option value="2080">2080</option>
              <option value="2081">2081</option>
              <option value="2082">2082</option>
            </select>

            <select
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
            >
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>

            <input
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              type="text"
              placeholder="Roll no"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
            <input
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              type="text"
              placeholder="Parent's Name"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              required
            />
            <input
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              type="text"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <input
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            <input
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <select
              className="txt p-2 mt-6 w-80 rounded-xl border shadow-xl"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <button
              type="submit"
              className="bg-[#25538D] text-white font-bold py-2 px-4 rounded-xl mt-4"
            >
              Save
            </button>
          </form>
        </div>

        <div className="flex-col items-center justify-center">
          <div className="relative">
            <label
              htmlFor="imageInput"
              className="cursor-pointer"
            >
              <img
                src={imagePreview || "/assets/Uploadicon.png"}
                alt="Profile Preview"
                className="h-40 w-40 rounded-full object-cover border-4 border-gray-300"
              />
            </label>
            <input
              id="imageInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addstudent;
