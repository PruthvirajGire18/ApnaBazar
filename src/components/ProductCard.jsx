import React from "react";
import { assets } from "../assets/assets";
import { UseAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate, isInWishlist, addToWishlist, removeFromWishlist } =
    UseAppContext();

  return (
    product && (
      <div 
        onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }} 
        className="group relative bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 w-full transform hover:-translate-y-1 md:hover:-translate-y-2"
      >
        {/* Badge */}
        {product.offerPrice < product.price && (
          <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
          </div>
        )}
        
        {/* Wishlist Button */}
        <div 
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute top-3 right-3 z-10"
        >
          <button
            onClick={() => isInWishlist(product._id) ? removeFromWishlist(product._id) : addToWishlist(product._id)}
            className={`p-2 rounded-full shadow-lg transition-all ${
              isInWishlist(product._id)
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill={isInWishlist(product._id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 h-40 sm:h-48 md:h-52 flex items-center justify-center">
          <img
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            src={product.images?.[0] || product.image?.[0]}
            alt={product.name}
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Details */}
        <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
          {/* Category */}
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide truncate">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="text-gray-800 font-bold text-sm sm:text-base md:text-lg line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-0.5 sm:gap-1 flex-wrap">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < Math.round(product.averageRating || 0) ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
              ))}
            <span className="text-xs text-gray-500 ml-1">
              ({product.averageRating?.toFixed(1) || 0}) {product.totalReviews || 0}
            </span>
          </div>

          {/* Price + Add to cart */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 gap-2 sm:gap-0">
            <div className="flex-shrink-0">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                {currency}{product.offerPrice}
              </p>
              {product.offerPrice < product.price && (
                <p className="text-xs sm:text-sm text-gray-400 line-through">
                  {currency}{product.price}
                </p>
              )}
            </div>

            <div onClick={(e) => { e.stopPropagation() }} className="w-full sm:w-auto">
              {!cartItems[product._id] ? (
                <button
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart-icon" className="w-3 h-3 sm:w-4 sm:h-4 filter brightness-0 invert" />
                  <span>Add</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3 bg-green-50 border-2 border-green-500 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 w-full sm:w-auto justify-center">
                  <button
                    onClick={() => { removeFromCart(product._id) }}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded-lg text-green-600 font-bold hover:bg-green-100 transition-all shadow-sm text-sm sm:text-base"
                  >
                    −
                  </button>
                  <span className="w-6 sm:w-8 text-center font-bold text-green-700 text-sm sm:text-base">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => { addToCart(product._id) }}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded-lg text-green-600 font-bold hover:bg-green-100 transition-all shadow-sm text-sm sm:text-base"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
