import mongoose, { Schema } from "mongoose";

const CourseSchem = new Schema(
  {
    // title of the course.
    title: {
      type: String,
      required: true,
    },
    
    // description of the Course.
    description: {
      type: String,
      required: true,
    },

    // Category of the Course.
    category: {
      type: String,
    },

    // thumbnail of the course.
    thumbnail: {
      public_id:{
        type:String
      },
      secure_url:{
        type: String
      }
    },

    // leacture inside the course.
    lectures: [
      {
        title: String,
        description: String,
        leacture: {
          public_id: String,
          secure_url: String,
        },
      }
    ],
    
    // Number of leactures.
    numberOfLecture: {
      type: Number,
      default:0,
    },

    // course Creater name
    createdBy: {
      type: String,
    },
  },

//   time stamp.
  {
    timestamps: true,
  }
);

export default mongoose.model("course", CourseSchem);
