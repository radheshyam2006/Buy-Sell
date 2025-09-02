import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { Menu, X } from "lucide-react";

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

function Navbar() {
  const navigate = useNavigate();
  const info = getUserIdFromToken();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const profile_handle = () => {
    if (info) {
      navigate(`/profile/${info.userId}`);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  const handle_search = () => {
    navigate("/home/items", { state: { search: search, category: category } });
  };

  return (
    <nav className="bg-[#90e0bb] py-3 px-5 flex">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <button onClick={profile_handle} className="text-gray-900 font-semibold underline underline-offset-4">
          {info?.userDetails?.lastname}
        </button>
        <Link to="/home" className="hidden md:inline text-gray-900 font-semibold underline underline-offset-4">
          Home
        </Link>
        <Link to="/cart" className="hidden md:inline text-gray-700 font-semibold underline underline-offset-4">
          Cart
        </Link>
      </div>

      {/* Search Section (Visible on Mobile & Desktop) */}
      <div className="flex flex-grow items-center justify-center space-x-2 flex-shrink">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search items..."
          className="bg-gray-200 h-10 px-2 rounded w-full max-w-sm"
        />
        <button onClick={handle_search} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {/* Right Section (Hidden on Mobile) */}
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/orders" className="text-gray-700 font-semibold underline underline-offset-4">Orders</Link>
        <Link to="/delivary" className="text-gray-700 font-semibold underline underline-offset-4">Delivery</Link>
        <Link to="/history" className="text-gray-700 font-semibold underline underline-offset-4">History</Link>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown (Includes Search) */}
      <div className={`absolute top-14 left-0 w-full bg-white shadow-md transition-all duration-300 ${isOpen ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"}`}>
        <div className="flex flex-col items-center space-y-4 py-4">

          <Link to="/home" className="text-gray-700 font-semibold" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/cart" className="text-gray-700 font-semibold" onClick={() => setIsOpen(false)}>Cart</Link>
          <Link to="/orders" className="text-gray-700 font-semibold" onClick={() => setIsOpen(false)}>Orders</Link>
          <Link to="/delivary" className="text-gray-700 font-semibold" onClick={() => setIsOpen(false)}>Delivery</Link>
          <Link to="/history" className="text-gray-700 font-semibold" onClick={() => setIsOpen(false)}>History</Link>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded w-full">
            Logout
          </button>
        </div>
      </div>

      <Toaster />
    </nav>
  );
}

export default Navbar;
