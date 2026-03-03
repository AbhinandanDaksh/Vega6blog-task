
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profileImage');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center bg-gray-100 p-4 shadow">
      <div className="flex space-x-4">
        {token ? (
          <>
            <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
            <Link to="/blogs" className="text-blue-600 hover:underline">Blogs</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </>
        )}
      </div>

      {token && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
