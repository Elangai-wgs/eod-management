import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md p-3 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-orange-600">dashboard</h2>

      <div className="flex items-center gap-4">
        <span className="font-semibold text-xl text-orange-600">gopi</span>
        <div className="relative dropdown-container">
          <img
            className="w-12 h-12 rounded-full bg-gray-100"
          />
       
        </div>
      </div>
    </div>
  );
};

export default Navbar;
