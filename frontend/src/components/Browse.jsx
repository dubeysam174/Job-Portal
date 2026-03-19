import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Search } from "lucide-react";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();

  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const { allJobs = [] } = useSelector((store) => store.job);

  // Debounced search
  useEffect(() => {

    const delaySearch = setTimeout(() => {
      dispatch(setSearchedQuery(query));
    }, 500); // waits 500ms after typing

    return () => clearTimeout(delaySearch);

  }, [query, dispatch]);

  return (
   <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
  <Navbar />

  <div className="max-w-7xl mx-auto my-10">

    <div className="flex w-[40%] shadow-lg border border-gray-200 
    pl-3 rounded-full items-center gap-4 mx-auto 
    bg-white dark:bg-gray-800 dark:border-gray-700">

      <Search className="h-5 w-5 text-gray-500 dark:text-gray-300"/>

      <input
        type="text"
        placeholder="Find your dream jobs"
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        className="outline-none border-none w-full py-2 
        text-gray-600 dark:text-gray-200 bg-transparent"
      />
    </div>

    <h1 className="font-bold text-xl my-10 text-gray-900 dark:text-white">
      Search Results ({allJobs.length})
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allJobs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No jobs found</p>
      ) : (
        allJobs.map((job)=>(
          <Job key={job._id} job={job}/>
        ))
      )}
    </div>

  </div>
</div>
  );
};

export default Browse;