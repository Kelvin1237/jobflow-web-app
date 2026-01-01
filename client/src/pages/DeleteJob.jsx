import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("Job deleted successfully");
  } catch (error) {
    // console.log(error)
    const errorMessage =
      error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
    toast.error(errorMessage);
  }
  return redirect("/dashboard/all-jobs");
};
