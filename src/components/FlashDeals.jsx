import React, { useEffect, useState } from 'react';
import { UseAppContext } from '../context/AppContext';
import ProductCard from './ProductCard';
import { assets } from '../assets/assets';

const FlashDeals = () => {
  const { products, navigate } = UseAppContext();
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 30, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset for next day
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get products with highest discounts
  const flashDeals = products
    .filter(p => p.price > p.offerPrice)
    .sort((a, b) => {
      const discountA = ((a.price - a.offerPrice) / a.price) * 100;
      const discountB = ((b.price - b.offerPrice) / b.price) * 100;
      return discountB - discountA;
    })
    .slice(0, 8);

  if (flashDeals.length === 0) return null;

  return (
    <div className="w-full py-6 sm:py-8 md:py-12 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800">
                Flash Deals
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white rounded-lg border-2 border-red-200 shadow-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">Ends in:</span>
              <div className="flex items-center gap-0.5 sm:gap-1 font-mono font-bold text-red-600 text-xs sm:text-sm">
                <span className="bg-red-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-red-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-red-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1 text-sm sm:text-base"
          >
            View All
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {flashDeals.map((product) => (
            <div key={product._id} className="relative">
              <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                FLASH
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashDeals;

