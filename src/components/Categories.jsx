import React from "react";
import { categories } from "../assets/assets";
import { UseAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = UseAppContext();

  return (
    <section className="px-4 md:px-6 py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      {/* Heading */}
      <div className="text-center mb-10 md:mb-12">
        <div className="inline-block mb-3">
          <span className="text-4xl">🛍️</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
          Shop by Category
        </h2>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
          Discover fresh products organized just for you
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-6 mx-auto max-w-7xl">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0); 
            }}
            className="group relative w-full aspect-square 
                       flex flex-col items-center justify-center rounded-2xl md:rounded-3xl 
                       bg-white shadow-lg hover:shadow-2xl 
                       border border-gray-100 hover:border-green-300
                       p-4 md:p-6 cursor-pointer 
                       transition-all duration-300 transform hover:-translate-y-2 hover:scale-105
                       overflow-hidden"
          >
            {/* Background Gradient on Hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                background: `linear-gradient(135deg, ${category.bgColor}15, ${category.bgColor}05)`
              }}
            ></div>

            {/* Icon Container */}
            <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 
                            flex items-center justify-center mb-3 md:mb-4
                            transform group-hover:scale-110 transition-transform duration-300">
              <div 
                className="w-full h-full rounded-2xl flex items-center justify-center p-3"
                style={{ backgroundColor: `${category.bgColor}20` }}
              >
                <img
                  src={category.image}
                  alt={category.text}
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
            </div>

            {/* Category Name */}
            <p className="relative z-10 text-xs sm:text-sm md:text-base font-bold text-gray-800 group-hover:text-green-600 text-center leading-tight transition-colors duration-300">
              {category.text}
            </p>

            {/* Hover Arrow */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;