import React, { useEffect } from 'react'
import Navbar from '../Home/Navbar'
// import { useAppContext } from "../../MyContext";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Order_item from './Order_item';
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



function Orders() {
  const location = useLocation();
  // const { info } = useAppContext();
  const info = getUserIdFromToken();
  const userId = info.userId;
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/orders/find', {
        params: {
          user_id: userId
        }
      });
      // console.log('response:orderpage', response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [location]);


  return (
    <>
    <Navbar />
    <h1 className='flex justify-center items-center py-3 font-semibold text-5xl bg-[#90e0bb]'>Orders</h1>
    <div className="bg-[#90e0bb] w-full h-screen flex flex-col items-center">
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {orders.map((order, index) => (
          <Order_item key={index} fetchOrders={fetchOrders} items_info={order} />
        ))}
      </div>
    </div>
  </>
  )
}

export default Orders