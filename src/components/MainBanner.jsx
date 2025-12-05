import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const MainBanner = () => {
  return (
    <div className="relative w-full h-[85vh] md:h-[92vh] overflow-hidden">
      {/* Banner Background with Parallax Effect */}
      <div className="absolute inset-0">
        <img 
          src={assets.main_banner_bg} 
          alt="banner" 
          className="w-full h-full object-cover hidden md:block scale-110 animate-zoom" 
        />
        <img 
          src={assets.main_banner_bg_sm} 
          alt="banner" 
          className="w-full h-full object-cover md:hidden scale-110 animate-zoom" 
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Banner Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6">
        <div className="max-w-4xl space-y-4 sm:space-y-6 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
            <span className="text-white text-xs sm:text-sm font-semibold">✨ Fresh Daily</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl px-2">
            <span className="bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
              Freshness You Can Trust,
            </span>
            <br className="hidden sm:block"/>
            <span className="bg-gradient-to-r from-green-200 to-white bg-clip-text text-transparent">
              Savings You Will Love!
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed px-2">
            Shop farm-fresh groceries and unbeatable deals delivered straight to your door. 
            <span className="block mt-1 sm:mt-2 text-green-200 font-medium">Quality guaranteed, prices unmatched!</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10 justify-center items-center">
            {/* Shop Now button */}
            <Link 
              to="/products" 
              className="group flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-12 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base md:text-lg w-full sm:w-auto"
            >
              <span>Shop Now</span>
              <img 
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-2" 
                src={assets.white_arrow_icon} 
                alt="arrow" 
              />
            </Link>

            {/* Explore Deals button */}
            <Link 
              to="/products" 
              className="group flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-12 py-3 sm:py-4 bg-white/10 backdrop-blur-md border-2 border-white/50 hover:bg-white hover:text-green-600 rounded-full text-white font-bold shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base md:text-lg w-full sm:w-auto"
            >
              <span>Explore Deals</span>
              <img 
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-2" 
                src={assets.white_arrow_icon} 
                alt="arrow" 
              />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-white/20">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">10K+</p>
              <p className="text-xs sm:text-sm text-gray-300">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">500+</p>
              <p className="text-xs sm:text-sm text-gray-300">Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">24/7</p>
              <p className="text-xs sm:text-sm text-gray-300">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
