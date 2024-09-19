
"use client";

import React, { useState, useEffect } from "react";
import supabase from "@/utils/client";
import Createclass from "@/components/admin/Createclass";

export default function Classtable() {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [years, setYears] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const showTable = selectedYear && selectedClass && selectedSection;

  useEffect(() => {
    const fetchClassData = async () => {
      const { data, error } = await supabase.from("classes").select("year, class, section, subject");

      if (error) {
        console.error("Error fetching class data:", error);
        return;
      }

      if (data && data.length > 0) {
        const uniqueYears = [...new Set(data.map((item) => item.year))];
        const uniqueClasses = [...new Set(data.map((item) => item.class))];
        const uniqueSections = [...new Set(data.map((item) => item.section))];

        setYears(uniqueYears);
        setClasses(uniqueClasses);
        setSections(uniqueSections);
      }
    };

    fetchClassData();
  }, []);

  useEffect(() => {
    const fetchTeacherData = async () => {
      const { data, error } = await supabase.from("teachers").select("username");

      if (error) {
        console.error("Error fetching teacher data:", error);
        return;
      }

      if (data && data.length > 0) {
        setTeachers(data.map((teacher) => teacher.username));
      }
    };

    fetchTeacherData();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (selectedClass && selectedSection && selectedYear) {
        const { data, error } = await supabase
          .from("classes")
          .select("subject")
          .eq("class", selectedClass)
          .eq("section", selectedSection)
          .eq("year", selectedYear);

        if (error) {
          console.error("Error fetching subjects:", error);
          return;
        }

        if (data && data.length > 0) {
          const subjectsArray = data[0].subject.split(", ");
          const subjectData = subjectsArray.map((subject) => ({
            name: subject,
            teacher: "",
          }));

          setSubjects(subjectData);
        }
      }
    };

    fetchSubjects();
  }, [selectedClass, selectedSection, selectedYear]);

  const handleTeacherChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].teacher = value;
    setSubjects(updatedSubjects);
  };

  const handleSave = async () => {
    try {
      const updates = subjects.map((subject) => ({
        year: selectedYear,
        class: selectedClass,
        section: selectedSection,
        subject: subject.name,
        teacher: subject.teacher,
      }));

      // Use upsert with conflict resolution on unique constraint
      const { error } = await supabase
        .from("classes")
        .upsert(updates, { onConflict: ["year", "class", "section", "subject"] });

      if (error) {
        throw error;
      }

      alert("Teachers saved successfully!");
    } catch (error) {
      console.error("Error saving teacher assignments:", error);
      alert(`Failed to save teacher assignments. Error: ${error.message}`);
    }
  };

  return (
    <div className="relative mt-7">
      <div className="flex justify-center items-center mb-4">
        {/* Year dropdown */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-3"
        >
          <option value="">Select Year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Class dropdown */}
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-3"
        >
          <option value="">Select Class</option>
          {classes.map((classItem, index) => (
            <option key={index} value={classItem}>
              {classItem}
            </option>
          ))}
        </select>

        {/* Section dropdown */}
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-3"
        >
          <option value="">Select Section</option>
          {sections.map((section, index) => (
            <option key={index} value={section}>
              {section}
            </option>
          ))}
        </select>

        <div className="flex space-x-2 absolute right-4">
          <button
            onClick={() => setShowCreateClass(true)}
            className="bg-[#8AA4D6] hover:bg-[#253553] hover:text-white text-gray-700 py-2 px-4 rounded text-xs"
          >
            +Create Class
          </button>
        </div>
      </div>

      {showCreateClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
          <Createclass
            onClose={() => setShowCreateClass(false)}
            updateDropdown={(newClass, newSection) => {
              setClasses((prev) => [...prev, newClass]);
              setSections((prev) => [...prev, newSection]);
            }}
          />
        </div>
      )}

      {showTable && (
        <div className="w-full h-80 bg-gray-200 rounded-lg shadow-lg p-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  Subject
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">
                  Teacher
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    {subject.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <select
                      value={subject.teacher}
                      onChange={(e) => handleTeacherChange(index, e.target.value)}
                      className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    >
                      <option value="">Select Teacher</option>
                      {teachers.map((teacher, index) => (
                        <option key={index} value={teacher}>
                          {teacher}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="px-6 py-4">
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      className="bg-[#8AA4D6] hover:bg-[#253553] hover:text-white text-gray-700 py-2 px-4 rounded text-xs"
                    >
                      Save
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
