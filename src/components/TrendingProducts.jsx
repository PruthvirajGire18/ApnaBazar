import React from 'react';
import { UseAppContext } from '../context/AppContext';
import ProductCard from './ProductCard';

const TrendingProducts = () => {
  const { products, navigate } = UseAppContext();

  // Get trending products (highest rated or most reviewed)
  const trendingProducts = products
    .filter(p => p.averageRating >= 4 || p.totalReviews > 10)
    .sort((a, b) => {
      const scoreA = (a.averageRating || 0) * (a.totalReviews || 0);
      const scoreB = (b.averageRating || 0) * (b.totalReviews || 0);
      return scoreB - scoreA;
    })
    .slice(0, 8);

  if (trendingProducts.length === 0) return null;

  return (
    <div className="w-full py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-0.5 sm:w-1 h-8 sm:h-12 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800">
                Trending Now
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1">Most loved by customers</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1 text-sm sm:text-base self-start sm:self-auto"
          >
            View All
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;

