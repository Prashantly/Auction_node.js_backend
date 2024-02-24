import express from "express";
import { determineWinningBids, placeBid } from "../controllers/bidController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();

router.post('/place-bid', authenticateJWT, placeBid);
router.post('/win-bid', authenticateJWT, async (req, res) => {
    try {
        await determineWinningBids();
        res.status(200).json({ message: 'Winning bids determined successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error determining winning bids' });
    }
})


export default router;