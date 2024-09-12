import { useState, useEffect } from 'react';
import { HomeIcon } from "@heroicons/react/24/solid";
import {  ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [user, setUser] = useState(null);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if(userData){
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData)
    }
    //console.log(parsedUserData.token)
  }, [])

  
  const handleLogout = async () => {
    try{
     const response =  await axios.post('http://localhost:5000/api/users/logout')
     localStorage.removeItem("token");
     localStorage.removeItem("user");
      navigate('/');
      console.log(response.data.message)
      delete axios.defaults.headers.common['Authorization'];
    }catch(error){
      console.log(`login Error: ${error}`)
      console.log(error.response?.data?.message || 'An error occurred')
    }
   
  };

  return (
    <header className="fixed top-0 left-0 right-0 text-center shadow-lg bg-red-600 border-b text-white p-4 pb-5 flex items-center justify-between z-50">
      <button onClick={toggleSidebar} className="focus:outline-none md:hidden">
        <HomeIcon className="h-6 w-6" />
      </button>
      <h1 className="text-xl font-semibold">Personal Expense Tracker</h1>
      <div className="relative">
        <button onClick={handleDropdownToggle} className="flex items-center focus:outline-none">
          <img
            src="avatar.jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <ChevronDownIcon className="h-5 w-5 ml-2" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">{user.name}</a>
            <a href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">{user.email}</a>
            <a onClick={handleLogout} className="block px-4 py-2 text-red-600 hover:bg-gray-100">
            <span>Logout</span></a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
