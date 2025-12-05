import React from 'react';
import { assets, features } from '../assets/assets'; // Ensure these are correctly defined

const BottomBanner = () => {
  return (
    <section className="w-full relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center">
            
            {/* LEFT SIDE: Image */}
            <div className="relative w-full lg:w-1/2 flex justify-center items-center p-8 lg:p-12 bg-gradient-to-br from-green-100 to-green-50">
              <div className="relative z-10">
                <img
                  src={assets.bottom_banner_image} 
                  alt="Happy Shopping"
                  className="h-[300px] md:h-[400px] lg:h-[500px] object-contain transform hover:scale-105 transition-transform duration-500" 
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-green-200/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 bg-green-300/30 rounded-full blur-xl"></div>
            </div>
            
            {/* RIGHT SIDE: Features */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 p-8 lg:p-12">
              <div className="mb-4">
                <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-3">
                  Why Choose Us?
                </h2>
                <p className="text-gray-600 text-lg">
                  Experience the best in online grocery shopping
                </p>
              </div>
              
              {/* Features List */}
              <div className="space-y-5">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-all duration-300 group"
                  >
                    {/* Icon Container */}
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"> 
                      <img src={feature.icon} alt={feature.title} className="w-7 h-7 filter brightness-0 invert" /> 
                    </div>
                   
                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-green-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomBanner;