// import React from "react";
// import {
//   FaUsers,
//   FaChalkboardTeacher,
//   FaGraduationCap,
//   FaBook,
// } from "react-icons/fa";

// export default function Teacherdashboard() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Teacher Dashboard
//           </h1>
//         </div>
//       </header>
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           <StatCard
//             icon={<FaUsers className="text-blue-500" />}
//             title="Total Students"
//             value="500"
//           />
//           <StatCard
//             icon={<FaChalkboardTeacher className="text-green-500" />}
//             title="Total Teachers"
//             value="50"
//           />
//         </div>

//         <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <RecentActivityFeed />
//           <QuickActions />
//         </div>
//       </main>
//     </div>
//   );
// }

// function StatCard({ icon, title, value }) {
//   return (
//     <div className="bg-white overflow-hidden shadow rounded-lg p-5">
//       <div className="flex items-center">
//         <div className="flex-shrink-0">{icon}</div>
//         <div className="ml-5 w-0 flex-1">
//           <dt className="text-sm font-medium text-gray-500 truncate">
//             {title}
//           </dt>
//           <dd className="text-lg font-semibold text-gray-900">{value}</dd>
//         </div>
//       </div>
//     </div>
//   );
// }

// function RecentActivityFeed() {
//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
//       <ul className="mt-4 space-y-4">
//         <li className="flex space-x-3">
//           <FaUsers className="flex-shrink-0 h-5 w-5 text-gray-400" />
//           <div className="flex-1 space-y-1">
//             <p className="text-sm text-gray-600">New student enrolled</p>
//             <p className="text-xs text-gray-500">2 hours ago</p>
//           </div>
//         </li>
//         {/* Add more activity items here */}
//       </ul>
//     </div>
//   );
// }

// function QuickActions() {
//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
//       <div className="mt-4 grid grid-cols-2 gap-4">
//         <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
//           Add Student
//         </button>
//         <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
//           Add Teacher
//         </button>
//         <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
//           View Classes
//         </button>
//         <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
//           Create Exam
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import supabase from "@/utils/client"; // Adjust the path as needed

export default function Teacherdashboard() {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch teacher count
        const { count: teacherCount, error: teacherError } = await supabase
          .from("teachers")
          .select("*", { count: "exact" });

        if (teacherError) {
          console.error("Error fetching teacher count:", teacherError);
        } else {
          setTeacherCount(teacherCount);
        }

        // Fetch student count
        const { count: studentCount, error: studentError } = await supabase
          .from("students")
          .select("*", { count: "exact" });

        if (studentError) {
          console.error("Error fetching student count:", studentError);
        } else {
          setStudentCount(studentCount);
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<FaUsers className="text-blue-500" />}
            title="Total Students"
            value={studentCount}
          />
          <StatCard
            icon={<FaChalkboardTeacher className="text-green-500" />}
            title="Total Teachers"
            value={teacherCount}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentActivityFeed />
          <QuickActions />
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
          <dd className="text-lg font-semibold text-gray-900">{value}</dd>
        </div>
      </div>
    </div>
  );
}

function RecentActivityFeed() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      <ul className="mt-4 space-y-4">
        <li className="flex space-x-3">
          <FaUsers className="flex-shrink-0 h-5 w-5 text-gray-400" />
          <div className="flex-1 space-y-1">
            <p className="text-sm text-gray-600">New student enrolled</p>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </li>
        {/* Add more activity items here */}
      </ul>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Add Student
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
          Add Teacher
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
          View Classes
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
          Create Exam
        </button>
      </div>
    </div>
  );
}
