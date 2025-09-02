
import express from 'express';
import Data from '../database/userdata.js';
// import Registration from '../../frontend/src/pages/Registration/Registration.jsx';
import jwt from 'jsonwebtoken';


const profile_api = express();
profile_api.post('/updateUser', async (req, res) => {
    try {
        // console.log("update route hit");
        // console.log(req.body);
        const { userId, userDetails} = req.body.updatedUser;
        const { firstname, lastname, contact_number, Email } = userDetails;
        console.log(userDetails);
        const updatedUser = await Data.findByIdAndUpdate(userId, {
            firstname,
            lastname,
            contact_number,
            Email
        }, { new: true });
        // const prevuser = await Data.findOne({ Email: prevEmail });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // const updatednew= {};
        const userDetailsnew={
            firstname:updatedUser.firstname,
            lastname:updatedUser.lastname,
            Email:updatedUser.Email,
            contact_number:updatedUser.contact_number,
            age:updatedUser.age
        };
        const userwithId={
            userDetails:userDetailsnew,
            userId:updatedUser._id 
        }
        console.log("User details updated successfully:", updatedUser);
        const token = jwt.sign({ user:userwithId}, process.env.SECRET_KEY);
        // console.log("token",token);
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }

});

profile_api.get('/:userId', async (req, res) => {
    console.log(req.params.userId);
    try {
        const user = await Data.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});

profile_api.post('/:userId', async (req, res) => {
    const secretkey = process.env.SECRET_KEY;
    const user = await Data.findById(req.params.userId);
    const access_token=jwt.sign({ user ,secretkey}, secretkey);
    res.status(200).json({ access_token:access_token });
});




const Authentication=(req,res,next)=>{
    const authheader=req.header('Authorization');
    const token=authheader && authheader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Access denied"});
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({message:"Token is not valid"});
        }
        req.user=user;
        next();
    });
};

export default profile_api;