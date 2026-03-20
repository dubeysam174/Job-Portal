import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendEmail = async ({ to, subject, html }) => {
    try {
        console.log("📧 Attempting to send email...");
        console.log("📧 FROM:", process.env.EMAIL_USER);
        console.log("📧 TO:", to);
        console.log("📧 SUBJECT:", subject);
        console.log("📧 APP PASSWORD SET:", !!process.env.EMAIL_PASS);

        const result = await transporter.sendMail({
            from: `"JobX" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });

        console.log("✅ Email sent successfully! Message ID:", result.messageId);
    } catch (error) {
        console.log("❌ Email failed!");
        console.log("❌ Error message:", error.message);
        console.log("❌ Full error:", error);
    }
};