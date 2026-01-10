import { Router } from "express";
import otpController from "../controllers/otp.controller";

const otpRouter = Router()

otpRouter.post("/generate-otp",otpController.sendOTP)
otpRouter.post("/verify-otp",otpController.verifyOTP)

export default otpRouter