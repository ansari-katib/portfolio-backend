import { Router } from "express";
import { sendEmail } from "../Controllers/MessageController.js";

const MessageRoute = Router();

MessageRoute.post("/contact" , sendEmail);

export default MessageRoute;
