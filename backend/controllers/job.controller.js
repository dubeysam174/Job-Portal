import Job from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const newJob = await Job.create({
      title,
      description,
      requirements: Array.isArray(requirements)
        ? requirements
        : requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully",
      success: true,
      job: newJob,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// for students .
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim() || "";

    let query = {};

    if (keyword) {
      query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { location: { $regex: keyword, $options: "i" } }
        ]
      };
    }

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false
      });
    }

    const foundJob = await Job.findById(jobId)
      .populate("company")
      .populate("applications")
      .populate("created_by", "_id fullname email");

    if (!foundJob) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    return res.status(200).json({
      success: true,
      job: foundJob
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Server error"
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {

    const jobs = await Job.find({ created_by: req.id })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
