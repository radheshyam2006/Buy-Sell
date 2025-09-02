
import express from 'express';
// Importing the default export
import Data from '../database/userdata.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import Registration from '../../frontend/src/pages/Registration/Registration.jsx';
dotenv.config();
const Registration_api = express();

Registration_api.post('/', async (req, res) => {
    const { firstname, lastname, Email, contact_number, age, password } = req.body.userdata;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
        const user = await Data.findOne({
            $or: [
                { Email: { $regex: `^${Email}$`, $options: 'i' } }, 
                { contact_number } 
            ]
        });
        console.log(user);
        if (user) {
            res.userexist=1;
            return res.status(400).json("user may already exist");
        }

        const newuser = new Data({
            firstname, 
            lastname, 
            Email, 
            contact_number, 
            age, 
            password:hashedPassword
        });

        // Log to see what data is being sent
        await newuser.save();
        console.log(newuser); 
        const userDetails={
            firstname,
            lastname,
            Email,
            contact_number,
            age
        };
        const user2 = await Data.findOne({ Email: Email});
        userwithId={
            userDetails:userDetails,
            userId:user2._id
        }
        const token = jwt.sign({ user:userwithId }, process.env.SECRET_KEY,{ expiresIn: '1h' });

        // Await the save operation to ensure the data is saved before sending the response
        res.userexist=0;
        res.status(200).json({ message: "Success, user registered" ,token, userId: newuser._id});

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({message: "Server error", error: err.message });
    }
});



export default Registration_api;