import React,{useEffect} from 'react'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

function getUserIdFromToken() {
  const token = localStorage.getItem("userToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    // console.log("Decoded Token:", decoded);
    return decoded.user;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}



const Order_item=({fetchOrders,items_info})=> {


  const { itemname, itemcategory, itemdescription, itemprice ,itemotp} = items_info;
  
  
  const handle_cancel = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/orders/cancel', {
        params: {
          order_id: items_info._id
        }
      });
      // console.log('response:cancel', response.data);
      fetchOrders();
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };
const User=getUserIdFromToken().userDetails;

  const handle_otpsend = async () => {
    console.log('otp:', itemotp);
    try{
      const response=await axios.post('http://localhost:8000/orders/sendotp',{
        itemotp,User
      });
      if(response.status==200){
        console.log('otp sent to email',User);
      }
    }
    catch(error){
      console.error('Error cancelling order:', error);
    }
  }


  // console.log('items_info:', items_info);
  return (
    <div className="bg-[#225f6a] p-5 rounded text-white flex-col">
      <h2 className="text-4xl text-center">{itemname}</h2>
      <p>Category: {itemcategory}</p>
      <p>{itemdescription}</p>
      {/* <p>OTP: {itemotp}</p> */}
      <p>Price: ${itemprice}</p>
      <div>
        <button className="bg-[#696ac8] text-[#90e0bb] font-bold rounded p-1 px-2 w-full my-2" onClick={handle_otpsend} >
          send otp
        </button>
        <button className="bg-[#696ac8] text-[#90e0bb] font-bold rounded p-1 px-2 w-full my-2" onClick={handle_cancel} >
          cancel order
        </button>
      </div>
    </div>
  )
}

export default Order_item
