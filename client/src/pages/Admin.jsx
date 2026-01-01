import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import {
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaUserShield,
} from "react-icons/fa";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/admin/app-stats");
    return data;
  } catch (error) {
    // console.log(error)
    toast.error("Not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { totalUsers, adminJobs, userJobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={totalUsers}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="user-created jobs"
        count={userJobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
      <StatItem
        title="admin-created jobs"
        count={adminJobs}
        color="#2f855a"
        bcg="#e6f4ea"
        icon={<FaUserShield />}
      />
    </Wrapper>
  );
};
export default Admin;
