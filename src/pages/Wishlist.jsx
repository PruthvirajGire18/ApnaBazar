import React, { useEffect } from 'react';
import { UseAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { assets } from '../assets/assets';

const Wishlist = () => {
  const { wishlist, fetchWishlist, user, navigate } = UseAppContext();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Please login to view your wishlist</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-4 sm:py-6 md:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
            My Wishlist
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">❤️</div>
            <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</p>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Add products you love to your wishlist!</p>
            <button
              onClick={() => navigate('/products')}
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

