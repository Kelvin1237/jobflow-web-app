// APP.JSX WITH REACT QUERY

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import {
// HomeLayout,
// DashboardLayout,
// Landing,
// Register,
// Login,
// Error,
// AddJob,
// Stats,
// AllJobs,
// Profile,
// Admin,
// EditJob,
// } from "./pages";
// import { action as registerAction } from "./pages/Register";
// import { action as loginAction } from "./pages/Login";
// import { action as addJobAction } from "./pages/AddJob";
// import { action as editJobAction } from "./pages/EditJob";
// import { action as deleteJobAction } from "./pages/DeleteJob";
// import { action as profileAction } from "./pages/Profile";
// import { loader as dashboardLoader } from "./pages/DashboardLayout";
// import { loader as allJobsLoader } from "./pages/AllJobs";
// import { loader as editJobLoader } from "./pages/EditJob";
// import { loader as adminLoader } from "./pages/Admin";
// import { loader as statsLoader } from "./pages/Stats";
// import ErrorElement from "./components/ErrorElement";

// export const checkDefaultTheme = () => {
// const isDarkTheme = localStorage.getItem("darkTheme") === "true";
// document.body.classList.toggle("dark-theme", isDarkTheme);
// return isDarkTheme;
// };

// checkDefaultTheme();

// const queryClient = new QueryClient({
// defaultOptions: {
// queries: {
// staleTime: 1000 _ 60 _ 5,
// },
// },
// });

// const router = createBrowserRouter([
// {
// path: "/",
// element: <HomeLayout />,
// errorElement: <Error />,
// children: [
// {
// index: true,
// element: <Landing />,
// },
// {
// path: "register",
// element: <Register />,
// action: registerAction,
// },
// {
// path: "login",
// element: <Login />,
// action: loginAction,
// },
// {
// path: "dashboard",
// element: <DashboardLayout queryClient={queryClient} />,
// loader: dashboardLoader(queryClient),
// children: [
// {
// index: true,
// element: <AddJob />,
// action: addJobAction(queryClient),
// },
// {
// path: "stats",
// element: <Stats />,
// loader: statsLoader(queryClient),
// errorElement: <ErrorElement />,
// },
// {
// path: "all-jobs",
// element: <AllJobs />,
// loader: allJobsLoader(queryClient),
// errorElement: <ErrorElement />,
// },
// {
// path: "profile",
// element: <Profile />,
// action: profileAction(queryClient),
// },
// {
// path: "admin",
// element: <Admin />,
// loader: adminLoader,
// },
// {
// path: "edit-job/:id",
// element: <EditJob />,
// loader: editJobLoader,
// action: editJobAction(queryClient),
// },
// {
// path: "delete-job/:id",
// action: deleteJobAction(queryClient),
// },
// ],
// },
// ],
// },
// ]);

// const App = () => {
// return (
// <QueryClientProvider client={queryClient}>
// <RouterProvider router={router} />
// <ReactQueryDevtools initialIsOpen={false} />
// </QueryClientProvider>
// );
// };

// export default App;

// ADDJOB.JSX WITH REACT QUERY

// import { FormRow, FormRowSelect, SubmitBtn } from "../components";
// import Wrapper from "../assets/wrappers/DashboardFormPage";
// import { useOutletContext } from "react-router-dom";
// import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
// import { Form, redirect } from "react-router-dom";
// import { toast } from "react-toastify";
// import customFetch from "../utils/customFetch";

// export const action =
// (queryClient) =>
// async ({ request }) => {
// const formData = await request.formData();
// const data = Object.fromEntries(formData);

//     try {
//       await customFetch.post("/jobs", data);
//       queryClient.invalidate(["jobs"]);
//       toast.success("Job added successfully");
//       return redirect("all-jobs");
//     } catch (error) {
//       const errorMessage =
//         error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
//       toast.error(errorMessage);
//       return error;
//     }

// };

// const AddJob = () => {
// const { user } = useOutletContext();
// return (
// <Wrapper>

// <Form method="post" className="form">
// <h4 className="form-title">add job</h4>
// <div className="form-center">
// <FormRow type="text" name="position" labelText="position" />
// <FormRow type="text" name="company" labelText="company" />
// <FormRow
//             type="text"
//             name="jobLocation"
//             labelText="job location"
//             defaultValue={user.location}
//           />
// <FormRowSelect
//             name="jobStatus"
//             labelText="job status"
//             list={Object.values(JOB_STATUS)}
//             defaultValue={JOB_STATUS.PENDING}
//           />
// <FormRowSelect
//             name="jobType"
//             labelText="job type"
//             list={Object.values(JOB_TYPE)}
//             defaultValue={JOB_TYPE.FULL_TIME}
//           />
// <SubmitBtn formBtn />
// </div>
// </Form>
// </Wrapper>
// );
// };
// export default AddJob;

// ALLJOBS.JSX WITH REACT QUERY

// import { toast } from "react-toastify";
// import { JobsContainer, SearchContainer } from "../components";
// import customFetch from "../utils/customFetch";
// import { useLoaderData } from "react-router-dom";
// import { useContext, createContext } from "react";
// import { useQuery } from "@tanstack/react-query";

// const allJobsQuery = (params) => {
// const { search, jobStatus, jobType, sort, page } = params;
// return {
// queryKey: [
// "jobs",
// search ?? "",
// jobStatus ?? "all",
// jobType ?? "all",
// sort ?? "newest",
// page ?? 1,
// ],
// queryFn: async () => {
// const { data } = await customFetch.get("/jobs", {
// params,
// });
// return data;
// },
// };
// };

// export const loader =
// (queryClient) =>
// async ({ request }) => {
// // console.log(request.url);
// const params = Object.fromEntries([
// ...new URL(request.url).searchParams.entries(),
// ]);

//     // console.log(params);

//     await queryClient.ensureQueryData(allJobsQuery(params));
//     return { searchValues: { ...params } };

//     /* try {
//     const { data } = await customFetch.get("/jobs", {
//       params,
//     });

//     return { data, searchValues: { ...params } };

// } catch (error) {
// // console.log(error)
// const errorMessage =
// error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
// toast.error(errorMessage);
// return error;
// } \*/
// };

// const AllJobsContext = createContext();

// const AllJobs = () => {
// const { searchValues } = useLoaderData();
// const { data } = useQuery(allJobsQuery(searchValues));
// return (
// <AllJobsContext.Provider value={{ data, searchValues }}>
// <SearchContainer />
// <JobsContainer />
// </AllJobsContext.Provider>
// );
// };

// export const useAllJobsContext = () => useContext(AllJobsContext);

// export default AllJobs;

// DASHBOARDLAYOUT.JSX WITH REACT QUERY

// import {
// Outlet,
// redirect,
// useLoaderData,
// useNavigate,
// useNavigation,
// } from "react-router-dom";
// import Wrapper from "../assets/wrappers/Dashboard";
// import { BigSidebar, SmallSidebar, Navbar, Loading } from "../components";
// import { createContext, useContext, useState } from "react";
// import { checkDefaultTheme } from "../App";
// import customFetch from "../utils/customFetch";
// import { toast } from "react-toastify";
// import { useQuery } from "@tanstack/react-query";

// const userQuery = {
// queryKey: ["user"],
// queryFn: async () => {
// const response = await customFetch.get("/users/current-user");
// return response.data;
// },
// };

// export const loader = (queryClient) => async () => {
// try {
// return await queryClient.ensureQueryData(userQuery);
// } catch (error) {
// return redirect("/");
// }

// /_ try {
// const { data } = await customFetch.get("/users/current-user");
// return data;
// } catch (error) {
// return redirect("/");
// } _/
// };

// const DashboardContext = createContext();

// const DashboardLayout = ({ queryClient }) => {
// // const { user } = useLoaderData();

// const { data } = useQuery(userQuery);

// const { user } = data;

// const navigate = useNavigate();
// const navigation = useNavigation();
// const isPageLoading = navigation.state === "loading";

// const [showSidebar, setShowSidebar] = useState(false);
// const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

// const toggleDarkTheme = () => {
// const newDarkTheme = !isDarkTheme;
// setIsDarkTheme(newDarkTheme);
// document.body.classList.toggle("dark-theme", newDarkTheme);
// localStorage.setItem("darkTheme", newDarkTheme);
// };

// const toggleSidebar = () => {
// setShowSidebar(!showSidebar);
// };

// const logoutUser = async () => {
// navigate("/");
// await customFetch.get("/auth/logout");
// queryClient.invalidateQueries();
// toast.success("Logging out...");
// };

// return (
// <DashboardContext.Provider
// value={{
//         user,
//         showSidebar,
//         isDarkTheme,
//         toggleDarkTheme,
//         toggleSidebar,
//         logoutUser,
//       }} >
// <Wrapper>

// <main className="dashboard">
// <SmallSidebar />
// <BigSidebar />
// <div>
// <Navbar />
// <div className="dashboard-page">
// {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
// </div>
// </div>
// </main>
// </Wrapper>
// </DashboardContext.Provider>
// );
// };

// export const useDashboardContext = () => useContext(DashboardContext);
// export default DashboardLayout;

// DELETEJOB.JSX WITH REACT QUERY

// import { toast } from "react-toastify";
// import customFetch from "../utils/customFetch";
// import { redirect } from "react-router-dom";

// export const action =
// (queryClient) =>
// async ({ params }) => {
// try {
// await customFetch.delete(`/jobs/${params.id}`);
// queryClient.invalidate(["jobs"]);
// toast.success("Job deleted successfully");
// } catch (error) {
// // console.log(error)
// const errorMessage =
// error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
// toast.error(errorMessage);
// }
// return redirect("/dashboard/all-jobs");
// };

// EDITJOB.JSX WITH REACT QUERY

// import { FormRow, FormRowSelect, SubmitBtn } from "../components";
// import Wrapper from "../assets/wrappers/DashboardFormPage";
// import { useLoaderData } from "react-router-dom";
// import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
// import { Form, redirect } from "react-router-dom";
// import { toast } from "react-toastify";
// import customFetch from "../utils/customFetch";

// export const loader = async ({ params }) => {
// try {
// const { data } = await customFetch.get(`/jobs/${params.id}`);
// return data;
// } catch (error) {
// // console.log(error)
// const errorMessage =
// error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
// toast.error(errorMessage);
// return redirect("/dashboard/all-jobs");
// }
// };

// export const action =
// (queryClient) =>
// async ({ request, params }) => {
// const formData = await request.formData();
// const data = Object.fromEntries(formData);

//     try {
//       await customFetch.patch(`jobs/${params.id}`, data);
//       queryClient.invalidate(["jobs"]);
//       toast.success("Job edited successfully");
//       return redirect("/dashboard/all-jobs");
//     } catch (error) {
//       // console.log(error)
//       const errorMessage =
//         error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
//       toast.error(errorMessage);
//       return error;
//     }

// };

// const EditJob = () => {
// const { job } = useLoaderData();
// return (
// <Wrapper>

// <Form method="post" className="form">
// <h4 className="form-title">edit job</h4>
// <div className="form-center">
// <FormRow
//             type="text"
//             name="position"
//             labelText="position"
//             defaultValue={job.position}
//           />
// <FormRow
//             type="text"
//             name="company"
//             labelText="company"
//             defaultValue={job.company}
//           />
// <FormRow
//             type="text"
//             name="jobLocation"
//             labelText="job location"
//             defaultValue={job.jobLocation}
//           />
// <FormRowSelect
//             name="jobStatus"
//             labelText="job status"
//             list={Object.values(JOB_STATUS)}
//             defaultValue={job.jobStatus}
//           />
// <FormRowSelect
//             name="jobType"
//             labelText="job type"
//             list={Object.values(JOB_TYPE)}
//             defaultValue={job.jobType}
//           />
// <SubmitBtn formBtn />
// </div>
// </Form>
// </Wrapper>
// );
// };
// export default EditJob;

// PROFILE.JSX WITH REACT QUERY

// import { FormRow, SubmitBtn } from "../components";
// import Wrapper from "../assets/wrappers/DashboardFormPage";
// import { useOutletContext } from "react-router-dom";
// import { useNavigation, Form } from "react-router-dom";
// import customFetch from "../utils/customFetch";
// import { toast } from "react-toastify";

// export const action =
// (queryClient) =>
// async ({ request }) => {
// const formData = await request.formData();

//     const file = formData.get("avatar");

//     const oneMB = 1048576;
//     if (file && file.size > oneMB) {
//       toast.error("Image size too large");
//       return null;
//     }

//     try {
//       await customFetch.patch("/users/update-user", formData);
//       queryClient.invalidateQueries(["user"]);
//       toast.success("Profile updated successfully");
//       return redirect("/dashboard");
//     } catch (error) {
//       // console.log(error)
//       const errorMessage =
//         error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
//       toast.error(errorMessage);
//       return null;
//     }

// };

// const Profile = () => {
// const { user } = useOutletContext();
// const { name, lastName, email, location } = user;

// return (
// <Wrapper>

// <Form method="post" className="form" encType="multipart/form-data">
// <h4 className="form-title">profile</h4>
// <div className="form-center">
// <div className="form-row">
// <label htmlFor="avatar" className="form-label">
// Select an image file (max 1 MB)
// </label>
// <input
//               type="file"
//               id="avatar"
//               name="avatar"
//               className="form-input"
//               accept="image/*"
//             />
// </div>
// <FormRow
//             type="text"
//             name="name"
//             labelText="name"
//             defaultValue={name}
//           />
// <FormRow
//             type="text"
//             name="lastName"
//             labelText="last name"
//             defaultValue={lastName}
//           />
// <FormRow
//             type="text"
//             name="email"
//             labelText="email"
//             defaultValue={email}
//           />
// <FormRow
//             type="text"
//             name="location"
//             labelText="location"
//             defaultValue={location}
//           />
// <SubmitBtn formBtn />
// </div>
// </Form>
// </Wrapper>
// );
// };
// export default Profile;

// STATS.JSX WITH REACT QUERY

// import { ChartsContainer, StatsContainer } from "../components";
// import customFetch from "../utils/customFetch";
// import { useLoaderData } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

// const statsQuery = {
// queryKey: ["stats"],
// queryFn: async () => {
// const response = await customFetch.get("/jobs/stats");

//     return response.data;

// },
// };

// export const loader = (queryClient) => async () => {
// const data = await queryClient.ensureQueryData(statsQuery);
// return null;
// /_ try {
// const { data } = await customFetch.get("/jobs/stats");
// return data;
// } catch (error) {
// // console.log(error)
// const errorMessage =
// error?.response?.data?.msg ?? error?.response?.data?.error?.[0];
// toast.error(errorMessage);
// return error;
// } _/
// };

// const Stats = () => {
// /_ const { defaultStats, monthlyApplications } = useLoaderData(); _/

// const { data } = useQuery(statsQuery);

// const { defaultStats, monthlyApplications } = data;

// return (
// <>
// <StatsContainer defaultStats={defaultStats} />
// {monthlyApplications?.length > 1 && (
// <ChartsContainer data={monthlyApplications} />
// )}
// </>
// );
// };
// export default Stats;

// ERRORELEMENT.JSX

// import { useRouteError } from "react-router-dom"

// const ErrorElement = () => {
//     const error = useRouteError()
//     console.log(error)
//   return (
//     <h4>There was an error...</h4>
//   )
// }
// export default ErrorElement
