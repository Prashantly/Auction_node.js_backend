import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/User.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        console.log(req.body)
        if (!name || !email || !password || !phone) {
            return res
                .status(401)
                .send({ success: false, message: "Please fill all fields" });
        }

        const existingUser = await User.findOne({ email }).exec();

        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: "User exist, Please login",
            });
        }

        //hash password
        const hashedPassword = await hashPassword(password);

        const user = await new User({
            name,
            email,
            password: hashedPassword,
            phone,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Registered successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error registering user",
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validate
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Email or Password Missing!",
            });
        }

        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Oops!🫣🫣 Incorrect Email/Password Combination.",
            });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(403).send({
                success: false,
                message: "Oops!🫣🫣 Incorrect Email/Password Combination.",
            });
        }

        //create Token and send it to the client side
        const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).send({
            success: true,
            message: `Welcome back, ${user.name}! 🎉 Happy shopping on S-Mart!🥳🥳`,
            user: {
                name: user.name,
                email: user.email,
            },
            authToken: token,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in logging in User",
            error,
        });
    }
};