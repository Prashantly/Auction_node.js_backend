import Bid from "../models/Bid.js";
import Item from "../models/Item.js"

// Function to list a new item for auction
export const listItem = async (req, res) => {

    console.log(req.user)
    try {
        // Extract item details from request body
        const { name, description, startingBid, auctionEndDate } = req.body;

        // Create a new item instance
        const newItem = new Item({
            name,
            description,
            startingBid,
            auctionEndDate,
            seller: req.user._id
        });

        // Save the new item to the database
        const savedItem = await newItem.save();

        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to view all items available for auction
export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find().populate('bids').populate('seller', 'name');
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

