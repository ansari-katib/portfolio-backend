import nodemailer from 'nodemailer';

export const sendEmail = async (request, response) => {
    try {
        console.log("Request received:", request.body);
        const { name, email, subject, message } = request.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.GMAIL_USER,
            subject: subject,
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
              <h4 style="font-size: 20px; color: #6200ea;">You have received a new message from your portfolio:</h4>
              <div style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h2 style="font-size: 24px; color: #6200ea; margin-bottom: 10px;">Name: ${name}</h2>
                <p style="font-size: 18px; color: #333;">Email: <span style="font-weight: bold; color: #6200ea;">${email}</span></p>
                <p style="font-size: 18px; color: #333;">Subject: <span style="font-weight: bold; color: #6200ea;">${subject}</span></p>
                <p style="font-size: 18px; color: #333;">Message: </p>
                <p style="font-size: 16px; color: #555;">${message}</p>
              </div>
            </div>
          `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        response.status(200).json({ message: "Message received successfully!" });
    } catch (error) {
        console.error("Email send failed:", error);
        response.status(500).json({ message: `Failed to send message: ${error.message}` });
    }

}