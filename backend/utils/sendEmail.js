import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const result = await resend.emails.send({
            from: "JobX <onboarding@resend.dev>",
            to,
            subject,
            html
        });
        console.log("Email sent:", result); // ← log full result
    } catch (error) {
        console.log("Email error:", error); // ← check full error object
        throw error; // ← bubble up so you can catch it
    }
};