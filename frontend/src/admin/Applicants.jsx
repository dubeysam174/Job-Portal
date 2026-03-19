import React, { useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application || {});

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-300">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Glass Header */}
        <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl p-5 shadow-lg mb-6">
          
          <h1 className="font-bold text-2xl text-gray-800 dark:text-white">
            Applicants
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            Total Applicants:{" "}
            <span className="font-semibold text-gray-700 dark:text-white">
              {applicants?.applications?.length || 0}
            </span>
          </p>
        </div>

        {/* Table */}
        <ApplicantsTable />

      </div>
    </div>
  );
};

export default Applicants;