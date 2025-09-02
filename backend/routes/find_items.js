import express from 'express';
import Items from '../database/Itemsdata.js';

const find_items = express();

// Search for items by category and name
find_items.get('/', async (req, res) => {
    try {
        let { search, categories } = req.query; // Expect categories as an array

        console.log("Search:", search, "Categories:", categories);
        let query = {};
        let filtered = [];
        search=search.toLowerCase();
        if(search&&categories){
            query = { itemname:search, itemcategory:categories };
            filtered = await Items.find(query);
        }else if(search){
            query = { itemname:search};
            filtered = await Items.find(query);
        }
        else if(categories){
            query = { itemcategory:categories };
            filtered = await Items.find(query);
        }
        else{
            filtered = await Items.find();
        }
        const items=filtered;

        // console.log("Items found:", items);
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default find_items;
