import User from "../models/userModel.js";
import Job from "../models/jobsModel.js";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  /* YOU CAN ALSO USE THIS FOR SETTING ROLE-BASED ACCESS - IF YOU DON'T WANT TO USE A MIDDLEWARE
  
  const isAdmin = req.user.role === "admin";

  if (!isAdmin) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "not authorized to access this route" });
  } */

  const totalUsers = await User.countDocuments();

  const adminUser = await User.findOne({ role: "admin" });

  const adminJobs = await Job.countDocuments({ createdBy: adminUser._id });

  const users = await User.find({ role: "user" });

  const userJobs = await Job.countDocuments({
    createdBy: users.map((user) => user._id),
  });

  res.status(StatusCodes.OK).json({ totalUsers, adminJobs, userJobs });
};

export const updateUser = async (req, res) => {
  // console.log(req.file);
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path, {
      use_filename: true,
      folder: "jobflow-images",
    });
    await fs.unlink(req.file.path);
    // console.log(response)
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const user = await User.findOne({ _id: req.user.userId });

  if (req.file && user.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(user.avatarPublicId);
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ msg: "user updated successfully" });
};
