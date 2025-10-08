import React from "react";
import { categories } from "../assets/assets";
import { UseAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = UseAppContext();

  return (
    <section className="px-6 py-8 bg-gray-50">
      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          📂 Categories
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-1">
          Explore products by category
        </p>
      </div>

      {/* Grid Layout:
        - Mobile (Default): 2 columns
        - Medium (md:): 4 columns
        - Large (lg:): 7 columns (Laptop/Desktop)
        - Extra Large (xl:): 7 columns (Wide Desktop)
      */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 
                      md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-7 
                      mx-auto max-w-7xl py-2">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0); 
            }}
            style={{ backgroundColor: category.bgColor }}
            
            // Category Item Styling: Aspect square ensures uniform grid size
            className="w-full aspect-square 
                       flex flex-col items-center justify-center rounded-3xl shadow-md p-2 md:p-4 cursor-pointer 
                       transition transform hover:scale-[1.03] hover:shadow-xl duration-300"
          >
            {/* Image Container Size Adjustment */}
            {/* Mobile: w-16/h-16, Desktop (lg: and up): w-12/h-12 for 7 columns */}
            <div className="w-16 h-16 sm:w-16 sm:h-16 
                            md:w-16 md:h-16 lg:w-12 lg:h-12 
                            flex items-center justify-center mb-1">
              <img
                src={category.image}
                alt={category.text}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Text Size Adjustment */}
            {/* Text size is kept small (sm:text-sm) for higher density */}
            <p className="text-xs sm:text-sm font-semibold text-gray-900 text-center leading-tight">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;