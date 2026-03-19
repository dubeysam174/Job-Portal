import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const { allJobs } = useSelector((store) => store.job);

  const locations = [...new Set(allJobs.map((job) => job.location))];
  const industries = [...new Set(allJobs.map((job) => job.title))];
  const salaries = [...new Set(allJobs.map((job) => job.salary))]
    .sort((a,b)=>a-b)
    .map((s)=> `${s} LPA`);

  const filterData = [
    { filterType: "Location", array: locations },
    { filterType: "Industry", array: industries },
    ];
  
  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border p-5 max-h-[85vh] overflow-y-auto no-scrollbar dark:bg-gray-900">
      <h1 className="text-xl font-semibold">Filter Jobs</h1>
      <hr className="my-4" />

      <div className="space-y-6">
        {filterData.map((section, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-3">
              {section.filterType}
            </h2>

            <RadioGroup
              value={selectedValue}
              onValueChange={changeHandler}
              className="space-y-3"
            >
              {section.array.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer  hover:dark:bg-gray-600"
                >
                  <RadioGroupItem
                    value={item}
                    id={`${section.filterType}-${idx}`}
                  />

                  <Label
                    htmlFor={`${section.filterType}-${idx}`}
                    className="cursor-pointer text-sm"
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
