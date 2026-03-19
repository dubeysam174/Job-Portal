import React, { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company || {});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Navbar */}
      <Navbar />

      {/* Glass Card */}
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg p-8">

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </Button>

            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Company Setup
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">
                  Company Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter company name"
                  className="bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white placeholder:text-gray-400"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">
                  Description
                </Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Company description"
                  className="bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white"
                />
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">
                  Website
                </Label>
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="https://company.com"
                  className="bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">
                  Location
                </Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="City, Country"
                  className="bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white"
                />
              </div>

              {/* File */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-700 dark:text-gray-300">
                  Company Logo
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white"
                />
              </div>

            </div>

            {/* Button */}
            {loading ? (
              <Button className="w-full flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
              >
                Update
              </Button>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;