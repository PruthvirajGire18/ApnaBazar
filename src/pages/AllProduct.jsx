import React, { useEffect, useState } from "react";
import { UseAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProduct = () => {
  const { products = [], searchQuery } = UseAppContext();
  const [filteredProduct, setFilteredProduct] = useState([]);

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
    <div className="w-full px-4 md:px-10 py-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        All Products
      </h2>

      {/* Product Grid */}
      {filteredProduct.length === 0 ? (
        <p className="text-gray-500 text-center">No products found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProduct
            .filter((product) => product.inStock)
            .map((product) => (
              <ProductCard key={product.id || product.name} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default AllProduct;
