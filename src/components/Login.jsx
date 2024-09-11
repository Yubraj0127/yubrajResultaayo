// "use client";
// import React, { useState } from 'react';
// import supabase from '@/utils/client';
// import { useRouter } from 'next/navigation';

// export default function Login({ onClose }) {
//   const [Username, setUsername] = useState('');
//   const [Password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const router = useRouter();

//   const signIn = async (e) => {
//     e.preventDefault();

//     // Check if the username and password are "admin"
//     if (Username === 'admin' && Password === 'admin') {
//       router.push('/admin');
//       return;
//     }

//     try {
//       // Attempt to fetch the user with the matching username and password
//       const { data, error } = await supabase
//         .from('teachers')
//         .select('username, password, role')
//         .eq('username', Username)
//         .eq('password', Password)
//         .single(); // Use single to get one record

//       // Debugging: Log the data and error
//       console.log('Data:', data);
//       console.log('Error:', error);

//       if (error || !data) {
//         // If there's an error or no data was found, set an error message
//         setErrorMessage('Invalid login credentials');
//         return;
//       }

//       // Check the role and redirect accordingly
//       if (data.role === 'teacher') {
//         router.push('/teacher');
//       } else if (data.role === 'student') {
//         router.push('/student');
//       } else {
//         setErrorMessage('Unauthorized role');
//       }
//     } catch (error) {
//       // Catch any other unexpected errors
//       console.error('Unexpected error:', error);
//       setErrorMessage('An unexpected error occurred');
//     }
//   };

//   return (
//     <div className="bg-gray-100 flex rounded-xl shadow-lg max-w-4xl p-6 relative">
//       <button
//         onClick={onClose}
//         className="absolute top-2 right-2 text-red-600 hover:text-gray-300 text-3xl font-bold"
//       >
//         &times;
//       </button>
//       <div className="sm:w-1/2 px=18">
//         <br />
//         <br />
//         <h1 className="text-[#253553] text-3xl font-bold flex items-center justify-center">
//           L O G I N
//         </h1>
//         <p className="text-[#253553] text-l mt-4 flex items-center justify-center">
//           If you're a registered member, log in here.
//         </p>
//         {errorMessage && (
//           <p className="text-red-500 text-center mt-4">{errorMessage}</p>
//         )}
//         <form onSubmit={signIn} className="flex-col gap-2">
//           <input
//             className="txt p-3 mt-8 w-72 rounded-xl border"
//             type="text"
//             placeholder="Username"
//             value={Username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <br />
//           <input
//             className="txt p-3 mt-8 w-72 rounded-xl border"
//             type="password"
//             placeholder="Password"
//             value={Password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <br />
//           <button
//             className="text-white font-bold bg-[#8AA4D6] w-72 p-3 mt-10 rounded-xl hover:bg-[#253553] duration-300"
//             type="submit"
//           >
//             L O G I N
//           </button>
//         </form>
//       </div>
//       <div className="sm:block hidden w-1/2">
//         <img
//           className="rounded-2xl"
//           src="/assets/popup.png"
//           alt="Login Illustration"
//         />
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState } from 'react';
import supabase from '@/utils/client';
import { useRouter } from 'next/navigation';

export default function Login({ onClose }) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const signIn = async (e) => {
    e.preventDefault();

    // Check if the username and password are "admin"
    if (Username === 'admin' && Password === 'admin') {
      router.push('/admin');
      return;
    }

    try {
      // Attempt to fetch the user with the matching username and password from teachers table
      let { data, error } = await supabase
        .from('teachers')
        .select('username, password, role')
        .eq('username', Username)
        .eq('password', Password)
        .single(); // Use single to get one record

      if (error || !data) {
        // If no matching teacher, check the students table
        const studentData = await supabase
          .from('students')
          .select('username, password, role')
          .eq('username', Username)
          .eq('password', Password)
          .single();

        data = studentData.data;
        error = studentData.error;
      }

      if (error || !data) {
        // If there's an error or no data was found in either table, set an error message
        setErrorMessage('Invalid login credentials');
        return;
      }

      // Check the role and redirect accordingly
      if (data.role === 'teacher') {
        router.push('/teacher'); // Redirect to teacher dashboard
      } else if (data.role === 'student') {
        router.push('/student'); // Redirect to student dashboard
      } else {
        setErrorMessage('Unauthorized role');
      }
    } catch (error) {
      // Catch any other unexpected errors
      console.error('Unexpected error:', error);
      setErrorMessage('An unexpected error occurred');
    }
  };

  return (
    <div className="bg-gray-100 flex rounded-xl shadow-lg max-w-4xl p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-red-600 hover:text-gray-300 text-3xl font-bold"
      >
        &times;
      </button>
      <div className="sm:w-1/2 px=18">
        <br />
        <br />
        <h1 className="text-[#253553] text-3xl font-bold flex items-center justify-center">
          L O G I N
        </h1>
        <p className="text-[#253553] text-l mt-4 flex items-center justify-center">
          If you're a registered member, log in here.
        </p>
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
        <form onSubmit={signIn} className="flex-col gap-2">
          <input
            className="txt p-3 mt-8 w-72 rounded-xl border"
            type="text"
            placeholder="Username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <input
            className="txt p-3 mt-8 w-72 rounded-xl border"
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button
            className="text-white font-bold bg-[#8AA4D6] w-72 p-3 mt-10 rounded-xl hover:bg-[#253553] duration-300"
            type="submit"
          >
            L O G I N
          </button>
        </form>
      </div>
      <div className="sm:block hidden w-1/2">
        <img
          className="rounded-2xl"
          src="/assets/popup.png"
          alt="Login Illustration"
        />
      </div>
    </div>
  );
}
