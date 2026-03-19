import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, SquareArrowOutUpRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["html", "js", "css"];
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
  <Navbar />

  {/* PROFILE CARD */}
  <div className="max-w-4xl mx-auto mt-8 px-4">
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 border dark:border-gray-700">

      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        
        <div className="flex items-center gap-5">
          <Avatar className="h-24 w-24 border-4 border-gray-100 dark:border-gray-700 shadow-sm">
            <AvatarImage src={user?.profile?.profilePhoto} />
          </Avatar>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {user?.fullname}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mt-1 max-w-md">
              {user?.profile?.bio}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          className="rounded-xl px-4 dark:border-gray-600 dark:text-white"
          onClick={() => setOpen(true)}
        >
          <Pen className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Contact Section */}
      <div className="mt-8 grid sm:grid-cols-2 gap-4">

        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
          <Mail className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {user?.email}
          </span>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
          <Contact className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {user?.phoneNumber}
          </span>
        </div>

      </div>

      {/* Skills Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {user?.profile?.skills.length !== 0 ? (
            user?.profile?.skills.map((item, index) => (
              <Badge
                key={index}
                className="px-3 py-1 rounded-full text-sm 
                           bg-gray-200 dark:bg-gray-700 
                           text-gray-800 dark:text-gray-200"
              >
                {item}
              </Badge>
            ))
          ) : (
            <span className="text-gray-500 dark:text-gray-400">NA</span>
          )}
        </div>
      </div>

      {/* Resume Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          View Resume
        </h2>

        {isResume ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={user?.profile?.resume}
            className="inline-flex items-center gap-2 
                       bg-black dark:bg-purple-600 
                       text-white px-5 py-2 rounded-xl 
                       hover:bg-gray-800 dark:hover:bg-purple-700 transition"
          >
            {user?.profile?.resumeOriginalName}
            <SquareArrowOutUpRight className="w-4 h-4" />
          </a>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            No resume uploaded
          </span>
        )}
      </div>
    </div>
  </div>

  {/* Applied Jobs */}
  {user?.role === "student" && (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 border dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Applied Jobs
        </h1>
        <AppliedJobTable />
      </div>
    </div>
  )}

  <UpdateProfileDialog open={open} setOpen={setOpen} />
</div>
  );
};

export default Profile;
