import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom'
const MultiLevelSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed top-16 left-0 h-full shadow-2xl border-r bg-black text-white transition-all duration-300 z-40 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className={`text-2xl font-bold transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}>Dashbord</h2>
        <button onClick={toggleSidebar} className="focus:outline-none text-white">
          {isOpen ? (
            <ChevronLeftIcon className="h-6 w-6" />
          ) : (
            <ChevronRightIcon className="h-6 w-6 left-0 text-black" />
          )}
        </button>
      </div>
      <nav className="flex flex-col space-y-2 p-4">

   
      <Link to= '/home'>
        <a href="" className="flex items-center space-x-2 hover:bg-black  p-2 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
            </svg>
          {isOpen && <span>Analytics Dashboard</span>}
        </a>
        </Link>

        <Link to= '/registerAssets'>
        <a href="" className="flex items-center space-x-2 hover:bg-black p-2 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
          {isOpen && <span>Register Expenses</span>}
        </a>
        </Link>

        <Link to= '/show'>
        <a href="" className="flex items-center space-x-2 hover:bg-black p-2 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>

          {isOpen && <span>Manage Expenses</span>}
        </a>
        </Link>

        <Link to= '/DailyPlanner'>
        <a href="" className="flex items-center space-x-2 hover:bg-black p-2 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 2.25v3m7.5-3v3M3 9.75h18M4.5 5.25h15a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 18.75V7.5A2.25 2.25 0 014.5 5.25z"/>
      </svg>

          {isOpen && <span>Daily Planner</span>}
        </a>
        </Link>



      </nav>
    </aside>
  );
};

export default MultiLevelSidebar;