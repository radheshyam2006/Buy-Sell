import React from 'react'
// import axios from 'axios';


const History_item=({item})=> {
  if (!item) {
    console.error("History_item received undefined items_info");
    return <p>Error: Item info is missing</p>;
  }
  console.log("intem info at history element",item);
  // const { itemname, itemprice, itemcategory, itemdescription } = item_info;
  const { itemname, itemcategory, itemdescription, itemprice } = item;
  // console.log('items_info: at his item', items_info);
  return (
    <div className="bg-[#225f6a] p-4 rounded text-white flex-col m-3">
            <h2 className="text-4xl text-center">{itemname}</h2>
            <p>Category: {itemcategory}</p>
            <p>{itemdescription}</p>
            <p>Price: ${itemprice}</p>
        </div>
  )
}

export default History_item
