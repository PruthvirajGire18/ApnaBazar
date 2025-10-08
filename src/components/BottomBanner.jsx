import React from 'react';
import { assets, features } from '../assets/assets'; // Ensure these are correctly defined

const BottomBanner = () => {
  return (
    <section className="w-full relative bg-gray-50 py-16 md:py-24 overflow-hidden">
      
      {/* Main Container: Centered, Rounded, and Shadowed with Gradient */}
      <div className="relative w-full max-w-7xl mx-auto bg-gradient-to-r from-[#E0F2F1] to-[#E8F8F5] rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          
          {/* -------------------- LEFT SIDE: Image and Simple Blob -------------------- */}
          <div className="relative w-full md:w-1/2 flex justify-center py-8 md:py-0 pr-0">
            
            {/* Green blob background - Simplified to a simple rounded shape for cleaner styling */}
            <div className="absolute left-0 top-0 h-full w-full md:w-[70%] bg-[#8DC2AD] rounded-r-full">
              {/* Removed complex inner div */}
            </div>
            
            {/* Main Character Image - Assuming 'assets.bottom_banner_image' is your girl image */}
            {/* Adjusted position for better centering within the blob on desktop */}
            <img
              // You mentioned using assets.bottom_banner_image as the girl image
              src={assets.bottom_banner_image} 
              alt="Girl with Groceries"
              className="relative z-10 h-[350px] md:h-[450px] object-contain transform md:translate-x-0" 
              // Removed aggressive 'translate-x' for simpler positioning
            />
          </div>
          
          {/* -------------------- RIGHT SIDE: Features List -------------------- */}
          <div className="w-full md:w-1/2 flex flex-col items-start gap-5 mt-8 md:mt-0 px-6 md:pr-16 md:py-10">
            
            {/* Title */}
            <h2 className="text-3xl font-bold text-[#4CAF50]">Why We Are The Best?</h2>
            
            {/* Features Container */}
            <div className="flex flex-col gap-4 w-full">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4"> 
                  
                  {/* Icon Container (Light Green Background and Better Shadow) */}
                  <div className="flex-shrink-0 p-3 bg-[#D8F0E4] rounded-full shadow-md"> 
                     <img src={feature.icon} alt={feature.title} className="w-5 h-5" /> 
                  </div>
                 
                  {/* Text Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomBanner;