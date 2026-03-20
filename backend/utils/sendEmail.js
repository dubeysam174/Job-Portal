import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
    try {
        console.log("📧 Attempting to send email...");
        console.log("📧 TO:", to);

        const result = await resend.emails.send({
            from: "JobX <onboarding@resend.dev>",
            to: "shelbyltd2002@gmail.com", // ← always sends to you
            subject,
            html
        });

        console.log("✅ Email sent! Result:", result);
    } catch (error) {
        console.log("❌ Email failed!", error.message);
    }
};