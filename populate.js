import { readFile } from "fs/promises";
import { connectDB } from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/jobsModel.js";
import User from "./models/userModel.js";
try {
  await connectDB(process.env.MONGO_URL);
  // const user = await User.findOne({ email: 'kelvin@gmail.com' });
  const user = await User.findOne({ email: "test@test.com" });

  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("Success!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}

/* 
YOU CAN USE THIS CODE

import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db/connect.js";
import User from "./models/userModel.js";
import Job from "./models/jobsModel.js";
import mockJobs from "./mockJobs.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    const testUser = await User.findOne({ email: "test@test.com" });

    await Job.deleteMany({ createdBy: testUser._id });

    const jobs = mockJobs.map((job) => {
      return { ...job, createdBy: testUser._id };
    });
    await Job.create(jobs);

    console.log("Jobs created successfully!");
    process.exit(0);

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
 */
