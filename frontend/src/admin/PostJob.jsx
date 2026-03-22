import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JOB_API_END_POINT } from "@/utils/constant";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value,
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="flex justify-center items-center py-10 px-4">
        {/* 🔹 Glass Card */}
        <form
          onSubmit={submitHandler}
          className="
          w-full max-w-5xl p-10 space-y-6 rounded-2xl border shadow-lg
          
          bg-white border-gray-200
          
          dark:bg-white/10 
          dark:backdrop-blur-xl 
          dark:border-white/20
        "
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
            Post Job
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700 dark:text-gray-200">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={changeHandler}
                placeholder="Frontend Developer"
                className="
                p-2 rounded-md border
                
                bg-white text-gray-800 border-gray-300
                
                dark:bg-white/10 
                dark:text-white 
                dark:border-white/20 
                dark:placeholder:text-gray-400
              "
              />
            </div>

            {/* Company */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700 dark:text-gray-200">
                Company
              </label>

              {companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger
                    className="
                    w-full 
                    bg-white border-gray-300 text-gray-800
                    
                    dark:bg-white/10 
                    dark:border-white/20 
                    dark:text-white
                  "
                  >
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>

                  <SelectContent
                    className="
                    bg-white border-gray-200
                    
                    dark:bg-gray-800/90 
                    dark:backdrop-blur-md 
                    dark:border-white/10
                  "
                  >
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                          className="dark:text-white"
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700 dark:text-gray-200">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={changeHandler}
                placeholder="Chandigarh"
                className="p-2 rounded-md border bg-white text-gray-800 border-gray-300 dark:bg-white/10 dark:text-white dark:border-white/20"
              />
            </div>

            {/* Salary */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700 dark:text-gray-200">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeHandler}
                placeholder="10 LPA"
                className="p-2 rounded-md border bg-white text-gray-800 border-gray-300 dark:bg-white/10 dark:text-white dark:border-white/20"
              />
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700 dark:text-gray-200">
                Experience
              </label>
              <input
                type="text"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={changeHandler}
                placeholder="2 Years"
                className="p-2 rounded-md border bg-white text-gray-800 border-gray-300 dark:bg-white/10 dark:text-white dark:border-white/20"
              />
            </div>

            {/* Position */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700 dark:text-gray-200">
                Number of Positions
              </label>
              <input
                type="number"
                name="position"
                value={input.position}
                onChange={changeHandler}
                placeholder="3"
                className="p-2 rounded-md border bg-white text-gray-800 border-gray-300 dark:bg-white/10 dark:text-white dark:border-white/20"
              />
            </div>

            {/* Job Type */}
            <select
              name="jobType"
              value={input.jobType}
              onChange={changeHandler}
              className="
    p-2 rounded-md border outline-none

    bg-white text-gray-800 border-gray-300

    dark:bg-gray-800 
    dark:text-white 
    dark:border-gray-600
  "
            >
              <option
                value=""
                className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
              >
                Select Job Type
              </option>
              <option
                value="Full Time"
                className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
              >
                Full Time
              </option>
              <option
                value="Part Time"
                className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
              >
                Part Time
              </option>
              <option
                value="Internship"
                className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
              >
                Internship
              </option>
              <option
                value="Remote"
                className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
              >
                Remote
              </option>
            </select>

            {/* Requirements */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700 dark:text-gray-200">
                Requirements
              </label>
              <input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeHandler}
                placeholder="React, Node.js"
                className="p-2 rounded-md border bg-white text-gray-800 border-gray-300 dark:bg-white/10 dark:text-white dark:border-white/20"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 dark:text-gray-200">
              Job Description
            </label>
            <textarea
              name="description"
              value={input.description}
              onChange={changeHandler}
              rows="4"
              placeholder="Write job description..."
              className="p-2 rounded-md border bg-white text-gray-800 border-gray-300 dark:bg-white/10 dark:text-white dark:border-white/20"
            />
          </div>

          {/* Button */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="
              w-full my-4 
              bg-black text-white
              
              dark:bg-white 
              dark:text-black 
              dark:hover:bg-gray-200
            "
            >
              Post New Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 dark:text-red-400 font-bold text-center my-3">
              *Please register a company first, before posting jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
