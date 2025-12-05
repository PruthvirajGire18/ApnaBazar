import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { UseAppContext } from '../context/AppContext';
import LocationSelector from './LocationSelector';
import Notifications from './Notifications';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, setShowUserLogin, navigate, searchQuery, setsearchQuery, getCartCount } = UseAppContext();

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate('/products');
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 py-4 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50' 
        : 'bg-white/80 backdrop-blur-md border-b border-gray-200/30'
    }`}>

      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center group">
        <img className="h-12 md:h-14 transition-transform group-hover:scale-105" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Location Selector - Desktop */}
      <div className="hidden lg:block">
        <LocationSelector />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        <NavLink 
          to="/" 
          className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink 
          to="/products"
          className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
        >
          Products
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
        </NavLink>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center text-sm gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-200/50 px-4 py-2.5 rounded-full transition-all duration-200 focus-within:bg-white focus-within:border-green-500/50 focus-within:shadow-md">
          <img src={assets.search_icon} alt="search-icon" className="w-4 h-4 opacity-60" />
          <input
            onChange={(e) => setsearchQuery(e.target.value)}
            value={searchQuery}
            className="w-48 bg-transparent outline-none placeholder-gray-400 text-gray-700"
            type="text"
            placeholder="Search products..."
          />
        </div>

        {/* Cart Icon */}
        <div 
          onClick={() => navigate('/cart')} 
          className="relative cursor-pointer group p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
        >
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 h-6 transition-transform group-hover:scale-110" />
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg animate-pulse">
              {getCartCount()}
            </span>
          )}
        </div>

        {/* Notifications */}
        {user && <Notifications />}

        {/* Login / Profile */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-all">
              <img src={assets.profile_icon} alt="" className="w-8 h-8 rounded-full ring-2 ring-green-500/20" />
            </div>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
              <div className="p-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button 
                  onClick={() => { navigate("/my-orders"); }} 
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                >
                  My Orders
                </button>
                <button 
                  onClick={() => { navigate("/wishlist"); }} 
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                >
                  Wishlist
                </button>
                <button 
                  onClick={logout} 
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right side icons for mobile */}
      <div className="flex items-center gap-3 md:hidden">
        {/* Search Icon */}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200/50 px-3 py-2 rounded-full">
          <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-60" />
          <input
            onChange={(e) => setsearchQuery(e.target.value)}
            value={searchQuery}
            className="w-24 bg-transparent outline-none placeholder-gray-400 text-sm"
            type="text"
            placeholder="Search..."
          />
        </div>

        {/* Cart icon */}
        <div 
          onClick={() => navigate('/cart')} 
          className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-all"
        >
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 h-6" />
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full">
              {getCartCount()}
            </span>
          )}
        </div>

        {/* Hamburger Menu */}
        <button 
          onClick={() => setOpen(!open)} 
          aria-label="Menu"
          className="p-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          <img src={assets.menu_icon} alt="menu" className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-16 left-0 right-0 bg-white/98 backdrop-blur-xl shadow-2xl border-b border-gray-200 transition-all duration-300 md:hidden ${
        open ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
      }`}>
        <div className="flex flex-col py-4 px-6 gap-1">
          <NavLink 
            to="/" 
            onClick={() => setOpen(false)}
            className="px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium transition-all"
          >
            Home
          </NavLink>
          <NavLink 
            to="/products" 
            onClick={() => setOpen(false)}
            className="px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium transition-all"
          >
            Products
          </NavLink>
          {user && (
            <>
              <NavLink 
                to="/my-orders" 
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium transition-all"
              >
                My Orders
              </NavLink>
              <NavLink 
                to="/wishlist" 
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium transition-all"
              >
                Wishlist
              </NavLink>
            </>
          )}
          <div className="border-t border-gray-200 my-2"></div>
          {!user ? (
            <button
              onClick={() => { setOpen(false); setShowUserLogin(true); }}
              className="px-6 py-3 mt-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-md"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => { setOpen(false); logout(); }}
              className="px-6 py-3 mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full shadow-md transition-all"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
