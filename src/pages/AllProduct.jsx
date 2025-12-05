import React, { useEffect, useState } from "react";
import { UseAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";

const AllProduct = () => {
  const { products = [], searchQuery, fetchproduct, filters } = UseAppContext();
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      fetchproduct({ ...filters, search: searchQuery });
    } else {
      fetchproduct(filters);
    }
  }, [searchQuery, filters]);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      setFilteredProduct(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProduct(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-10 py-4 sm:py-6">
      {/* Title and Filters Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          All Products
        </h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filters */}
      {showFilters && <ProductFilters />}

      {/* Product Grid */}
      {filteredProduct.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p className="text-gray-500 text-base sm:text-lg">No products found</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredProduct
            .filter((product) => product.inStock)
            .map((product) => (
              <ProductCard key={product._id || product.id || product.name} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default AllProduct;
