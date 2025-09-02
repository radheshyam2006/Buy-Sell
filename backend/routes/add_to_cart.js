import express from 'express';
import crypto from 'crypto';
import cart_items from '../database/cart_items.js';

const add_to_cart = express.Router();

add_to_cart.post('/', async (req, res) => {
    try {
        const { item_info, user_id } = req.body;
        let { itemname, itemprice, itemcategory, itemdescription, seller_id } = item_info;
        console.log("Item info:", item_info);
        console.log("User ID:", user_id);

        // Generate a secure 6-digit OTP using crypto module
        let itemotp = crypto.randomInt(100000, 1000000);

        const status = 0; // 0 means item is in cart
        const newitem = new cart_items({
            itemname,
            itemprice,
            itemcategory,
            itemdescription,
            seller_id,
            buyer_id: user_id,
            status: status,
            itemotp: itemotp
        });


        console.log("p");
        // console.log("New item:", newitem);
        await newitem.save();
        res.status(200).json({ message: "Success, Item added to cart" });
    } catch (err) {
        console.error("Error during adding item to cart:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default add_to_cart;
