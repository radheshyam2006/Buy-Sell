import express from 'express';
import Data from '../database/userdata.js';
// import { change_Info } from '../database/userdata.js';
const login_api = express();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Middleware to parse JSON request body
dotenv.config();
// Login route with POST metho
login_api.post('/', async (req, res) => {
    console.log("Login route hit");
    try {
        console.log(req.body);
        const { Email, password } = req.body;
        // Check if both Email and password are provided
        if (!Email || !password) {
            return res.status(400).json({ message: 'Please provide both Email and password' });
        }

        // Find user by Email and password
        const user = await Data.findOne({ Email: Email });
        console.log("user deatails from backend login",user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log(Email, password);
        // change_Info(user);
        // console.log(user);
        // console.log("Login successful");
        // Respond with user data (excluding sensitive data like password)
        const userDetails={
            firstname:user.firstname,
            lastname:user.lastname,
            Email:user.Email,
            contact_number:user.contact_number,
            age:user.age
        };
        const userwithId={
            userDetails:userDetails,
            userId:user._id 
        }
        const token = jwt.sign({ user:userwithId}, process.env.SECRET_KEY);
        res.status(200).json({
            token,userInfo:user
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user", error });
    }
});

export default login_api;
