import express from "express";
import { listItem, getAllItems } from "../controllers/itemController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();


router.get('/items', authenticateJWT, getAllItems);
router.post('/create-item', authenticateJWT, listItem)


export default router;