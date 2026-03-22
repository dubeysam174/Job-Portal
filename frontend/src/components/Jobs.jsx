import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [savedJobIds, setSavedJobIds] = useState(new Set());

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        const query = searchedQuery.toLowerCase();

        if (searchedQuery === "0-5 LPA") return job.salary >= 0 && job.salary <= 5;
        if (searchedQuery === "5-10 LPA") return job.salary > 5 && job.salary <= 10;
        if (searchedQuery === "10-20 LPA") return job.salary > 10 && job.salary <= 20;
        if (searchedQuery === "20+ LPA") return job.salary > 20;

        if (searchedQuery === "Fresher") return job.experienceLevel === 0 || job.experienceLevel === "0";
        if (searchedQuery === "1-2 Years") return job.experienceLevel >= 1 && job.experienceLevel <= 2;
        if (searchedQuery === "3-5 Years") return job.experienceLevel >= 3 && job.experienceLevel <= 5;
        if (searchedQuery === "5+ Years") return job.experienceLevel > 5;

        return (
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.jobType?.toLowerCase().includes(query)
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  const handleSave = (jobId) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      next.has(jobId) ? next.delete(jobId) : next.add(jobId);
      return next;
    });
  };

  const sortedJobs = useMemo(() => {
    return [...filterJobs].sort((a, b) => {
      const aSaved = savedJobIds.has(a._id) ? 0 : 1;
      const bSaved = savedJobIds.has(b._id) ? 0 : 1;
      return aSaved - bSaved;
    });
  }, [filterJobs, savedJobIds]);

  return (
    <div className="dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex gap-5">
          <div className="w-72 flex-shrink-0">
            <FilterCard />
          </div>

          {sortedJobs.length <= 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3 mt-20">
              <p className="text-lg font-medium">No jobs found</p>
              <p className="text-sm">Try different filters</p>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto no-scrollbar pb-5">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Showing <span className="font-semibold text-purple-600">{sortedJobs.length}</span> jobs
              </p>
              <div className="grid grid-cols-3 gap-6">
                <AnimatePresence>
                  {sortedJobs.map((job) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      key={job._id}
                    >
                      <Job
                        job={job}
                        isSaved={savedJobIds.has(job._id)}
                        onSave={handleSave}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;