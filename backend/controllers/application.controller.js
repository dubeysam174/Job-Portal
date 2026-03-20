import { Application } from "../models/application.model.js";
import Job  from "../models/job.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { io, onlineUsers } from "../index.js"; // ← add this

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}

const sendAutoMessage = async (recruiterId, applicantId, text, io, onlineUsers) => {
    let conversation = await Conversation.findOne({
        participants: { $all: [recruiterId, applicantId] }
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [recruiterId, applicantId]
        });
    }

    const message = await Message.create({
        conversationId: conversation._id,
        sender: recruiterId,
        text
    });

    await Conversation.findByIdAndUpdate(conversation._id, {
        lastMessage: message._id
    });

    const applicantSocketId = onlineUsers.get(applicantId.toString());
    if (applicantSocketId) {
        io.to(applicantSocketId).emit("new_message", {
            conversationId: conversation._id,
            text,
            sender: recruiterId,
            createdAt: new Date()
        });
        console.log("💬 Auto message sent in real-time");
    } else {
        console.log("💬 Auto message saved, applicant offline");
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        console.log("1. updateStatus called", { status, applicationId });

        if (!status) {
            return res.status(400).json({ message: 'status is required', success: false });
        }

        const application = await Application.findById(applicationId)
            .populate('applicant', 'fullname email')
            .populate({
                path: 'job',
                select: 'title',
                populate: { path: 'company', select: 'name' }
            });

        if (!application) {
            return res.status(404).json({ message: "Application not found.", success: false });
        }

        application.status = status.toLowerCase();
        await application.save();

        const isAccepted = status.toLowerCase() === 'accepted';
        const isRejected = status.toLowerCase() === 'rejected';

        if (isAccepted || isRejected) {
            const applicantId = application.applicant._id;
            const recruiterId = req.id; // ← logged in recruiter
            const applicantName = application.applicant.fullname;
            const applicantEmail = application.applicant.email;
            const jobTitle = application.job.title;
            const companyName = application.job.company?.name || "the company";

            // ✅ Auto message in conversation
            const autoMessageText = isAccepted
                ? `🎉 Congratulations ${applicantName}! Your application for ${jobTitle} at ${companyName} has been Accepted! We will be in touch shortly.`
                : `😔 Sorry ${applicantName}, after careful consideration your application for ${jobTitle} at ${companyName} has not been selected. Don't give up!`;

            await sendAutoMessage(recruiterId, applicantId, autoMessageText); // ← add this

            

            // 📧 Email
            const subject = isAccepted
                ? `Congratulations! Your application for ${jobTitle} has been accepted`
                : `Update on your application for ${jobTitle}`;

            const html = isAccepted
                ? `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <h2 style="color: #16a34a;">Congratulations, ${applicantName}! 🎉</h2>
                        <p>Your application for <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been:</p>
                        <p style="font-size: 20px; font-weight: bold; color: #16a34a; text-align: center; padding: 10px; background: #f0fdf4; border-radius: 6px;">ACCEPTED ✓</p>
                        <p>The recruiter will be in touch with you shortly.</p>
                        <br/>
                        <p style="color: #6b7280; font-size: 14px;">Best regards,<br/>Team JobX</p>
                    </div>`
                : `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <h2 style="color: #dc2626;">Application Update</h2>
                        <p>Dear <strong>${applicantName}</strong>,</p>
                        <p>Your application for <strong>${jobTitle}</strong> at <strong>${companyName}</strong>:</p>
                        <p style="font-size: 20px; font-weight: bold; color: #dc2626; text-align: center; padding: 10px; background: #fef2f2; border-radius: 6px;">NOT SELECTED</p>
                        <p>Don't be discouraged — keep applying on <strong>JobX</strong>!</p>
                        <br/>
                        <p style="color: #6b7280; font-size: 14px;">Best regards,<br/>Team JobX</p>
                    </div>`;

            await sendEmail({ to: applicantEmail, subject, html });
        }

        console.log("2. updateStatus completed");
        return res.status(200).json({ message: "Status updated successfully.", success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}


// Get application status for a specific job
export const getApplicationStatus = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.id;

        const application = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        if (!application) {
            return res.status(200).json({
                success: true,
                status: null  // not applied yet
            });
        }

        return res.status(200).json({
            success: true,
            status: application.status  // pending, accepted, rejected
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}