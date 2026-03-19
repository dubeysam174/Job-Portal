import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { motion } from "framer-motion";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!allAdminJobs) return;

    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      
      {/* 🔹 Card */}
      <div
        className="
          relative rounded-2xl p-5 overflow-hidden transition
          
          bg-white border border-gray-200 shadow-md
          
          dark:bg-white/10 
          dark:backdrop-blur-xl 
          dark:border-white/10
        "
      >
        
        {/* 🔹 Glow (ONLY DARK MODE) */}
        <div
          className="
            absolute inset-0 opacity-0 hover:opacity-100 transition duration-500
            
            dark:bg-gradient-to-br 
            dark:from-purple-500/10 
            dark:via-transparent 
            dark:to-blue-500/10
          "
        />

        <Table>
          <TableCaption className="text-gray-600 dark:text-gray-400">
            Recently posted jobs
          </TableCaption>

          {/* 🔹 Header */}
          <TableHeader>
            <TableRow className="border-b border-gray-200 dark:border-white/10">
              <TableHead className="text-gray-700 dark:text-gray-300">
                Company
              </TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">
                Role
              </TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">
                Date
              </TableHead>
              <TableHead className="text-right text-gray-700 dark:text-gray-300">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* 🔹 Body */}
          <TableBody>
            {filterJobs?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  🚫 No jobs found
                </TableCell>
              </TableRow>
            ) : (
              filterJobs.map((job, index) => (
                <motion.tr
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="
                    border-b border-gray-200 dark:border-white/10
                    
                    hover:bg-gray-50 
                    dark:hover:bg-white/10 
                    
                    hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]
                    transition duration-300
                  "
                >
                  {/* Company */}
                  <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                    {job?.company?.name || "N/A"}
                  </TableCell>

                  {/* Role */}
                  <TableCell className="text-gray-700 dark:text-gray-300 font-medium">
                    {job?.title}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-gray-600 dark:text-gray-400 text-sm">
                    {new Date(job?.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer text-gray-600 dark:text-gray-300 hover:scale-110 transition" />
                      </PopoverTrigger>

                      <PopoverContent
                        className="
                          w-36 rounded-xl shadow-lg border
                          
                          bg-white border-gray-200
                          
                          dark:bg-white/10 
                          dark:backdrop-blur-xl 
                          dark:border-white/10
                        "
                      >
                        {/* Edit */}
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/create?edit=${job._id}`)
                          }
                          className="
                            flex items-center gap-2 cursor-pointer p-2 rounded-md transition
                            
                            hover:bg-gray-100 
                            dark:hover:bg-white/10
                          "
                        >
                          <Edit2 className="w-4 text-purple-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Edit
                          </span>
                        </div>

                        {/* Applicants */}
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="
                            flex items-center gap-2 cursor-pointer mt-2 p-2 rounded-md transition
                            
                            hover:bg-gray-100 
                            dark:hover:bg-white/10
                          "
                        >
                          <Eye className="w-4 text-blue-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Applicants
                          </span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;