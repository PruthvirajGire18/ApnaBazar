import { useEffect, useState } from "react";
import { UseAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = UseAppContext();
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
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  return (
    product && (
      <div className="max-w-6xl w-full px-6 py-8 bg-white rounded-2xl shadow-sm">
        {/* Breadcrumb */}
        <p className="text-gray-600 text-sm mb-3">
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

        <div className="flex flex-col md:flex-row gap-12 mt-4">
          {/* Left side: Images */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                    thumbnail === image
                      ? "border-green-500 shadow-md"
                      : "border-gray-300 hover:border-green-400"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-sm">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover max-w-sm"
              />
            </div>
          </div>

          {/* Right side: Details */}
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-semibold text-green-700">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt="star"
                    className="w-5 h-5"
                  />
                ))}
              <p className="text-base ml-2 text-gray-500">(4)</p>
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
            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full py-3.5 rounded-lg font-medium bg-green-100 text-green-700 hover:bg-green-200 border border-green-300 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="w-full py-3.5 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 shadow-md transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- Related Products Section ---------------- */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            Related Products
          </h2>

          {relatedProduct.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {relatedProduct
                .filter((item) => item.inStock)
                .map((item, index) => (
                  <ProductCard key={index} product={item} />
                ))}
            </div>
          ) : (
            <p className="text-gray-500">No related products found.</p>
          )}

          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                navigate("/products");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              See More
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
