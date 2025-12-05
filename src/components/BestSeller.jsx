import React from "react";
import ProductCard from "./ProductCard";
import { UseAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = UseAppContext();

  return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-16 md:py-20 bg-gradient-to-b from-white via-gray-50 to-white"> 
      {/* Heading */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-block mb-4">
          <span className="text-5xl">⭐</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-4">
          Best Sellers
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Our most loved products, handpicked just for you
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
        {products
          .filter((product) => product.inStock)
          .slice(0, 8) 
          .map((product, index) => (
            <div
              key={index}
              className="transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default BestSeller;