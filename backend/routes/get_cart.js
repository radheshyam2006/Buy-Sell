import express from 'express';
import cart_items from '../database/cart_items.js';

const get_cart = express();

// Search for items by category and name
get_cart.get('/', async (req, res) => {
    const { user_id } = req.query;
    const buyerid = user_id;
    // console.log("body",req.query);
    console.log("Buyer ID:", buyerid);
    try {
        const items = await cart_items.find({ buyer_id: buyerid,status:0 });
        // console.log("Items found:", items);
        res.status(200).json(items);
    }
    catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default get_cart;