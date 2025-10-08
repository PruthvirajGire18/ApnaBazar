import React from 'react'
import { UseAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
  const { products = [] } = UseAppContext();
  const { category } = useParams();

  // safe lowercase comparison
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category.toLowerCase()
  );

  const filteredProduct = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="w-full px-4 md:px-10 py-6">
      {/* Heading */}
      <div className="mb-6 text-center">
        {searchCategory ? (
          <h2 className="text-3xl font-bold text-gray-800">
            {searchCategory.text.toUpperCase()}
          </h2>
        ) : (
          <h2 className="text-xl font-semibold text-red-500">Category not found</h2>
        )}
      </div>

      {/* Products */}
      {filteredProduct.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProduct.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg">No product found in this category</p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
