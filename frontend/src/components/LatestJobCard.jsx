import React from "react";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
const LatestJobCard = ({ job }) => {
 

  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.5 }}
  whileHover={{ scale: 1.05 }}
  className="p-6 rounded-2xl 
  bg-white dark:bg-white/5 
  backdrop-blur-xl 
  border border-white/20 dark:border-white/10 
  shadow-lg 
  transition duration-300
  hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
      
    >
     
      <div className="flex items-center justify-between">
        <img
          src={job?.company?.logo || "/default-logo.png"}
          alt="company logo"
          className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
        />
        <h2 className="text-sm text-black-500 font-bold dark:text-gray-50">
          {job?.company?.name}
        </h2>
      </div>

  
      <div className="mt-2">
        <h1 className=" font-semibold text-gray-900 dark:text-gray-50">
          {job?.title}
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-50 line-clamp-2 mt-1">
          {job?.description}
        </p>
      </div>

      {/* Job Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="inline-block px-5 py-2 rounded-xl 
                bg-blue-500/10 
                backdrop-blur-md 
                border border-blue-400/20
                
                text-blue-400 font-medium cursor-pointer">
          {job?.position} Positions
        </Badge>

        <Badge className="inline-block px-5 py-2 rounded-xl 
                bg-red-500/10 
                backdrop-blur-md 
                border border-red-400/20
                text-red-400 font-medium cursor-pointer">
          {job?.jobType}
        </Badge>

        <Badge className="inline-block px-5 py-2 rounded-xl 
                bg-purple-500/10 
                backdrop-blur-md 
                border border-purple-400/20
                text-purple-400 font-medium cursor-pointer">
          ₹{job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCard;
