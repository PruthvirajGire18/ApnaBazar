import React from "react";
import ProductCard from "./ProductCard";
import { UseAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = UseAppContext();

  return (
    // Outer section padding increased: px-4 changed to px-6 for better mobile margins
    <section className="w-full px-6 sm:px-8 md:px-10 py-12 bg-gray-50"> 
    <p>test</p>
      
      {/* Heading remains the same */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          🌟 Best Sellers
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Our most loved products picked just for you
        </p>
      </div>

      {/* Product Grid Layout Adjustment */}
      {/* Starting with gap-6 for mobile, which is equivalent to 1.5rem (24px) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {products
          .filter((product) => product.inStock)
          .slice(0, 8) 
          .map((product, index) => (
            <div
              key={index}
              className="transform hover:scale-[1.03] hover:shadow-xl transition duration-300 rounded-xl"
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default BestSeller;