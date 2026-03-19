import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD  // app password, not your gmail password
    }
});

export const sendEmail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: `"JobX" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });
        console.log("Email sent to:", to);
    } catch (error) {
        console.log("Email error:", error);
    }
};