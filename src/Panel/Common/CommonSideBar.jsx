import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";
import { Navbar } from "../../components/navbar";

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
  const permissions = { dashboard: [], admin: [] };

  const sidebarMenus = [
    {
      key: "dashboard",
      icon: FaTachometerAlt,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      key: "batch",
      icon: FaTachometerAlt,
      label: "Batch",
      path: "/batch",
    },
    {
      key: "basic-details",
      icon: FaTachometerAlt,
      label: "Basic Details",
      path: "/basic-details",
      nestedMenu: [
        {
          key: "roll",
          icon: FaTachometerAlt,
          label: "Add Roll",
          path: "/add-roll",
        },
        {
          key: "company",
          icon: FaTachometerAlt,
          label: "Add Company",
          path: "/add-company",
        },
        {
          key: "designation",
          icon: FaTachometerAlt,
          label: "Add Designation",
          path: "/add-designation",
        },
      ],
    },
    {
      key: "staffs",
      icon: FaTachometerAlt,
      label: "Staffs",
      path: "/staffs",
    },
    {
      key: "trainee",
      icon: FaTachometerAlt,
      label: "Trainee",
      path: "/trainee",
    },
    {
      key: "attendance",
      icon: FaTachometerAlt,
      label: "Attendance",
      path: "/attendance",
    },
    {
      key: "task",
      icon: FaTachometerAlt,
      label: "Task",
      path: "/task",
    },
    {
      key: "assessment",
      icon: FaTachometerAlt,
      label: "Assessment",
      path: "/assessment",
    },
    {
      key: "eod",
      icon: FaTachometerAlt,
      label: "EOD",
      path: "/eod",
    },
    {
      key: "syllabus",
      icon: FaTachometerAlt,
      label: "Syllabus",
      path: "/syllabus",
    },
    {
      key: "leave",
      icon: FaTachometerAlt,
      label: "Leave Request",
      path: "/leave",
    },
    {
      key: "config",
      icon: FaTachometerAlt,
      label: "Config",
      path: "/config",
    },
    {
      key: "payroll",
      icon: FaTachometerAlt,
      label: "Payroll",
      path: "/payroll",
    },
    {
      key: "schedule",
      icon: FaTachometerAlt,
      label: "Schedule",
      path: "/schedule",
    },
    {
      key: "chat",
      icon: FaTachometerAlt,
      label: "Chat",
      path: "/chat",
    },
    {
      key: "report",
      icon: FaTachometerAlt,
      label: "Report",
      path: "/report",
    },
  ];

  const isThisMenuAllowed = (key) => {
    const allowedMenus = Object.keys(permissions);
    return allowedMenus.includes(key);
  };
  const allowedSidebarMenus = sidebarMenus.filter((menubarData)=>isThisMenuAllowed(menubarData.key))
  return (
    <div className="flex h-screen">
      <div
        className=" [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300 fixed top-0 bg-orange-500 text-white p-4 shadow-lg h-full overflow-y-auto"
      >
        <div className="flex flex-col items-center">
          <img src={logo} alt="" className="w-16  " />
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Why Global Services
          </h2>
        </div>
        {allowedSidebarMenus.map((sidebarMenuData)=>(generateMenu(sidebarMenuData)))}
        <div className="flex-1 h-screen ml-64 py-1  ">
                <Navbar />
                <div className="mt-4">
                  <Outlet />
                </div>
              </div>
      </div>
    </div>
  );
};

export default CommonSideBar;
