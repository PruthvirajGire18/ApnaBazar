import React from 'react';
import { UseAppContext } from '../context/AppContext';

const ProductFilters = ({ onApplyFilters }) => {
  const { filters, setFilters, fetchproduct } = UseAppContext();

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = () => {
    fetchproduct(filters);
    if (onApplyFilters) onApplyFilters();
  };

  const resetFilters = () => {
    const defaultFilters = {
      category: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      sortBy: "newest",
      inStock: true
    };
    setFilters(defaultFilters);
    fetchproduct(defaultFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-green-600 hover:text-green-700 font-semibold"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none"
          >
            <option value="">All Categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="dairy">Dairy</option>
            <option value="beverages">Beverages</option>
            <option value="bakery">Bakery</option>
            <option value="grains">Grains</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            placeholder="Min"
            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            placeholder="Max"
            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
          <select
            value={filters.minRating}
            onChange={(e) => handleFilterChange('minRating', e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Star</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* In Stock */}
        <div className="flex items-center pt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-sm font-medium text-gray-700">In Stock Only</span>
          </label>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="mt-4 w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilters;

