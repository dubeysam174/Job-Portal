import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {USER_API_END_POINT} from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { Button } from './ui/button'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume || "",
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //for changing the file.
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("skills", input.skills);
    formData.append("bio", input.bio);
    if (input.file instanceof File) {
  formData.append("file", input.file);
}
    try {
      setLoading(true)
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false)
    }
    setOpen(false);
    console.log(input);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent
    className="w-[95%] sm:max-w-[500px] max-h-[90vh] overflow-y-hidden
               rounded-2xl p-6 
               bg-white dark:bg-gray-900 
               border dark:border-gray-700"
  >
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
        Update Profile
      </DialogTitle>

      <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
        Update your personal information and upload your resume.
      </DialogDescription>
    </DialogHeader>

    <form className="space-y-5 mt-4" onSubmit={submitHandler}>
      
      {/* Name */}
      <div className="space-y-2">
        <Label className="dark:text-gray-300">Name</Label>
        <Input
          name="fullname"
          value={input.fullname}
          onChange={changeEventHandler}
          className="rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label className="dark:text-gray-300">Email</Label>
        <Input
          name="email"
          value={input.email}
          onChange={changeEventHandler}
          className="rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label className="dark:text-gray-300">Phone Number</Label>
        <Input
          name="phoneNumber"
          value={input.phoneNumber}
          onChange={changeEventHandler}
          className="rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label className="dark:text-gray-300">Bio</Label>
        <Input
          name="bio"
          value={input.bio}
          onChange={changeEventHandler}
          className="rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <Label className="dark:text-gray-300">Skills</Label>
        <Input
          name="skills"
          value={input.skills}
          onChange={changeEventHandler}
          className="rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      {/* File */}
      <div className="space-y-2">
        <Label className="dark:text-gray-300">Resume (PDF)</Label>
        <Input
          type="file"
          accept="application/pdf"
          onChange={fileChangeHandler}
          className="rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 file:dark:bg-gray-700 file:dark:text-white"
        />
      </div>

      {/* Button */}
      <DialogFooter className="pt-4">
        {loading ? (
          <Button className="w-full my-4 dark:bg-gray-700 dark:text-white">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full my-4 bg-black dark:bg-purple-600 hover:bg-gray-800 dark:hover:bg-purple-700 text-white"
          >
            Update
          </Button>
        )}
      </DialogFooter>

    </form>
  </DialogContent>
</Dialog>
  );
};

export default UpdateProfileDialog;
