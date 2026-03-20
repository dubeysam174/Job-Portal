import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, MessageSquare,Building } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { Toaster, toast } from "sonner";

import DarkModeToggle from "@/theme/DarkModeToggle";
import { MoonStar } from "lucide-react";
import {
  HomeIcon,
  BriefcaseIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { setUser, setLoading } from "@/redux/authSlice";
import { persistor } from "@/redux/Store";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async (e) => {
    try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`, {
            withCredentials: true,
        });
        if (res.data.success) {
            dispatch(setUser(null));
            dispatch(setLoading(false));
            await persistor.purge();
            navigate("/");
            toast.success(res.data.message);
        }
    } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
    }
};
  
  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-blend-darken  border-gray-200 ">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="flex items-center">
          <h1 className="inline-block px-5 py-2 rounded-xl text-2xl
              
                text-white-400 font-medium cursor-pointer mb-1">
            <Link to="/" className=" rounded-2xl px-2 py-1.5 font-bold ">
              Job<span className="text-[#9602f8]">X</span>
            </Link>
          </h1>
          <div className="mx-1"></div>
        </div>
        <div className="flex gap-1">
          <DarkModeToggle />
          <ul className="flex items-center gap-2 font-medium">
          
            {user?.role === "recruiter" && (
              <>
                <li>
                  <Link
                    to="/"
                    className="flex items-center gap-1 px-3 py-1 rounded-md
                    transition duration-200 hover:scale-110 hover:bg-purple-100
                    dark:hover:bg-purple-900 hover:shadow-md"
                  >
                    <HomeIcon className="h-6 w-6" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/companies"
                    className="flex items-center gap-1 px-3 py-1 rounded-md
                    transition duration-200 hover:scale-110 hover:bg-purple-100
                    dark:hover:bg-purple-900 hover:shadow-md"
                  >
                    <Building className="h-5 w-5" />
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="flex items-center gap-1 px-3 py-1 rounded-md
                    transition duration-200 hover:scale-110 hover:bg-purple-100
                    dark:hover:bg-purple-900 hover:shadow-md"
                  >
                    <BriefcaseIcon className="h-5 w-5" />
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/messages"
                    className="flex items-center gap-1 px-3 py-1 rounded-md
                    transition duration-200 hover:scale-110 hover:bg-purple-100
                    dark:hover:bg-purple-900 hover:shadow-md"
                  >
                    <MessageSquare size={16} />
                    Messages
                  </Link>
                </li>
              </>
            )}

           
            {user?.role === "student" && (
              <>
                <div className="flex">
                  <li>
                    <Link
                      to="/"
                      className="flex items-center gap-2 px-3 py-1 rounded-md
                    transition duration-200 hover:scale-110 hover:bg-purple-100
                    dark:hover:bg-purple-900 hover:shadow-md"
                    >
                      <HomeIcon className="h-6 w-6" />
                      Home
                    </Link>
                  </li>
                </div>
                <li>
                  <Link
                    to="/jobs"
                    className="flex items-center gap-2 px-3 py-1 rounded-md
                    transition duration-200 hover:scale-110 hover:bg-purple-100
                    dark:hover:bg-purple-900 hover:shadow-md"
                  >
                    <BriefcaseIcon className="h-5 w-5" />
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="flex items-center gap-2 px-3 py-1 rounded-md
                    transition duration-200 hover:scale-110 hover:bg-purple-100
                    dark:hover:bg-purple-900 hover:shadow-md"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    Browse
                  </Link>
                </li>
                <li>
                  <Link
                    to="/messages"
                    className="flex items-center gap-2 px-3 py-1 rounded-md
                    transition duration-200 hover:scale-110 hover:bg-purple-100
                    dark:hover:bg-purple-900 hover:shadow-md"
                  >
                    <MessageSquare size={16} />
                    Messages
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex-items-center gap-12">
              <Link to="/login">
                <button className="px-4 py-2 text-gray-700 font-medium rounded-md hover:text-purple-600 transition duration-200 dark:text-gray-300">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition duration-200 shadow-sm">
                  Signup
                </button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger
                asChild
                className="backdrop-blur-md bg-blend-darken"
              >
                <Avatar className="cursor-pointer ">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
             <PopoverContent
  className="
    w-72 p-3 rounded-xl border shadow-xl overflow-hidden relative
    
    bg-white border-gray-200
    
    dark:bg-[#0f172a]/80 
    dark:backdrop-blur-xl 
    dark:border-white/10
  "
>
  {/* 🔹 Gradient Glow (ONLY DARK) */}
  <div
    className="
      absolute inset-0 opacity-0 hover:opacity-100 transition duration-500
      
      dark:bg-gradient-to-br 
      dark:from-purple-500/10 
      dark:via-transparent 
      dark:to-blue-500/10
    "
  />

  {/* 🔹 User Info */}
  <div className="relative flex items-center gap-3 px-3 py-2 rounded-md">
    <Avatar>
      <AvatarImage src={user?.profile?.profilePhoto} />
    </Avatar>
    <div>
      <h4 className="font-medium text-gray-800 dark:text-white">
        {user?.fullname}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {user?.profile?.bio}
      </p>
    </div>
  </div>

  {/* Divider */}
  <div className="my-2 border-t border-gray-200 dark:border-white/10" />

  {/* 🔹 View Profile */}
  <div
    className="
      relative flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition
      
      hover:bg-gray-100 
      dark:hover:bg-white/10
    "
  >
    <User2 className="w-4 text-purple-500" />
    <Link
      to="/profile"
      className="text-gray-700 dark:text-gray-300 text-sm"
    >
      View Profile
    </Link>
  </div>

  {/* 🔹 Logout */}
  <div
    onClick={logoutHandler}
    className="
      relative flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition
      
      hover:bg-gray-100 
      dark:hover:bg-white/10
    "
  >
    <LogOut className="w-4 text-blue-500" />
    <span className="text-gray-700 dark:text-gray-300 text-sm">
      Logout
    </span>
  </div>
</PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;