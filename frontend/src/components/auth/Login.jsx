import Navbar from "../shared/Navbar";
// import { Label } from '../ui/label'
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((Store) => Store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="flex min-h-[90vh]">
        {/* Left Section */}
        <div className="hidden md:flex w-1/2 bg-gray-50 dark:bg-gray-900 text-black dark:text-white items-center justify-center p-10">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Job<span className="text-[#9602f8]">X</span>
            </h1>

            <p className="text-lg">
              Discover thousands of job opportunities and build your career with
              top companies.
            </p>

            <DotLottieReact
              src="https://lottie.host/4fbe07dc-f4b4-43ec-bc89-28735de1f29b/wrIERCngta.lottie"
              loop={true}
              autoplay={true}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 dark:bg-gray-900">
          <form
            onSubmit={submitHandler}
            className="bg-white/70 dark:bg-white/10 backdrop-blur-xl 
border border-white/20 rounded-2xl p-8 w-[380px] 
shadow-[0_0_30px_rgba(168,85,247,0.2)]"
          >
            <h1 className="font-bold text-2xl mb-6 text-center">Login</h1>

            {/* Email */}
            <div className="relative mb-4">
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

            {/* Password */}
            <div className="mb-4">
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                className="mt-2"
              />
            </div>

            {/* Role */}
            <RadioGroup className="flex gap-6 my-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label>Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>

            {/* Button */}
            {loading ? (
              <Button className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-900 to-purple-800 
                text-white rounded-xl py-2 
                 hover:scale-105 transition duration-300 shadow-lg"
              >
                Login
              </Button>
            )}

            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-600 font-medium">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
