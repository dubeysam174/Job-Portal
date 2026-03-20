import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
    try {
        console.log("📧 Attempting to send email...");
        console.log("📧 FROM:", process.env.EMAIL_USER);
        console.log("📧 TO:", to);
        console.log("📧 APP PASSWORD SET:", !!process.env.EMAIL_PASS);
        console.log("📧 APP PASSWORD LENGTH:", process.env.EMAIL_PASS?.length);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,        // ← try 587
            secure: false,    // ← false for 587
            requireTLS: true, // ← force TLS upgrade
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false // ← bypass certificate issues
            }
        });

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
    }
};