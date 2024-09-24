
// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { FiRefreshCw } from "react-icons/fi";
// import supabase from "@/utils/client";

// function Notice() {
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchNotices = useCallback(async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('notices')
//         .select('id, title, created_at')
//         .order('created_at', { ascending: false });

//       if (error) throw error;

//       if (data) {
//         setNotices(data);
//       }
//     } catch (error) {
//       console.error('Error fetching notices:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchNotices();

//     const subscription = supabase
//       .channel('notices_channel')
//       .on('postgres_changes', { event: '*', schema: 'public', table: 'notices' }, (payload) => {
//         console.log('Change received!', payload);
//         fetchNotices();
//       })
//       .subscribe();

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [fetchNotices]);

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchNotices();
//     setRefreshing(false);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const NoticeItem = ({ notice }) => (
//     <div className="cursor-pointer m-1 rounded-2xl flex flex-col justify-start items-center w-full border-4 border-gradient-to-1 from-blue-300 via-white to-blue-300 bg-gradient-to-tr p-4">
//       <div className="flex justify-center items-center mb-2">
//         <IoIosNotificationsOutline className="mr-2 text-2xl text-neutral-700" />
//         <h2 className="text-neutral-700 font-bold text-xl text-center">
//           Notice
//         </h2>
//       </div>
//       <p className="text-sm text-neutral-600 text-center mb-2">
//         {notice.title}
//       </p>
//       <p className="text-xs text-neutral-400">
//         {formatDate(notice.created_at)}
//       </p>
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-neutral-700">
//           All Notices
//         </h1>
//         <button 
//           onClick={handleRefresh} 
//           className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
//           disabled={refreshing}
//         >
//           <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
//           Refresh
//         </button>
//       </div>
//       {loading ? (
//         <p className="text-center text-neutral-600">Loading notices...</p>
//       ) : notices.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {notices.map((notice) => (
//             <NoticeItem key={notice.id} notice={notice} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-neutral-600">No notices available</p>
//       )}
//     </div>
//   );
// }

// export default Notice;
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiRefreshCw } from "react-icons/fi";
import supabase from "@/utils/client";

function Notice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notices')
        .select('id, title, created_at, image_url')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setNotices(data);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotices();

    const subscription = supabase
      .channel('notices_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notices' }, (payload) => {
        console.log('Change received!', payload);
        fetchNotices();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchNotices]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchNotices();
    setRefreshing(false);
  };

  const handleNoticeClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const NoticeItem = ({ notice }) => (
    <div
      className="cursor-pointer m-1 rounded-lg flex flex-col justify-start items-center w-full border-4 border-gradient-to-1 from-blue-300 via-white to-blue-300 bg-gradient-to-tr p-4"
      onClick={() => handleNoticeClick(notice.image_url)}
    >
      <div className="flex justify-center items-center mb-2">
        <IoIosNotificationsOutline className="mr-2 text-2xl text-neutral-700" />
        <h2 className="text-neutral-700 font-bold text-lg text-center">
          {notice.title}
        </h2>
      </div>
      <p className="text-xs text-neutral-400">
        {formatDate(notice.created_at)}
      </p>
    </div>
  );

  const ImageModal = ({ imageUrl, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[101]">
      <div className="relative bg-white p-4 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <img
          src={imageUrl}
          alt="Notice Image"
          className="w-full h-auto object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-700">
          All Notices
        </h1>
        <button
          onClick={handleRefresh}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          disabled={refreshing}
        >
          <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      {loading ? (
        <p className="text-center text-neutral-600">Loading notices...</p>
      ) : notices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {notices.map((notice) => (
            <NoticeItem key={notice.id} notice={notice} />
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-600">No notices available</p>
      )}

      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
}

export default Notice;
