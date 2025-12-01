import user from "../Schema/user.Schema.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../Utils/SendEmail.js";
import crypto from 'crypto'
import { error } from "console";

const Home = () => {
  console.log("Welcome brother in home page ");
};

const cookieOption = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7dayslogin
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Set to true in production, false in development
};

// Sign Up Function
const SignUp = async (req, res, next) => {
  // console.log("Welcome brother in signup page ");

  const { fullName, email, password } = req.body;
  const EmailValid =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@gmail\.com$/;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Every Field is Required",
      });
    }

    if (!email.match(EmailValid)) {
      return res.status(400).json({
        success: false,
        message: "plz Enter valid email ID",
      });
    }

    const userExist = await user.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password Should having minimum 6 characters",
      });
    }

    const userr = await user.create({
      fullName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "https://cdn.pixabay.com/photo/2022/09/27/19/46/ai-generated-7483596_960_720.jpg",
      },
    });

    if (!userr) {
      return res.status(400).json({
        success: false,
        message: "User Registration Fail, please try again",
      });
    }

    //TODO: File Upload

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
          userr.avatar.public_id = result.public_id;

          userr.avatar.secure_url = result.secure_url;

          //Remove file(of the jpg or image) from the server. .... cloudinary pe file rakhni  hai but local me nahi rakhni hai so we have to delete that binary image file.

          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (e) {
        // return next (new AppError('File is not uploaded, please try again',500));
        console.log("file upload fails on cloudinary", e.message);
      }
    }

    await userr.save();

    const token = await userr.generatejwtToken();

    res.cookie("token", token, cookieOption);

    userr.password = undefined;
    return res.status(200).json({
      success: true,
      message: "User Registration SuccessFully",
      userr,
      token,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "User Registration fails ",
    });
  }
};

// LOGIN Function
const Login = async (req, res, next) => {
  console.log("Welcome brother in Login page ");

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Both Email and password require for login",
      });
    }

    const userr = await user.findOne({ email }).select("+password");

    if (!email || !(await bcrypt.compare(password, userr.password))) {
      return res.status(400).json({
        success: false,
        message: "Both Email and password Incorrect",
      });
    }

    const token = await userr.generatejwtToken();

    res.cookie("token", token, cookieOption);

    return res.status(200).json({
      success: true,
      message: "Successfully Login",
      userr,
      token,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Fail TO Login",
    });
  }
};

// logout function
const LogOut = async (req, res, next) => {
  console.log("Welcome brother in Logout page ");

  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged Out successfully",
  });
};

// Get user Profile data
const GetUser = async (req, res, next) => {
  console.log("Welcome brother in user Profile page");

  // Accessing the user ID from the request object
  const userId = req.user.id;

  try {
    // Find user by ID
    const userr = await user.findById(userId);

    // If user not found, return 404
    if (!userr) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If user found, return success response
    return res.status(200).json({
      success: true,
      message: "Here is the user data:",
      user: userr,
    });
  } catch (e) {
    // Handle any error
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// update user profile
const updateUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    // update ke case me we use other methods also but mongoose provide some good and power full this , that we can use it to update the data(GIVEN BELOW).

    const userr = await user.findByIdAndUpdate(
      id, //it means that kon si ID ke corresponding data change karna hai.

      {
        $set: req.body, //  here i want to set some optional things like... (Is line ka mtlb hai ki req.body me jo bhi milega vo sab simply over write kar do in the DB) {jo data bheja hai vahi data change hoga orr kuch bhi data me changement nahi hoga }
      },
      {
        runValidators: true, // this is use because it will check that what data comes in req.body is Right or not it means that pass thorugh the COURSE_SCHEMA structure.
      }
    );

    if (!userr) {
      return res.status(400).json({
        success: false,
        message: "user Id is Invalid",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user Profile Update SuccessFUlly",
      userr,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: ("userProfile Updation Fails, PLz Trl again", e.message),
    });
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if user exists
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(400).json({
        success: false,
        message: "This email is not registered, please try another email",
      });
    }

    // Generate reset token
    const resetToken = await User.generatePasswordResetToken();
    await User.save(); // Save the token to the user document

    // Construct reset password URL
    const resetPasswordURL = `/reset-http://localhost:5555/user/reset/password/${resetToken}`;
    console.log(resetPasswordURL)

    try {
      const subject = "Reset User Password";
      const message = `
      
          
        <a href="http://localhost:5555/user/reset/password${resetPasswordURL}" target="_blank">Reset Password</a>
        <p>If the above link doesn't work, copy and paste this URL into your browser:</p>
        <p>${resetPasswordURL}</p>
      `;

      // Send email
      await sendEmail(email, subject, message);

      res.status(200).json({ 
        success: true,
        message: `Reset Password token has been sent successfully to ${email}`,
      });
    } catch (error) {
      // Reset token values if email fails
      User.forgotPasswordToken = undefined;
      User.forgotPasswordExpiry = undefined;
      await User.save();

      res.status(400).json({
        success: false,
        message: "Failed to send Reset Password email",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const resetPassword = async(req, res, next) => {
  
  // here we are take resetToken from the params.
  const { resetToken } = req.params;

  // here we are get the New password.
  const {password} = req.body;

  // here we are compare the resetToken which is stored in the DB. so for compare the token then we remember that resetToken is stored as crypto so we have to convert resetToken to crypto then we can compare with DB forgotPasswordToken.

  const forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // here we are check that this type of resetToken present into the DB yes or no.
  const User = await user.findOne({
    forgotPasswordToken,
    // below code check that the resetTOken has Expiry yes or no for that we have to check that.
    forgotPasswordExpiry: {$gt: Date.now()}

  })

  if(!User){
    return res.status(400).json({
      success:false,
      message:(error.message,"User RestToken is expired/invalid, please try again ")
    })
  }

  User.password = password;

  // jab sub kuch hojaye to forgotPasswordToken,forgotPasswordToken jo DB me save hai un dono to undefined set kar denge jisse next time jo jo previous link bheja tha reset link bheja tha usse na hopaye orr resetToken jo DB set hoga vo undefine hojaye.
  User.forgotPasswordToken = undefined;
  User.forgotPasswordExpiry = undefined;

  User.save() 

  res.status(200).json({
    success:true,
    message:"PassWord is Changed successfully"
  })




};


const changePassword = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both old and new passwords are required.",
      });
    }

    // Fetch the user from the database, including their password
    const User = await user.findById(userID).select('+password');

    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User does not exist.",
      });
    }

    // console.log(User)

    // Validate the old password
    const isPasswordValid = await bcrypt.compare(oldPassword, User.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid old password. Please try again.",
      });
    }

    // Hash the new password before saving
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    // User.password = hashedPassword;

    // Save the updated user object
    User.password = newPassword;
    await User.save();
    User.password = undefined;



    res.status(200).json({
      success: true,
      message: "Password has been changed successfully.",
      User
    });

  } catch (error) {
    console.error("Error in changePassword:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
};


export {
  Home,
  SignUp,
  Login,
  LogOut,
  GetUser,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  changePassword,
};
