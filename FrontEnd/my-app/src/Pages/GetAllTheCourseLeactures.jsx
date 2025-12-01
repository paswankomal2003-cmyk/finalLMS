// import React from 'react'
// import { useLocation } from 'react-router-dom';

// function GetAllTheCourseLeactures() {
//     const location = useLocation();
//       const { state } = location || {}; // Safely get state from location
    
//       return (
//         <div>
//           <h1>Lecture Page</h1>
//           <p>Received Data: {JSON.stringify(state)}</p>
//         </div>
//       );
// }

// export default GetAllTheCourseLeactures


// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// function GetAllTheCourseLeactures() {
//   const location = useLocation();
//   const { state } = location || {};
//   const courseId = state?.myData;

//   const [lectures, setLectures] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!courseId) return;

//     const fetchLectures = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`http://localhost:5555/course/${courseId}`);
//         setLectures(response.data.leactures || []);
//       } catch (error) {
//         console.error('Error fetching lectures:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLectures();
//   }, [courseId]);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-indigo-700 mb-4">🎓 All Lectures</h1>
//         {/* <p className="text-center text-gray-700 text-lg mb-8">
//           Course ID: <span className="font-medium">{courseId}</span>
//         </p> */}

//         {loading ? (
//           <div className="text-center text-yellow-600 font-semibold animate-pulse text-lg">
//             Fetching lectures, please wait...
//           </div>
//         ) : lectures.length > 0 ? (
//           <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
//             {lectures.map((lecture) => (
//               <div
//                 key={lecture._id}
//                 className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition duration-300 ease-in-out"
//               >
//                 <h2 className="text-2xl font-semibold text-indigo-600 mb-2">{lecture.title}</h2>
//                 <p className="text-gray-700">{lecture.description}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-red-500 font-medium text-lg">No lectures found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default GetAllTheCourseLeactures;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function GetAllTheCourseLeactures() {
  const location = useLocation();
  const { state } = location || {};
  const courseId = state?.myData;

  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    const fetchLectures = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5555/course/${courseId}`);
        setLectures(response.data.leactures || []);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-4">🎓 All Lectures</h1>
        {/* <p className="text-center text-gray-700 text-lg mb-8">
          Course ID: <span className="font-medium">{courseId}</span>
        </p> */}

        {loading ? (
          <div className="text-center text-yellow-600 font-semibold animate-pulse text-lg">
            Fetching lectures, please wait...
          </div>
        ) : lectures.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {lectures.map((lecture) => (
              <div
                key={lecture._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition duration-300 ease-in-out"
              >
                <h2 className="text-2xl font-semibold text-indigo-600 mb-2">{lecture.title}</h2>
                <p className="text-gray-700 mb-4">{lecture.description}</p>
                {lecture.leacture?.secure_url ? (
                  <video
                    src={lecture.leacture.secure_url}
                    controls
                    className="w-full h-64 rounded-lg shadow object-cover"
                  />
                ) : (
                  <p className="text-red-500">Video not available</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500 font-medium text-lg">No lectures found.</p>
        )}
      </div>
    </div>
  );
}

export default GetAllTheCourseLeactures;


