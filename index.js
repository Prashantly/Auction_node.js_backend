// Import required modules
import "dotenv/config";
import express from "express";
import connectDB from "./configs/mongoose.js";
import indexRoutes from "./routes/index.js";
import { passport, jwtStrategy } from "./configs/passport_JWT_strategy.js";

// Initialize Express app
const app = express();

//database config
connectDB();

const PORT = process.env.PORT || 8001;


// Use the express.json() middleware to parse JSON requests
app.use(express.json());

//initialize passport
passport.use(passport.initialize());

// routes
app.use("/", indexRoutes);


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});