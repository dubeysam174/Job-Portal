import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
// import { Label } from '../ui/label'
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((Store) => Store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div
        className="min-h-screen flex items-center justify-center 
bg-gray-50 dark:bg-gray-900 px-6"
      >
        <div className="flex flex-col md:flex-row items-center  gap-12 max-w-6xl w-full">
          {/* LEFT SIDE */}
          <motion.div
            className="flex flex-col gap-6 md:w-1/2
                                  initial={{ opacity: 0, x: -80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}"
          >
            <h1 className="text-4xl font-bold leading-tight">
              Your Dream Job Awaits
            </h1>

            <p className="text-gray-500 text-lg">
              Create an account and start exploring thousands of opportunities.
              Connect with recruiters and build your career today.
            </p>

            <DotLottieReact
              src="https://lottie.host/ce4a87a1-23fe-4335-9f31-6cef66205fee/wGvT4qLPs4.lottie"
              loop={true}
              autoplay={true}
            />
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <form
            onSubmit={submitHandler}
            className="bg-white/70 dark:bg-white/10 backdrop-blur-xl 
border border-gray-200 dark:border-white/10 
rounded-2xl p-8 w-full max-w-md 
shadow-[0_0_30px_rgba(168,85,247,0.2)] 
hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] transition"
          >
            <h2 className="font-bold text-2xl mb-6 text-center">Sign Up</h2>

            <div className="mb-4">
              <Label>Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                placeholder="John Doe"
                onChange={changeEventHandler}
                className="mt-2"
              />
            </div>

            <div className="mb-4">
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="xyz@gmail.com"
                className="mt-2"
              />
            </div>

            <div className="mb-4">
              <Label>Phone Number</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="1234567890"
                className="mt-2"
              />
            </div>

            <div className="mb-4">
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter password"
                className="mt-2"
              />
            </div>

            {/* Role */}
            <div className="flex gap-6 my-4">
              <label
                className="flex items-center gap-2 cursor-pointer 
px-3 py-2 rounded-lg border 
hover:bg-purple-50 dark:hover:bg-gray-800"
              >
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                Student
              </label>

              <label
                className="flex items-center gap-2 cursor-pointer 
px-3 py-2 rounded-lg border 
hover:bg-purple-50 dark:hover:bg-gray-800"
              >
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                Recruiter
              </label>
            </div>

            <div className="mb-4">
              <Label>Profile Photo</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="mt-2"
              />
            </div>

            {loading ? (
              <Button className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait...
              </Button>
            ) : (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 
text-white py-2 rounded-lg 
hover:scale-105 transition duration-300 shadow-lg"
              >
                Sign Up
              </button>
            )}

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
