
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaBook,
} from "react-icons/fa";
import supabase from "@/utils/client";

export default function Admindashboard() {
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      // Fetch teacher count
      const { count: teacherCount, error: teacherError } = await supabase
        .from("teachers")
        .select("*", { count: "exact" });

      if (teacherError) {
        console.error("Error fetching teacher count:", teacherError);
      } else {
        setTotalTeachers(teacherCount);
      }

      // Fetch student count
      const { count: studentCount, error: studentError } = await supabase
        .from("students")
        .select("*", { count: "exact" });

      if (studentError) {
        console.error("Error fetching student count:", studentError);
      } else {
        setTotalStudents(studentCount);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            School Admin Dashboard
          </h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<FaUsers className="text-blue-500" />}
            title="Total Students"
            value={totalStudents}
          />
          <StatCard
            icon={<FaChalkboardTeacher className="text-green-500" />}
            title="Total Teachers"
            value={totalTeachers}
          />
          {/* Add other StatCards as needed */}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
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
          <dt className="text-sm font-medium text-gray-500 truncate">
            {title}
          </dt>
          <dd className="text-lg font-semibold text-gray-900">{value}</dd>
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Link
          href="/admin/add-student"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center"
        >
          Add Student
        </Link>
        <Link
          href="/admin/add-teacher"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded text-center"
        >
          Add Teacher
        </Link>
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
