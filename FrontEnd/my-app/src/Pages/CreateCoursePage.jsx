import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateCourse } from "../Redux/Slices/CoursesSlice";
import { useNavigate } from "react-router-dom";

function CreateCoursePage() {
  const [title, setTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();
    if (!avatar) {
      alert("Please select a course image.");
      return;
    }

    const result = await dispatch(
      CreateCourse({ title, description, createdBy, category, avatar })
    );

    if (result?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-200 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex overflow-hidden">
        <div className="w-1/2 bg-gradient-to-b from-purple-400 to-pink-400 text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Create New Course</h2>
          <p className="text-sm opacity-80">Share your knowledge with the world!</p>
        </div>
        <form
          onSubmit={sendData}
          className="w-1/2 p-8 space-y-4 bg-white"
          encType="multipart/form-data"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            placeholder="Instructor"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition duration-200"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCoursePage;
