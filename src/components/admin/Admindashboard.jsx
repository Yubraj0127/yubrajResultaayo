  "use client";
  import React, { useState, useEffect } from "react";
  import Link from "next/link";
  import {
    FaUsers,
    FaChalkboardTeacher,
    FaGraduationCap,
    FaBook,
  } from "react-icons/fa";
  import { Line } from "react-chartjs-2";
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  import supabase from "@/utils/client";

  export default function Admindashboard() {
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);

    const [chartData, setChartData] = useState({
      labels: [],
      datasets: [
        {
          label: "Students",
          data: [],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Teachers",
          data: [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });

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

    useEffect(() => {
      // Simulate fetching data for the last 7 days
      const fetchData = () => {
        const labels = [];
        const studentData = [];
        const teacherData = [];

        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          labels.push(date.toLocaleDateString());
          studentData.push(totalStudents);
          teacherData.push(totalTeachers);
        }

        setChartData({
          labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: studentData,
            },
            {
              ...chartData.datasets[1],
              data: teacherData,
            },
          ],
        });
      };

      fetchData();
      // In a real application, you might want to fetch this data periodically
      // const interval = setInterval(fetchData, 86400000); // Update every 24 hours
      // return () => clearInterval(interval);
    }, [totalStudents, totalTeachers]);

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Student and Teacher Count Over Last 7 Days",
        },
      },
    };

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
          <div>
            <Line options={options} data={chartData} />
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
