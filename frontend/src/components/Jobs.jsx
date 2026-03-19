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

        if (
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
        ) return true;

        if (searchedQuery === "0-40K") return job.salary >= 0 && job.salary <= 40000;
        if (searchedQuery === "40K-1 LPA") return job.salary > 40000 && job.salary <= 100000;
        if (searchedQuery === "1 LPA - 5 LPA") return job.salary > 100000 && job.salary <= 500000;

        return false;
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

  // Saved jobs float to top, rest keep original order
  const sortedJobs = useMemo(() => {
    return [...filterJobs].sort((a, b) => {
      const aSaved = savedJobIds.has(a._id) ? 0 : 1;
      const bSaved = savedJobIds.has(b._id) ? 0 : 1;
      return aSaved - bSaved;
    });
  }, [filterJobs, savedJobIds]);

  return (
    <div className="dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>

          {sortedJobs.length <= 0 ? (
            <span>Job not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto no-scrollbar pb-5">
              <div className="grid grid-cols-3 gap-6">
                <AnimatePresence>
                  {sortedJobs.map((job) => (
                    <motion.div
                      layout                          // ← animates reorder smoothly
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