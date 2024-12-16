import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaClipboardList, FaBook, FaUserShield, FaChalkboardTeacher, FaUserGraduate, FaUsers, FaChevronDown, FaBell, FaComment, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';
import { SlCalender } from "react-icons/sl";
import { MdAssignment } from 'react-icons/md';
import { GiNotebook } from 'react-icons/gi';
import logo from '../../assets/Login/NavbarLogo.png'
import { logout } from '../../services';

const Navbar = () => {


  const location = useLocation();
  const [dropdown, setDropdown] = useState(false);
  const pageNames = {
    '/traineesidebar/dashboard': 'Dashboard',
   
  };

  const currentPageName = pageNames[location.pathname] || 'Page';
  const user = {
    name: 'Trainee', 
    profileImage: 'https://via.placeholder.com/150', 
  };

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  
  const handleLogout = async () => {
    console.log("out");
    try {
      const res = await logout();
      console.log(res);
  
      
      localStorage.removeItem("token");
      window.location.href = "/"; 
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
    
    setDropdown(false); 
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  

  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-orange-600">{currentPageName}</h2>

      <div className="flex items-center gap-4">
        <span className="font-semibold text-orange-600">{user.name}</span>
<div className='relative dropdown-container'>
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-8 h-8 rounded-full"
          onClick={toggleDropdown}
          />
          {dropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md">
        
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-orange-600 "
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

const TraineeSidebar = () => {
  const [isStaffDropdownOpen, setIsStaffDropdownOpen] = useState(false);

  const toggleStaffDropdown = () => {
    setIsStaffDropdownOpen(!isStaffDropdownOpen);
  };

  return (
    <div className="flex h-screen">
      <div className=" [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300 fixed top-0 bg-orange-500 text-white p-4 shadow-lg h-full overflow-y-auto">
    <div className='flex flex-col items-center'>
    <img src={logo} alt="" className='w-16  ' />
        <h2 className="text-2xl font-semibold mb-8 text-center">Why Global Services</h2>
        </div>
        <div className="space-y-4">
          <Link 
            to="/traineesidebar/dashboard" 
            className="flex items-center gap-4 px-4 text-lg font-semibold py-2 rounded-md text-white hover:bg-white hover:text-orange-600 transition-all duration-200">
            <FaTachometerAlt size={24} />
            Dashboard
          </Link>
          
          <Link 
            to="/traineesidebar/syllabus" 
            className="flex items-center gap-4 px-4 text-lg font-semibold py-2 rounded-md text-white hover:bg-white hover:text-orange-600 transition-all duration-200">
            <FaClipboardList size={24}/>
            Syllabus
          </Link>
       
          
         
          
        
          <Link 
            to="/traineesidebar/assessment" 
            className="flex items-center gap-4 px-4 text-lg font-semibold py-2 rounded-md text-white hover:bg-white hover:text-orange-600 transition-all duration-200">
            <FaUserGraduate size={24}/>
            Assessment
          </Link>
          <Link 
            to="/traineesidebar/traineeEod" 
            className="flex items-center gap-4 px-4 text-lg font-semibold py-2 rounded-md text-white hover:bg-white hover:text-orange-600 transition-all duration-200">
            <GiNotebook size={24}/>
            Eod
          </Link>
          {/* <Link 
            to="/traineesidebar/attendance" 
            className="flex items-center gap-4 px-4 text-lg font-semibold py-2 rounded-md text-white hover:bg-white hover:text-orange-600 transition-all duration-200">
            <SlCalender />
            Attendance
          </Link> */}
          <Link 
            to="/traineesidebar/task" 
            className="flex items-center gap-4 px-4 text-lg font-semibold py-2 rounded-md text-white hover:bg-white hover:text-orange-600 transition-all duration-200">
            <MdAssignment size={24}/>
            Task
          </Link>
          
          <Link 
            to="/traineesidebar/notifications" 
            className="flex items-center gap-4 px-4 text-lg font-semibold py-2 rounded-md text-white hover:bg-white hover:text-orange-600 transition-all duration-200">
            <FaBell size={24}/>
            Notifications
          </Link>
          {/* <Link 
            to="/sidebar/chat" 
            className="flex items-center gap-4 px-4 text-lg font-semibold py-2 rounded-md text-white hover:bg-white hover:text-orange-600 transition-all duration-200">
            <FaComment />
            Chat
          </Link> */}
        
          <Link 
            to="/traineesidebar/reports" 
            className="flex items-center gap-4 px-4 text-lg font-semibold py-2 rounded-md text-white hover:bg-white hover:text-orange-600 transition-all duration-200">
            <FaFileAlt size={24}/>
            Reports
          </Link>
        </div>
      </div>

      <div className="flex-1 h-screen ml-64 py-1  ">
        <Navbar />
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TraineeSidebar;
