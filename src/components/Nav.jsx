// nav.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <span className="text-lg font-bold">MyApp</span>

        <Link
          to="/app"
          className="bg-gray-800 hover:bg-gray-700 border border-white rounded px-4 py-1 text-sm transition-colors"
        >
          Route
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
