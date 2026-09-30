import nodemailer from 'nodemailer';

/**
 * Sends an email notification when a new contact message is submitted
 * @param {Object} options - { name, email, subject, message }
 */
export const sendEmailNotification = async ({ name, email, subject, message }) => {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    // Check if email credentials are provided in the environment
    if (!user || !pass) {
        console.log('📧 [Mock Email Service] EMAIL_USER / EMAIL_PASS not configured. Notification details:');
        console.log(`From: ${name} <${email}>`);
        console.log(`Subject: ${subject || 'New Contact Form Submission'}`);
        console.log(`Message: ${message}`);
        return { mock: true, sent: true };
    }

    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user,
                pass,
            },
        });

        const mailOptions = {
            from: `"${name}" <${user}>`,
            replyTo: email,
            to: process.env.EMAIL_TO || user,
            subject: subject ? `Portfolio Inquiry: ${subject}` : `New Message from ${name} via Portfolio`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e1e8ed; border-radius: 8px; padding: 20px;">
                    <h2 style="color: #2b6cb0; border-bottom: 2px solid #ebf8ff; padding-bottom: 8px;">New Contact Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message:</strong></p>
                    <p style="background: #f7fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message}</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Email sent successfully:', info.messageId);
        return { mock: false, sent: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Failed to send email notification:', error.message);
        // Do not throw so the contact form submission still succeeds in saving to DB
        return { mock: false, sent: false, error: error.message };
    }
};

export default sendEmailNotification;
