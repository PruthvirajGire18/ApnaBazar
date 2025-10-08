import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const MainBanner = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Banner Background */}
      <img 
        src={assets.main_banner_bg} 
        alt="banner" 
        className="w-full h-full object-cover hidden md:block" 
      />
      <img 
        src={assets.main_banner_bg_sm} 
        alt="banner" 
        className="w-full h-full object-cover md:hidden" 
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Banner Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg max-w-3xl">
          Freshness You Can Trust, <br className="hidden md:block"/> Savings You Will Love!
        </h1>

        <p className="mt-4 text-sm md:text-lg text-gray-200 max-w-xl">
          Shop farm-fresh groceries and unbeatable deals delivered straight to your door.
        </p>

        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          {/* Shop Now button - Always visible */}
          <Link 
            to="/products" 
            className="group flex items-center gap-2 px-6 md:px-10 py-3 bg-primary hover:bg-primary-dull transition rounded-full text-white font-semibold shadow-lg"
          >
            Shop Now
            <img 
              className="w-4 h-4 transition group-hover:translate-x-1" 
              src={assets.white_arrow_icon} 
              alt="arrow" 
            />
          </Link>

          {/* Explore Deals button - Only on medium+ screens */}
          <Link 
            to="/products" 
            className="group hidden md:flex items-center gap-2 px-8 md:px-10 py-3 border-2 border-white rounded-full cursor-pointer transition hover:bg-white hover:text-black text-white font-semibold shadow-md"
          >
            Explore Deals
            <img 
              className="transition group-hover:translate-x-1 filter invert" 
              src={assets.black_arrow_icon} 
              alt="arrow" 
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
