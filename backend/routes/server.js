import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Registration_api from './routes/Registration.js';
import profile_api from './routes/profile.js';
import login_api from './routes/login.js';
import jwt from 'jsonwebtoken';
import add_item from './routes/add_item.js';
import find_items from './routes/find_items.js';
import add_to_cart from './routes/add_to_cart.js';
import get_cart from './routes/get_cart.js';
import cart_actions from './routes/cart_actions.js';
import find_orders from './routes/find_orders.js';
import find_history from './routes/find_history.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json()); // For parsing JSON requests
app.use(express.urlencoded({ extended: false }));

mongoose.connect(mongoURI, {
   
})
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB", err));


app.use('/Registration', Registration_api);


app.use('/profile', profile_api);

app.use('/login', login_api);

app.use('/add_item', add_item);


app.use('/Home/items',find_items);

app.use('/add_to_cart',add_to_cart);

app.use('/cart',get_cart);

app.use('/cart_actions',cart_actions);

app.use('/orders',find_orders);

app.use('/history',find_history);


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});


