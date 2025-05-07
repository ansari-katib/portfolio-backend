import express from 'express';
import cors from "cors";
import MessageRoute from './Routes/MessageRoute.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: "https://ak-portfoli.netlify.app",
  methods: ["POST", "GET"],
  credentials: true,
}));

app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is working");
});

// Routes : 
app.use("/api", MessageRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
