import React from 'react'
import axios from 'axios';
// import { useAppContext } from '../../MyContext';
import { Toaster, toast } from "react-hot-toast";
import { useState } from 'react';

const Delivary_items = ({fetchdelivaryitems,item_info}) => {
      const notifye = (message) => toast.error(message);
      const notifys = (message) => toast.success(message);
    // const { info } = useAppContext();
    // console.log("item_info_incart_item:",item_info);
    const [otp, setOtp] = useState(0);
    const { itemname, itemcategory, itemdescription, itemprice } = item_info;
    const id = item_info._id;
    const handle_cancel = () => {
        // console.log("item...id:",item_info._id)
        const response=axios.delete('http://localhost:8000/orders/cancel',
          {
            params:{
              order_id:id
            }
          }
        );
        fetchdelivaryitems();
    }
    // const id = item_info._id;
    const handle_confirm = () => {
        console.log("confirm");
        const response = axios.get('http://localhost:8000/orders/delivary_confirm', {
            params: {
                item_id: id,
                otp: otp
            }
        });
        console.log("response:",response);
        if(response.status==200){
            notifys("Item delivary confirmed");
        }
        else{
            notifye("Please enter correct otp");
        }
        fetchdelivaryitems();
    }

  return (
    <>
    <div className="bg-[#225f6a] p-5 rounded text-white flex-col">
      <h2 className="text-4xl text-center">{itemname}</h2>
      <p>Category: {itemcategory}</p>
      <p>{itemdescription}</p>
      <p>Price: ${itemprice}</p>
      {/* < className='flex flex-row'> */}

      <input type="Number" placeholder="Enter otp" value={otp} onChange={(e)=>setOtp(e.target.value)} className="bg-[#696ac8] text-[#90e0bb] rounded p-1 px-2 w-full my-1 mx-1" />
        <button className="bg-[#696ac8] text-[#90e0bb] font-bold rounded p-1 px-2 w-full my-2" onClick={handle_confirm}>
          Confirm
        </button>
        
      <div>
        <button className="bg-[#696ac8] text-[#90e0bb] font-bold rounded p-1 px-2 w-full my-2" onClick={handle_cancel} >
          cancel
        </button>
      </div>
    </div>
    <Toaster />
    </>
  )
}

export default Delivary_items
