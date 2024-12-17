import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaChartLine, FaClipboardList, FaClock, FaCog, FaComment, FaTachometerAlt, FaTasks, FaUser, FaUserTie, FaUsers, FaWallet } from "react-icons/fa";
// import { Navbar } from "./Navbar";
import logo from "../../assets/Login/NavbarLogo.png";
import { useSelector } from "react-redux";

const generateMenu = (menubarData) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const locate = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="relative">
      <Link
        to={menubarData.path}
        className={`flex items-center gap-4 px-4 py-2 text-lg font-semibold rounded-md transition-all duration-200 ${
          isActive(menubarData.path) ? "text-orange-600 bg-white" : ""
        }`}
        onClick={(e) => {
          if (menubarData.nestedMenu) {
            e.preventDefault();
            toggleDropdown();
          }
        }}
      >
        <menubarData.icon size={24} />
        {menubarData.label}
      </Link>

      {menubarData.nestedMenu && isDropdownOpen && (
        <div className="absolute left-0 mt-2 bg-white border rounded shadow-lg">
          {menubarData.nestedMenu.map((nestedMenuData, index) => (
            <div key={index} className="py-1">
              {generateMenu(nestedMenuData)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CommonSideBar = () => {
  const permissions = useSelector((state)=>state.Permissions);

  const sidebarMenus = [
    {
      key: "dashboard",
      icon: FaTachometerAlt,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      key: "config",
      icon: FaCog,
      label: "Config",
      path: "/config",
    },
    {
      key: "company",
      icon: FaUsers,
      label: "Company",
      path: "/add-company",
    },

    
    {
      key: "role",
      icon: FaUserTie,
      label: "Roll",
      path: "/add-role",
    },

    {
      key: "designation",
      icon: FaTasks,
      label: "Designation",
      path: "/add-designation",
    },

    {
      key: "staffs",
      icon: FaUsers,
      label: "Staffs",
      path: "/staffs",
    },

    {
      key: "batch",
      icon: FaClipboardList,
      label: "Batches",
      path: "/batches",
    },
   
      
      
     
   
    {
      key: "trainee",
      icon: FaUserTie,
      label: "Trainee",
      path: "/trainee",
    },
    {
      key: "attendance",
      icon: FaClock,
      label: "Attendance",
      path: "/attendance",
    },
    {
      key: "leave",
      icon: FaCalendarAlt,
      label: "Leave Request",
      path: "/leave",
    },
    {
      key: "schedule",
      icon: FaCalendarAlt,
      label: "Schedule",
      path: "/schedule",
    },
    {
      key: "assessment",
      icon: FaBook,
      label: "Assessment",
      path: "/assessment",
    },
    {
      key: "task",
      icon: FaTasks,
      label: "Task",
      path: "/task",
    },
 
    {
      key: "eod",
      icon: FaClipboardList,
      label: "EOD",
      path: "/eod",
    },
  
    {
      key: "payroll",
      icon: FaWallet,
      label: "Payroll",
      path: "/payroll",
    },

    {
      key: "monthlyPayroll",
      icon: FaWallet,
      label: "MonthlyPayroll",
      path: "/monthly-payroll",
    },
  
    {
      key: "syllabus",
      icon: FaBook,
      label: "Syllabus",
      path: "/syllabus",
    },
   
   
  

    
    {
      key: "chat",
      icon: FaComment,
      label: "Chat",
      path: "/chat",
    },
    {
      key: "report",
      icon: FaChartLine,
      label: "Report",
      path: "/report",
    },
  ];

  const isThisMenuAllowed = (key) => {
    const allowedMenus = Object.keys(permissions);
    return allowedMenus.includes(key);
  };
  const allowedSidebarMenus = sidebarMenus.filter((menubarData) =>
    isThisMenuAllowed(menubarData.key)
  );
  return (
    <div className="flex w-full h-screen">
      <div
        className="scroll-bar w-full bg-orange-500 text-white p-4 shadow-lg h-full overflow-y-auto"
      >
        <div className="flex flex-col items-center w-full">
          <img src={logo} alt="" className="w-16" />
          <h2 className="text-xl font-semibold mb-8 text-center">
            Why Global Services
          </h2>
        </div>
        <div className="w-full">
    {allowedSidebarMenus.map((sidebarMenuData) => (
      <div key={sidebarMenuData.id} className="mb-3">
        {generateMenu(sidebarMenuData)}
      </div>
    ))}
  </div>
    </div>
    </div>
  );
};

export default CommonSideBar;
