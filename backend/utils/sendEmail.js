import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
    try {
        console.log("📧 Attempting to send email...");
        console.log("📧 FROM:", process.env.EMAIL_USER);
        console.log("📧 TO:", to);
        console.log("📧 SUBJECT:", subject);
        console.log("📧 APP PASSWORD SET:", !!process.env.EMAIL_PASS);
        console.log("📧 APP PASSWORD LENGTH:", process.env.EMAIL_PASS?.length);

        // ← create transporter INSIDE the function
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // ← verify connection first
        console.log("📧 Verifying SMTP connection...");
        await transporter.verify();
        console.log("📧 SMTP connection verified ✅");

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
        console.log("❌ Error code:", error.code);
        console.log("❌ Full error:", error);
    }
};