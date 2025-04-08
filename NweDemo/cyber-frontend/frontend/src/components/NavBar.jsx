import { Link } from 'react-router-dom';
import { House, LogOut, CircleFadingPlus, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore.js';

const NavBar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="bg-gray-900 border-b border-gray-800 fixed w-full top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Section (Logo) */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition duration-300"
          >
            <div className="size-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <House className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="text-lg font-bold text-cyan-400 tracking-wide">
              Cyber Sheild
            </h1>
          </Link>
        </div>

        {/* Center Section (Create Complaint) */}
        {authUser && (
          <div className="flex-grow flex justify-center">
            <Link
              to="/file-complaint"
              className="flex items-center gap-2 bg-cyan-500 text-black font-semibold px-4 py-2 rounded-lg hover:bg-cyan-400 transition duration-300 shadow-md"
            >
              <CircleFadingPlus className="w-5 h-5" />
              <span className="hidden sm:inline">File Complaint</span>
            </Link>
          </div>
        )}

        {/* Right Section (Dashboard, Logout) */}
        <div className="flex items-center gap-6">
          {authUser && (
            <>
              {/* Dashboard Link */}
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-cyan-400 transition duration-300"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 transition duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;