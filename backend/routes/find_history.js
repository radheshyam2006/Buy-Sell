import express from 'express';
import cart_items from '../database/cart_items.js';


const find_history = express();

find_history.get('/find_history', async (req, res) => {
    const { user_id } = req.query;
    console.log("user_id: at backend his", user_id);
    try {
        const orders = await cart_items.find({ buyer_id: user_id, status: 2 });
        console.log("Orders found:", orders);
        res.status(200).json(orders);
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default find_history;