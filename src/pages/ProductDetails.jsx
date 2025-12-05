import { useEffect, useState } from "react";
import { UseAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import Reviews from "../components/Reviews";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart, addToRecentlyViewed, isInWishlist, addToWishlist, removeFromWishlist } = UseAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      let productsCopy = structuredClone(products);
      productsCopy = productsCopy.filter(
        (item) => product.category === item.category && item._id !== product._id
      );
      setRelatedProduct(productsCopy.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    setThumbnail(product?.images?.[0] || product?.image?.[0] || null);
    if(product?._id){
      addToRecentlyViewed(product._id);
    }
  }, [product]);

  return (
    product && (
      <div className="max-w-6xl w-full mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 bg-white rounded-xl md:rounded-2xl shadow-sm">
        {/* Breadcrumb */}
        <p className="text-gray-600 text-xs sm:text-sm mb-3 overflow-x-auto">
          <Link to="/" className="text-green-600 hover:underline">
            Home
          </Link>{" "}
          /
          <Link to="/products" className="text-green-600 hover:underline">
            {" "}
            Products
          </Link>{" "}
          /
          <Link
            to={`/products/${product.category.toLowerCase()}`}
            className="text-green-600 hover:underline"
          >
            {" "}
            {product.category}
          </Link>{" "}
          / <span className="text-green-700 font-medium">{product.name}</span>
        </p>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 mt-4">
          {/* Left side: Images */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full lg:w-auto">
            {/* Thumbnail Images - Hidden on mobile, shown on larger screens */}
            <div className="hidden sm:flex flex-col gap-2 md:gap-3">
              {(product.images || product.image || []).map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`border-2 rounded-lg md:rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                    thumbnail === image
                      ? "border-green-500 shadow-md"
                      : "border-gray-300 hover:border-green-400"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full sm:flex-1 border border-gray-300 rounded-xl md:rounded-2xl overflow-hidden shadow-sm bg-gray-50">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] object-contain mx-auto"
              />
            </div>

            {/* Mobile Image Swiper - Show dots for mobile */}
            <div className="sm:hidden flex justify-center gap-2 mt-2">
              {(product.images || product.image || []).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    thumbnail === image
                      ? "bg-green-500 w-6"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right side: Details */}
          <div className="text-sm w-full lg:w-1/2 flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-green-700 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.round(product.averageRating || 0) ? assets.star_icon : assets.star_dull_icon}
                    alt="star"
                    className="w-5 h-5"
                  />
                ))}
              <p className="text-base ml-2 text-gray-500">
                ({product.averageRating?.toFixed(1) || 0}) {product.totalReviews || 0} reviews
              </p>
            </div>
            
            {/* Wishlist Button */}
            <div className="mt-4">
              {isInWishlist(product._id) ? (
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  Remove from Wishlist
                </button>
              ) : (
                <button
                  onClick={() => addToWishlist(product._id)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Wishlist
                </button>
              )}
            </div>

            {/* Price */}
            <div className="mt-6">
              <p className="text-gray-400 line-through">
                MRP: {currency}
                {product.price}
              </p>
              <p className="text-3xl font-bold text-green-700">
                {currency}
                {product.offerPrice}
              </p>
              <span className="text-gray-500 text-sm">
                (inclusive of all taxes)
              </span>
            </div>

            {/* Description */}
            <p className="text-lg font-medium mt-6 text-gray-800">
              About Product
            </p>
            <ul className="list-disc ml-5 text-gray-600 mt-2 leading-relaxed">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center mt-6 md:mt-10 gap-3 sm:gap-4 text-sm sm:text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full sm:flex-1 py-3 sm:py-3.5 rounded-lg font-medium bg-green-100 text-green-700 hover:bg-green-200 border border-green-300 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="w-full sm:flex-1 py-3 sm:py-3.5 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 shadow-md transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- Related Products Section ---------------- */}
        <div className="mt-8 md:mt-12 lg:mt-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4 md:mb-6">
            Related Products
          </h2>

          {relatedProduct.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {relatedProduct
                .filter((item) => item.inStock)
                .map((item, index) => (
                  <ProductCard key={index} product={item} />
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm sm:text-base">No related products found.</p>
          )}

          <div className="flex justify-center mt-6 md:mt-8">
            <button
              onClick={() => {
                navigate("/products");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              See More
            </button>
          </div>
        </div>
        
        {/* Reviews Section */}
        <Reviews productId={product._id} />
      </div>
    )
  );
};

export default ProductDetails;
