// src/components/Profile.jsx
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Home/Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function getUserIdFromToken() {
  const token = localStorage.getItem("userToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.user;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

function F({ first, second }) {
  return (
    <div>
      <p className="font-semibold mb-1">{first}:</p>
      <p className="px-2 py-1 mb-2 border-2 rounded w-full">{second}</p>
    </div>
  );
}

function Profile() {
  const [user, setUser] = useState(null);
  let info = getUserIdFromToken();
  const isFirstRender = useRef(true);

  useEffect(() => {
    setUser(prevUser => {
      if (JSON.stringify(prevUser) !== JSON.stringify(info)) {
        console.log("info at profile:", info);
        return info;
      }
      return prevUser;
    });
  }, [info]);

  const handleEdit = () => {
    // const updatedUser = { ...user, userDetails: { ...user.userDetails } };
    const updatedUser = user;
    const fieldsToEdit = ["firstname", "lastname", "contact_number", "Email"];
    // console.log(updatedUser);
    fieldsToEdit.forEach((field) => {
      const newValue = prompt(`Enter new ${field}:`, user.userDetails[field]);
      if (newValue !== null && newValue.trim() !== "") {
        updatedUser.userDetails[field] = newValue.trim();
        console.log(`Updated ${field}:`, updatedUser.userDetails[field]);
      }
    });
    updateUserDetails(updatedUser);
    
    // setUser(updatedUser);
  };

  const updateUserDetails = async (updatedUser) => {
    try {
      // console.log("updation will");
      const response = await axios.post('http://localhost:8000/profile/updateUser',{updatedUser});

      console.log("Response from backend:", response.data);
      const token = await response.data;

      localStorage.setItem("userToken", token);
      console.log("User details updated successfully:",token);
      info = getUserIdFromToken();
      console.log("info at profile after update:", info);
      setUser(info);
    } catch (error) {
      console.error("Error updating user details:1", error);
    }
  };


  if (!user) return <div className="text-center mt-10">User not found...</div>;

  return (
    <div className="bg-[#90e0bb] w-full h-screen">
      <Navbar />
      <p className="text-4xl font-bold my-3 text-center">Your Account</p>
      <div className="flex justify-center items-center">
        <div className="bg-gray-200 grid py-10 px-20 rounded w-fit">
          <F first="First name" second={user.userDetails.firstname} />
          <F first="Last name" second={user.userDetails.lastname} />
          <F first="Contact Number" second={user.userDetails.contact_number} />
          <F first="Email address" second={user.userDetails.Email} />
          <button
            className="bg-[#696ac8] text-white px-2 py-1 mb-2 rounded w-full"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
