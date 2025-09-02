
import mongoose from 'mongoose';

const cart_item = new mongoose.Schema({
    itemname: { type: String, required: true },
    itemprice: { type: Number, required: true },
    itemcategory: { type: String, required: true },
    itemdescription: { type: String, required: true },
    seller_id: { type: String, required: true }, // Ensure this is defined
    buyer_id: { type: String, required: true }, // Ensure this is defined
    status: { type: Number, required: true }, // Ensure this is defined
    itemotp: { type: Number, required: true }, // Ensure this is defined
});

// Create the model from the schema
const cart_items = mongoose.model('cart_items', cart_item);

export default cart_items;
