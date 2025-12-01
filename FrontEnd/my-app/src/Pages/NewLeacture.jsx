// import React from 'react';
// import { useLocation } from 'react-router-dom';

// function NewLecture() {
//   const location = useLocation();
//   const { state } = location || {}; // Safely get state from location

//   return (
//     <div>
//       <h1>Lecture Page</h1>
//       <p>Received Data: {JSON.stringify(state)}</p>
//     </div>
//   );
// }

// export default NewLecture;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NewLecture() {
  const location = useLocation();
  const { state } = location || {};
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // ✅ loader state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !video) {
      alert('Please fill all fields.');
      return;
    }

    const courseId = state?.myData;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', video);

    try {
      setIsUploading(true); // ✅ start loader
      const response = await axios.post(`http://localhost:5555/course/${courseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Lecture added successfully!');
      console.log('Response:', response.data);
      navigate("/");
    } catch (error) {
      console.error('Error uploading lecture:', error);
      alert('Failed to upload lecture.');
    } finally {
      setIsUploading(false); // ✅ stop loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">Add New Lecture</h1>

        {isUploading && (
          <div className="mb-4 text-center text-yellow-600 font-semibold animate-pulse">
            Uploading video, please wait...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block text-gray-700 font-semibold">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              disabled={isUploading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              disabled={isUploading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Video File:</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="mt-1 w-full"
              required
              disabled={isUploading}
            />
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className={`w-full py-2 rounded-lg transition duration-300 ${
              isUploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload Lecture'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewLecture;

