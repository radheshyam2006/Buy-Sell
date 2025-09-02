import React from 'react';
import axios from 'axios';
// import { useAppContext } from "../../MyContext";
import { jwtDecode } from "jwt-decode";
function getUserIdFromToken() {
  const token = localStorage.getItem("userToken"); // Retrieve token from storage
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.user; // Adjust based on your token structure
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}


const ItemLayout = ({ item_info}) => {

// const { info } = useAppContext();
const info = getUserIdFromToken();
    if (!item_info) return null; 
    const userId = info.userId; 

    const { itemname, itemcategory, itemdescription, itemprice } = item_info;
    
    const handle_add_to_cart = async () => {
        console.log(`Adding ${itemname} to cart...`);

        try {
            console.log('userId:', userId);
            const response = await axios.post('http://localhost:8000/add_to_cart', {
                item_info: item_info,
                user_id: userId
            });

            if (response.status === 200) {
                console.log('Item added successfully:', response.data);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div className="bg-[#225f6a] p-4 rounded text-white flex-col">
            <h2 className="text-4xl text-center">{itemname}</h2>
            <p>Category: {itemcategory}</p>
            <p>{itemdescription}</p>
            <p>Price: ${itemprice}</p>
            <div>
                <button className="bg-[#696ac8] text-[#90e0bb] font-bold rounded p-1 px-2 w-full my-2" onClick={handle_add_to_cart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ItemLayout;
