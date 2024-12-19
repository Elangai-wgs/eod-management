import React, { useState } from "react";
import { logout } from "../../services";

const Navbar = () => {
const[isDropdownOpen,setIsDropdownOpen] = useState(false);


const handleToggleDropdown = ()=>{
  setIsDropdownOpen(!isDropdownOpen)
};


const handleLogout = async () => {
  try {
    const response = await logout(); // Call your logout service
    console.log("Logout response:", response.data);

    // Clear user data and redirect to login page
    localStorage.clear();
    window.location.href = "/";

    // Close the dropdown
    setIsDropdownOpen(false);
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

  return (
    <div className="bg-white shadow-md p-3 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-orange-600">dashboard</h2>

      <div className="flex items-center gap-4">
        <span className="font-semibold text-xl text-orange-600">gopi</span>
        <div className="relative dropdown-container">
        <img
            className="w-12 h-12 rounded-full bg-gray-100 cursor-pointer"
            onClick={handleToggleDropdown}
            src="https://via.placeholder.com/150" // Replace with user profile image URL
            alt="User Profile"
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-48">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout  
              </button>
            </div>
          )}
       
        </div>
      </div>
    </div>
  );
};

export default Navbar;
