import express from "express";
// import { login, register, updateProfile,logout } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getCompany,
  getCompanyId,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyId);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);

export default router;
