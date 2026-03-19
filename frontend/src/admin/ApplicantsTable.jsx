import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const [loadingId, setLoadingId] = useState(null);

  const statusHandler = async (status, id) => {
    try {
      setLoadingId(id);
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoadingId(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-white/10">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Applicants
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Manage and review all applicants
        </p>
      </div>

      {/* Table */}
      <div className="p-5 overflow-x-auto backdrop-blur-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100/70 dark:bg-white/5 backdrop-blur">
              <TableHead className="text-gray-700 dark:text-gray-300">
                Full Name
              </TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">
                Email
              </TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">
                Contact
              </TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">
                Resume
              </TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">
                Date
              </TableHead>
              <TableHead className="text-right text-gray-700 dark:text-gray-300">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applicants?.applications?.length > 0 ? (
              applicants.applications.map((item) => (
                <TableRow
                  key={item._id}
                  className="transition backdrop-blur-md hover:bg-white/40 dark:hover:bg-white/10"
                >
                  {/* Name */}
                  <TableCell className="font-medium text-gray-800 dark:text-white">
                    {item?.applicant?.fullname}
                  </TableCell>

                  {/* Email */}
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {item?.applicant?.email}
                  </TableCell>

                  {/* Phone */}
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {item?.applicant?.phoneNumber}
                  </TableCell>

                  {/* Resume */}
                  <TableCell>
                    {item?.applicant?.profile?.resume ? (
                      <a
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">
                        NA
                      </span>
                    )}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-gray-600 dark:text-gray-300">
                    {formatDate(item?.createdAt)}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10">
                        <MoreHorizontal size={18} />
                      </PopoverTrigger>

                      <PopoverContent className="w-32 p-2 backdrop-blur-xl bg-white/80 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-xl shadow-lg">
                        {shortlistingStatus.map((status, index) => (
                          <button
                            key={index}
                            disabled={loadingId === item._id}
                            onClick={() =>
                              statusHandler(status, item._id)
                            }
                            className="w-full text-left px-2 py-1 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-50"
                          >
                            {loadingId === item._id
                              ? "Updating..."
                              : status}
                          </button>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-500 dark:text-gray-400 py-6"
                >
                  No applicants found 🚫
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;