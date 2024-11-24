import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bot, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-[#D7092E]" />
              <span className="text-xl font-bold text-gray-900">GetSmartly.io</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#D7092E] transition-colors">
              Accueil
            </Link>
            <Link to="/fonctionnalites" className="text-gray-700 hover:text-[#D7092E] transition-colors">
              Fonctionnalités
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-[#D7092E] transition-colors">
              FAQ
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#D7092E] transition-colors">
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-[#D7092E] transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center text-gray-700 hover:text-[#D7092E] transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/connexion"
                className="bg-[#D7092E] text-white px-4 py-2 rounded-md hover:bg-[#b8072a] transition-colors"
              >
                Se connecter
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#D7092E] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-[#D7092E] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/fonctionnalites"
              className="block px-3 py-2 text-gray-700 hover:text-[#D7092E] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Fonctionnalités
            </Link>
            <Link
              to="/faq"
              className="block px-3 py-2 text-gray-700 hover:text-[#D7092E] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-[#D7092E] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-[#D7092E] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#D7092E] transition-colors"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/connexion"
                className="block px-3 py-2 bg-[#D7092E] text-white rounded-md hover:bg-[#b8072a] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}