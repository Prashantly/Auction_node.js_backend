import mongoose from "mongoose";;

const uri = "mongodb://0.0.0.0:27017/auction_app";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(
            `connected to MongoDB database`
        );
    } catch (error) {
        console.log(`Error in mongoDB ${error.message}`);
    }
};

export default connectDB;