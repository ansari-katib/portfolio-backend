const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(body.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is working");
});

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // use service instead of host/port for Gmail
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // this should be an App Password
  },
});

app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: subject,
    text: `You have received a new message from your portfolio:
    
Name: ${name}
Email: ${email}
Message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email send failed:", error);
      return res.status(500).send({ message: "Failed to send message." });
    } else {
      console.log("Email sent:", info.response);
      return res.status(200).send({ message: "Message received successfully!" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
