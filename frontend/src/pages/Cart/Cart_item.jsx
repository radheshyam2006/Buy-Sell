import React from 'react'
import axios from 'axios';
// import { useAppContext } from '../../MyContext';


const Cart_item = ({fetchitems,item_info}) => {
  //  const { info } = useAppContext();
  // console.log("item_info_incart_item:",item_info);
  const { itemname, itemcategory, itemdescription, itemprice } = item_info;
  const handle_remove = () => {
    // console.log("item...id:",item_info._id)
    const id = item_info._id;
    // console.log("remove from cart");
    const response =axios.get('http://localhost:8000/cart_actions/remove_from_cart', {
      params: {
        item_id: id
      }
    })
    fetchitems();
  }
  const handle_buy = () => {
    console.log("buy now");
    const id = item_info._id;
    const response = axios.get('http://localhost:8000/cart_actions/buy_now', {
      params: {
        item_id: id
      }
    });
    fetchitems();
  }


  return (
    <div className="bg-[#225f6a] p-5 rounded text-white flex-col">
      <h2 className="text-4xl text-white text-center">{itemname}</h2>
      <p>Category: {itemcategory}</p>
      <p>{itemdescription}</p>
      <p>Price: ${itemprice}</p>
      <div>
        <button className="bg-[#696ac8] text-[#90e0bb] font-bold rounded p-1 px-2 w-full my-2" onClick={handle_buy} >
          buy now
        </button>
        <button className="bg-[#696ac8] text-[#90e0bb] font-bold rounded p-1 px-2 w-full my-2" onClick={handle_remove}>
          remove from cart
        </button>
      </div>
    </div>
  )
}

export default Cart_item
