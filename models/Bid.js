// models/Bid.js
import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
}, { timestamps: true });

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;