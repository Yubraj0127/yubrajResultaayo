
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/utils/client";

export default function Redirect() {
  const router = useRouter();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNotice = async () => {
      setLoading(true);

      // Get the current date and calculate 24 hours back in UTC
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

      console.log("Current Time (UTC):", now.toISOString());
      console.log("24 Hours Ago (UTC):", twentyFourHoursAgo); // Debugging log

      const { data: latestNotice, error } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false })
        .gt("created_at", twentyFourHoursAgo)
        .limit(1);

      if (error) {
        console.error("Error fetching latest notice:", error.message);
        setLoading(false);
        return;
      }

      if (latestNotice && latestNotice.length > 0) {
        console.log("Latest notice fetched:", latestNotice[0]); // Debugging log
        setNotice(latestNotice[0]);
      } else {
        console.log("No notice found within the last 24 hours.");
      }

      setLoading(false);
    };

    fetchLatestNotice();

    const timer = setTimeout(() => {
      router.push("/Home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-16 h-16 mb-4">
        <div className="w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h1 className="text-2xl text-gray-700 animate-pulse">Redirecting...</h1>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading latest notice...</p>
      ) : notice ? (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">{notice.title}</h2>
          {notice.image_url && (
            <img
              src={notice.image_url}
              alt="Notice Image"
              className="mt-2 w-40 h-40 object-cover rounded-lg"
            />
          )}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No new notice in the last 24 hours.</p>
      )}
    </div>
  );
}

