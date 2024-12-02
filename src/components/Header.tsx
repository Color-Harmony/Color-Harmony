import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Palette, LogOut, Crown } from 'lucide-react';
import { useAuth, UserIcon } from '../contexts/AuthContext';
import chlogo from './chlogo.jpg';
export const Header: React.FC = () => {
  const { isLoggedIn, isGuest, userName, hasMembership, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
        <img src={chlogo} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-2xl font-bold gradient-text">Color Harmony</span>
        </Link>
        <nav className="flex items-center">
          <ul className="flex space-x-6 items-center">
            <li><Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Inicio</Link></li>
            <li><Link to="/harmonies" className="text-gray-600 hover:text-blue-600 transition-colors">Armonías</Link></li>
            <li><Link to="/palettes" className="text-gray-600 hover:text-blue-600 transition-colors">Paletas</Link></li>
            {!isLoggedIn && !isGuest && (
              <li><Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Iniciar Sesión</Link></li>
            )}
            {(isLoggedIn || isGuest) && (
              <li className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <UserIcon />
                  <span>{isLoggedIn ? userName : 'Invitado'}</span>
                  {hasMembership && <Crown className="h-4 w-4 text-yellow-500 ml-1" />}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                    {isLoggedIn && !hasMembership && (
                      <Link
                        to="/membership"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Crown className="h-4 w-4 mr-2 text-yellow-500" />
                        Obtener Membresía
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};