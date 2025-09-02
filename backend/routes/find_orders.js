import express from 'express';
import cart_items from '../database/cart_items.js';
import nodemailer from 'nodemailer';

const find_orders = express();

// const mailer = nodemailer();

const transporter = nodemailer.createTransport({
    service: "gmail", // Or use SMTP server
    auth: {
        user: "roshankalluri1@gmail.com", // Your email
        pass: "buhy mmko ckby utfl", // Your email app password
    },
});


find_orders.get('/find', async (req, res) => {
    const { user_id } = req.query;
    console.log("user_id:", user_id);
    try {
        const orders = await cart_items.find({ buyer_id: user_id, status: 1 });
        console.log("Orders found:", orders);
        res.status(200).json(orders);
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

find_orders.delete('/cancel', async (req, res) => {
    const { order_id } = req.query;
    console.log("order_id:", req.query);
    try {
        const order = await cart_items.deleteOne({ _id: order_id });
        console.log("Order cancelled:", order);
    }
    catch (error) {
        console.error("Error cancelling order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


find_orders.get('/delivary', async (req, res) => {
    const { user_id } = req.query;
    // console.log("user_id:", user_id);
    console.log("user_id:", user_id);
    try {
        const orders = await cart_items.find({ seller_id: user_id, status: 1 });
        console.log("Orders found:", orders);
        res.status(200).json(orders);
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

find_orders.get('/delivary_confirm', async (req, res) => {
    const { item_id, otp } = req.query;
    console.log("item_id:", item_id);
    const cart_item = await cart_items.findOne({ _id: item_id });
    if (cart_item) {
        console.log("cart_item:", cart_item.itemotp, "otp:", otp);
        try {
            if (cart_item.itemotp == otp) {
                await cart_items.updateOne({ _id: item_id }, { $set: { status: 2 } });
                console.log("item delivaried");
                res.status(200).json("delivered");
            }
            else {
                res.status(400).json({ message: "Invalid otp" });
            }
        }
        catch (error) {
            console.error("Error purchasing item:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    else {
        console.log("delivary not completed");
    }
});


find_orders.post('/sendotp', async (req, res) => {
    const { itemotp, User } = req.body;
    const { firstname, lastname, Email } = User;
    // console.log(firstname,lastname,Email);
    // console.log(itemotp,User,'itemotp at backend');
    try {
        const mailOptions = {
            from: "roshankalluri1@gmail.com",
            to: Email,
            subject: itemotp,
            text: `Hi ${firstname} ${lastname}.Your OTP is: ${itemotp}. It is valid for 5 minutes.`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json("otp sent");
    }
    catch (error) {
        console.error("Error purchasing item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


export default find_orders;