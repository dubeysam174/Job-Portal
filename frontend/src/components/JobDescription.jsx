import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import { setCurrentConversation } from "@/redux/messageSlice";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setIsApplied(true);
        setApplicationStatus("pending");
        toast.success(res.data.message);

        // ✅ Refetch job to get updated applicant count from MongoDB
        const updatedJob = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (updatedJob.data.success) {
          dispatch(setSingleJob(updatedJob.data.job));
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const startChat = async () => {
    try {
      const employerId = singleJob?.created_by?._id || singleJob?.created_by;
      if (!employerId) return toast.error("Employer not found");

      const res = await axios.post(
        "/api/v1/conversation",
        { receiverId: employerId },
        { withCredentials: true },
      );

      if (res.data.success) {
        dispatch(setCurrentConversation(res.data.conversation));
        navigate("/messages");
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not start conversation");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) =>
                application.applicant?.toString() === user?._id?.toString()
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchApplicationStatus = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/mystatus/${jobId}`,
          { withCredentials: true },
        );
        if (res.data.success) {
          setApplicationStatus(res.data.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
    fetchApplicationStatus();
  }, [jobId, dispatch, user?._id]);

  const canMessage =
    applicationStatus === "accepted" || applicationStatus === "rejected";

  if (!singleJob) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition duration-300">
      <Navbar />

      <div className="max-w-5xl mx-auto my-10 bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-lg p-8 transition duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
              {singleJob?.title}
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <Badge className="text-blue-700 dark:text-blue-400 font-semibold" variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="text-[#F83002] dark:text-red-400 font-semibold" variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209b7] dark:text-purple-400 font-semibold" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            {applicationStatus && (
              <span className={`text-xs font-semibold px-3 py-1 rounded-full
                ${applicationStatus === "accepted" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : ""}
                ${applicationStatus === "rejected" ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" : ""}
                ${applicationStatus === "pending" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" : ""}
              `}>
                {applicationStatus === "accepted" && "Application Accepted"}
                {applicationStatus === "rejected" && "Application Rejected"}
                {applicationStatus === "pending" && "Application Pending"}
              </span>
            )}

            <div className="flex gap-3">
              {canMessage && (
                <Button
                  onClick={startChat}
                  className="rounded-lg px-6 py-2 text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                >
                  Message Employer
                </Button>
              )}
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`rounded-lg px-6 py-2 text-white ${
                  isApplied
                    ? "bg-gray-500 cursor-not-allowed dark:bg-gray-600"
                    : "bg-[#7209b7] hover:bg-[#5f32ad] dark:bg-purple-500 dark:hover:bg-purple-600"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-b my-6 border-gray-300 dark:border-gray-700"></div>

        <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
          Job Description
        </h2>

        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p><span className="font-semibold text-black dark:text-white">Role:</span> {singleJob?.title}</p>
          <p><span className="font-semibold text-black dark:text-white">Location:</span> {singleJob?.location}</p>
          <p><span className="font-semibold text-black dark:text-white">Description:</span> {singleJob?.description}</p>
          <p>
            <b>Experience:</b>{" "}
            {singleJob?.experienceLevel === 0
              ? "Fresher"
              : `${singleJob?.experienceLevel ?? 0} ${singleJob?.experienceLevel === 1 ? "year" : "years"}`}
          </p>
          <p><span className="font-semibold text-black dark:text-white">Salary:</span> {singleJob?.salary} LPA</p>
          <p><span className="font-semibold text-black dark:text-white">Total Applicants:</span> {singleJob?.applications?.length}</p>
          <p><span className="font-semibold text-black dark:text-white">Posted Date:</span> {singleJob?.createdAt.split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;