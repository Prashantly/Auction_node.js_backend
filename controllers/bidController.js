import Bid from "../models/Bid.js";
import Item from "../models/Item.js"
import moment from 'moment-timezone';

export const placeBid = async (req, res) => {
    try {
        const { itemId, bidAmount } = req.body;

        // Validate bid amount
        if (isNaN(bidAmount) || bidAmount <= 0) {
            return res.status(400).json({ message: 'Bid amount must be a valid positive number' });
        }

        // Find the item by ID
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Convert auction end date to Date object
        const auctionEndDate = new Date(item.auctionEndDate);

        // Get current time in UTC
        const currentTime = new Date();

        if (currentTime > auctionEndDate) {
            return res.status(400).json({ message: 'Auction has ended for this item' });
        }

        // Check if bidAmount is greater than or equal to currentBid
        if (bidAmount < item.currentBid) {
            return res.status(400).json({ message: 'Bid amount must be greater than current bid' });
        }

        // Check if bidAmount is equal to currentBid
        if (bidAmount === item.currentBid) {
            return res.status(400).json({ message: 'Bid amount must be higher than current bid' });
        }

        // Create a new Bid document
        const newBid = new Bid({
            bidder: req.user._id,
            amount: bidAmount,
            item: itemId,
        });

        // Save the Bid document
        const savedBid = await newBid.save();

        // Update the currentBid of the item
        item.currentBid = bidAmount;

        // Add bid details to the bids array
        item.bids.push(savedBid._id);

        // Save the updated item to the database
        const updatedItem = await item.save();

        // Respond with success message and bid details
        res.status(200).json({ message: 'Bid placed successfully', bid: { id: savedBid._id, amount: bidAmount } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Function to determine winning bids after the auction end date
export const determineWinningBids = async () => {
    try {

        const currentDate = new Date();

        console.log(currentDate)
        // Get all items whose auction end date has passed
        const items = await Item.find({ auctionEndDate: { $lt: currentDate } }).populate('bids');

        // Loop through each item and determine the winning bid
        for (const item of items) {
            // Sort bids for the item in descending order of amount
            const sortedBids = item.bids.sort((a, b) => b.amount - a.amount);

            // If there are no bids, set winning bid details to null
            const winningBid = sortedBids.length > 0 ? sortedBids[0] : null;

            // Update the item with the winning bid details
            item.winningBid = winningBid ? winningBid._id : null;

            item.winningBidAmount = winningBid ? winningBid.amount : null;

            await item.save();
        }
    } catch (error) {
        console.error('Error determining winning bids:', error);
    }
};
