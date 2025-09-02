import { React, useEffect } from 'react'
import Navbar from '../Home/Navbar'
import axios from 'axios'
import { useState } from 'react'
// import { useAppContext } from "../../MyContext";
import { useLocation } from 'react-router-dom';
import Delivary_item from './Delivary_item';
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



const Delivary = () => {
    const location = useLocation();
    // const { info } = useAppContext();
    const info=getUserIdFromToken();
    const userId = info.userId;
    const [delivaryitems, setdelivaryitems] = useState([]);
    const fetchdelivaryitems = async () => {
        try {
            const response = await axios.get('http://localhost:8000/orders/delivary', {
                params: {
                    user_id: userId
                }
            });
            // console.log('response:orderpage', response.data);
            setdelivaryitems(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {
        fetchdelivaryitems();
    }, [location]);

    return (
        <div className='bg-[#90e0bb] h-screen'>
            <Navbar />
            <h1 className='flex justify-center items-center py-3 font-semibold text-5xl bg-[#90e0bb]'>Delivery</h1>
            <div className="bg-[#90e0bb] w-full h-screen flex flex-col items-center">
                <div className="flex flex-wrap gap-4 justify-center items-center">
                   {delivaryitems.map((order, index) => (
                        <Delivary_item key={index} fetchdelivaryitems={fetchdelivaryitems} item_info={order} />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Delivary
