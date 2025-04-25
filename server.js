const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(body.json())

app.get('/', (req, res) => {
    res.send("hello there the backend is working :");
})

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:587,
    secure:false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
})


app.post('/api/contact', (req, res) => {

    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.GMAIL_USER,
        subject: subject,
        text: `You have received a new message from your Portfolio :
        Name: ${name}
        Email: ${email}
        Message: ${message}
    `,

    }

    transporter.sendMail(mailOptions , (error ,info) => {
           if(error) console.log(error);
           else{
            console.log("Email send to " + info.response);
            return res.status(200).send({message:"Message received successfully!"});
           }
    })
})

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})