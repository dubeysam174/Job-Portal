import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job, onSave, isSaved }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className={`relative p-5 rounded-xl 
      bg-white/70 dark:bg-white/5
      backdrop-blur-xl 
      border ${isSaved 
        ? 'border-purple-400/50' 
        : 'border-gray-200/50 dark:border-white/10'
      }
      shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
      hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] 
      hover:-translate-y-2 transition duration-300 overflow-y-auto no-scrollbar`}
    >

      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </span>
        <Bookmark
          onClick={() => onSave(job._id)}
          className={`w-4 h-4 cursor-pointer transition-colors ${
            isSaved
              ? "text-purple-600 fill-purple-600"
              : "hover:text-purple-600"
          }`}
        />
      </div>

  
      <div className="flex items-center gap-3 mt-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-50">
            {job?.company?.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {job?.location}
          </p>
        </div>
      </div>

     
      <div className="mt-4">
        <h2 className="font-bold text-lg text-gray-900 dark:text-gray-50">
          {job?.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
          {job?.description}
        </p>
      </div>

     
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="inline-block px-5 py-2 rounded-xl 
          bg-blue-500/10 backdrop-blur-md border border-blue-400/20
          text-blue-400 font-medium cursor-pointer">
          {job?.position} Positions
        </Badge>

        <Badge className="inline-block px-5 py-2 rounded-xl 
          bg-red-500/10 backdrop-blur-md border border-red-400/20
          text-red-400 font-medium cursor-pointer">
          {job?.jobType}
        </Badge>

        <Badge className="inline-block px-5 py-2 rounded-xl 
          bg-purple-500/10 backdrop-blur-md border border-purple-400/20
          text-purple-400 font-medium cursor-pointer">
          ₹{job?.salary} LPA
        </Badge>
      </div>

      
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => job?._id && navigate(`/description/${job._id}`)}
        >
          Details
        </Button>
        <Button
          onClick={() => onSave(job._id)}
          className={`transition-colors ${
            isSaved ? "bg-purple-900" : "bg-purple-700"
          }`}
        >
          {isSaved ? "Saved " : "Save for Later"}
        </Button>
      </div>

    </div>
  );
};

export default Job;