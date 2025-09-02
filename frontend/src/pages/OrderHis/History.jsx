import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import History_item from "./History_item";

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

function History() {
  const user = getUserIdFromToken();
  const userId = user ? user.userId : null;
  // console.log("Printing userId in History:", userId);

  const location = useLocation();
  const [his, sethis] = useState([]);

  const fetchHistory = async () => {
    if (!userId) {
      console.error("User ID not found, skipping API call.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/history/find_history", {
        params: { user_id: userId },
      });
      console.log("response data:", response.data);
      sethis(response.data);
      console.log("response: order page at history", response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [location]);

  return (
    <div className="bg-[#90e0bb] h-screen">
      <Navbar />
      <h1 className='flex justify-center items-center py-3 font-semibold text-5xl bg-[#90e0bb]'>Order History</h1>
        {/* <h1 className="text-4xl">Order History</h1> */}
      <div className="flex  items-center justify-center">
        {his.map((order, index) => (
          <History_item key={index} item={order} />
        ))}
      </div>
    </div>
  );
}

export default History;
