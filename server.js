const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: 'https://pbackend.up.railway.app/api/contact', 
  // origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));  // Apply the CORS configuration
app.use(express.json()); // Replaced body-parser with express.json()

app.get("/", (req, res) => {
  res.send("✅ Backend is working");
});

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, 
  },
});

app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

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
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email send failed:", error);  // Log the error here
      return res.status(500).json({ message: `Failed to send message: ${error.message}` });  // Send back detailed error
    } else {
      console.log("Email sent:", info.response);
      return res.status(200).json({ message: "Message received successfully!" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
