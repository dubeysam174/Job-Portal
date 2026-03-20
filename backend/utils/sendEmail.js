import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,          // ✅ use 587 instead of default 465
    secure: false,      // ✅ false for port 587 (uses STARTTLS)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false  // ✅ helps on some hosting platforms
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