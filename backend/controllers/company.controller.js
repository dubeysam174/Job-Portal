import { Company } from "../models/company.model.js";
import getDataUri from '../utils/datauri.js'
import cloudinary from '../utils/cloudinary.js'

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register  with same company.",
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in user id.
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "companies not found.",
        success: false,
      });
    }

    return res.status(200).json({
        companies,
        success:true
    })
  } catch (err) {
    console.log(err);
  }
};

// get company by id
export const getCompanyId = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// for updating the company.

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company
    });

  } catch (error) {
    console.log(error);
  }
};
