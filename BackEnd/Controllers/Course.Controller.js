import course from "../Schema/Course.Schema.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
// import cloudinary from 'cloudinary'

// Get all the Courses not the leactures. (get request)
const getAllCourse = async (req, res, next) => {
  try {
    const Courses = await course.find({}).select("-lectures");

    return res.status(200).json({
      success: true,
      message: "Here is the courses",
      Courses,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Fail to fetch the data from DB",
    });
  }
};

// Get all the leactures With the help of lecture ID (get Request)
const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Course = await course.findById(id);

    if (!Course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const leactures = Course.lectures;
    return res.status(200).json({
      success: true,
      message: "All lectures fetched successfully",
      leactures,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Failed to get the lectures from DB",
    });
  }
};

// Create Courses. (Post Request)
const CreateCourses = async (req, res, next) => {
  try {
    const { title, description, createdBy, category } = req.body;

    // checking every field is present or not.
    if (!title || !description || !createdBy || !category) {
      return res.status(400).json({
        success: false,
        message: "All Field is Required to create course",
      });
    }

    const Course = await course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id:
          "https://tse2.mm.bing.net/th?id=OIP.PMBiSa-JBIhSrPqckRRxyQHaEK&pid=Api&P=0&h=220",
        secure_url:
          "https://tse2.mm.bing.net/th?id=OIP.PMBiSa-JBIhSrPqckRRxyQHaEK&pid=Api&P=0&h=220",
      },
    });

    if (!Course) {
      return res.status(500).json({
        success: false,
        message: "Course Creation Fail, try next time ",
      });
    }

    // coURSE Image Uploading.
    if (req.file) {
      try {
        // yaha pe hum file ko cloudinary pe store kar rhe hai. upload karne ka syntax hai:-
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          transformation: {
            crop: "auto",
            width: 250,
            height: 250,
            gravity: "auto",
          },
        });

        if (result) {
          Course.thumbnail.public_id = result.public_id;

          Course.thumbnail.secure_url = result.secure_url;

          //Remove file(of the jpg or image) from the server. .... cloudinary pe file rakhni  hai but local me nahi rakhni hai so we have to delete that binary image file.

          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (e) {
        // return next (new AppError('File is not uploaded, please try again',500));
        console.log("file upload fails on cloudinary", e.message);
      }
    }

    // end of the code uploading.

    Course.save();

    return res.status(200).json({
      success: true,
      message: "Course Create Successfully",
      Course,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: ("Course Creation Fails, Plz Try again ", e.message),
    });
  }
};

// Update Courses
const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    // update ke case me we use other methods also but mongoose provide some good and power full this , that we can use it to update the data(GIVEN BELOW).

    const Course = await course.findByIdAndUpdate(
      id, //it means that kon si ID ke corresponding data change karna hai.

      {
        $set: req.body, //  here i want to set some optional things like... (Is line ka mtlb hai ki req.body me jo bhi milega vo sab simply over write kar do in the DB) {jo data bheja hai vahi data change hoga orr kuch bhi data me changement nahi hoga }
      },
      {
        runValidators: true, // this is use because it will check that what data comes in req.body is Right or not it means that pass thorugh the COURSE_SCHEMA structure.
      }
    );

    if (!Course) {
      return res.status(400).json({
        success: false,
        message: "Course Id is Invalid",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course Update SuccessFUlly",
      Course,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Course Updation Fails, PLz Trl again",
    });
  }
};

// Remove the course from the Id
const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Course = await course.findByIdAndDelete(id);

    // if Course me kuch nahi aya to it will show an error that given id is invalid or course of this ID is not present.

    if (!Course) {
      return res.status(400).json({
        success: false,
        message: "Course ID is Invalid, try again",
      });
    }

    // if Course Is present then simply u have to remove the Course of that id.
    if (Course) {
      return res.status(200).json({
        success: true,
        message: "Course Remove Successfully",
      });
    }
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: ("Course Remove Fails, Please Try again", e.message),
    });
  }
};

// here we are creating a Leactures inside the courses.

const addLeacturesByCourseID = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    // Log incoming file
    console.log("🧾 Incoming file data:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No video file found in the request.",
      });
    }

    // Upload video to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "lms/lectures",
      resource_type: "video",
    });

    // Construct lecture data
    const lectureData = {
      title,
      description,
      leacture: {
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
    };

    // Push lecture into the course
    const updateResult = await course.updateOne(
      { _id: id },
      {
        $push: { lectures: lectureData },
        $inc: { numberOfLecture: 1 },
      }
    );

    // Delete local video file after upload
    fs.rm(req.file.path);

    // Check update status
    if (updateResult.modifiedCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Course not found or lecture not added.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lecture added successfully!",
      lecture: lectureData,
    });
  } catch (e) {
    console.error("❌ Error uploading lecture:", e.message);
    res.status(500).json({
      success: false,
      message: `Server error: ${e.message}`,
    });
  }
};


export {
  getAllCourse,
  getLecturesByCourseId,
  CreateCourses,
  updateCourse,
  removeCourse,
  addLeacturesByCourseID
};
