import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { X } from "lucide-react";

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);

  const locations = [...new Set(allJobs.map((job) => job.location))];
  const industries = [...new Set(allJobs.map((job) => job.title))];

  const filterData = [
    { filterType: "Location", array: locations },
    { filterType: "Industry", array: industries },
    {
      filterType: "Job Type",
      array: ["Full Time", "Part Time", "Internship", "Remote"]
    },
    {
      filterType: "Salary",
      array: ["0-5 LPA", "5-10 LPA", "10-20 LPA", "20+ LPA"]
    },
    {
      filterType: "Experience",
      array: ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"]
    }
  ];

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  const clearFilter = () => {
    setSelectedValue("");
    dispatch(setSearchedQuery(""));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border p-5 max-h-[85vh] overflow-y-auto no-scrollbar dark:bg-gray-900 dark:border-gray-700">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold dark:text-white">Filter Jobs</h1>
        {selectedValue && (
          <button
            onClick={clearFilter}
            className="flex items-center gap-1 text-xs text-purple-600 hover:underline"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      <hr className="my-4 dark:border-gray-700" />

      <div className="space-y-6">
        {filterData.map((section, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-3 dark:text-white">
              {section.filterType}
            </h2>
            <RadioGroup
              value={selectedValue}
              onValueChange={changeHandler}
              className="space-y-2"
            >
              {section.array.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer hover:dark:bg-gray-700"
                >
                  <RadioGroupItem value={item} id={`${section.filterType}-${idx}`} />
                  <Label
                    htmlFor={`${section.filterType}-${idx}`}
                    className="cursor-pointer text-sm dark:text-gray-300"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;