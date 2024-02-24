import express from "express";
import userAuthRouter from "./userAuth.js";
import itemRouter from "./itemRoutes.js";
import bidRouter from "./bidRoutes.js"

//router object
const router = express.Router();

//auth routes
router.use("/api/v1/auth", userAuthRouter);
router.use('/api/v1/item', itemRouter);
router.use('/api/v1/bid', bidRouter);


export default router;