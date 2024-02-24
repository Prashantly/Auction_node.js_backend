import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startingBid: {
        type: Number,
        required: true
    },
    currentBid: {
        type: Number,
        default: 0
    },
    bids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid'
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    auctionEndDate: {
        type: Date,
        required: true
    },

    winningBid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid'
    },
    winningBidAmount: {
        type: Number
    }
    // Additional fields as per your requirements
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

export default Item;