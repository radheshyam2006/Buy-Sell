import express from 'express';
import cart_items from '../database/cart_items.js';

const cart_actions = express();

// Remove an item from the cart

cart_actions.get('/remove_from_cart', async (req, res) => {
    const { item_id } = req.query;
    console.log("item_id:", item_id);
    try {
        await cart_items.deleteOne({ _id: item_id });
        res.status(200).json({ message: "Item removed from cart" });
    }
    catch (error) {
        console.error("Error removing item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

cart_actions.get('/buy_now', async (req, res) => {
    const { item_id } = req.query;
    console.log("item_id:", item_id);
    const cart_item=await cart_items.findOne({_id:item_id});
    if(cart_item){
        try{
        await cart_items.updateOne({_id:item_id},{$set:{status:1}});
        console.log("Item purchased");
        res.status(200).json({message:"Item purchased"});
        }
        catch(error){
            console.error("Error purchasing item:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    else{
        console.log("Item not found");
    }
});


export default cart_actions;