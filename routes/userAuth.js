import express from "express";
import { loginController, registerController } from "../controllers/authController.js";


//router object
const router = express.Router();

//REGISTER || METHOD:POST
router.post("/register", registerController);

//Login || Method:POST
router.post("/login", loginController);

export default router;