import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async (
    name: string,
    email: string,
    message: string
) => {
    try {
        await resend.emails.send({
            from: 'Thumblify <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL as string,
            subject: `New Contact Message from ${name}`,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });
    } catch (error) {
        console.error('Email sending error:', error);
        throw error;
    }
};