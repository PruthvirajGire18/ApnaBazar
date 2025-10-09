import { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { Camera } from "lucide-react"; // optional icons

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Handle submit logic here
  };

  return (
    <div className="flex justify-center py-10 bg-gray-50 min-h-screen">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          🛒 Add New Product
        </h2>

        {/* Product Image Upload */}
        <div>
          <p className="text-base font-semibold text-gray-700 mb-2">
            Product Images
          </p>
          <div className="flex flex-wrap gap-4">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="relative cursor-pointer border-2 border-dashed border-gray-300 rounded-xl w-24 h-24 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all"
                >
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFiles((prev) => {
                        const newFiles = [...prev];
                        newFiles[index] = file;
                        return newFiles;
                      });
                    }}
                  />
                  {files[index] ? (
                    <img
                      src={URL.createObjectURL(files[index])}
                      alt="preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Camera className="text-gray-400 w-6 h-6" />
                  )}
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="mt-5">
          <label
            className="block text-base font-semibold text-gray-700 mb-1"
            htmlFor="product-name"
          >
            Product Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="product-name"
            type="text"
            placeholder="e.g. Fresh Apples"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all"
            required
          />
        </div>

        {/* Description */}
        <div className="mt-5">
          <label
            className="block text-base font-semibold text-gray-700 mb-1"
            htmlFor="product-description"
          >
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="product-description"
            rows={3}
            placeholder="Short product details..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none resize-none transition-all"
          ></textarea>
        </div>

        {/* Category */}
        <div className="mt-5">
          <label
            className="block text-base font-semibold text-gray-700 mb-1"
            htmlFor="category"
          >
            Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="category"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.text}>
                {item.text}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Offer */}
        <div className="mt-5 flex gap-5 flex-wrap">
          <div className="flex-1 min-w-[120px]">
            <label
              className="block text-base font-semibold text-gray-700 mb-1"
              htmlFor="product-price"
            >
              Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="product-price"
              type="number"
              placeholder="₹0"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all"
              required
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label
              className="block text-base font-semibold text-gray-700 mb-1"
              htmlFor="offer-price"
            >
              Offer Price
            </label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              id="offer-price"
              type="number"
              placeholder="₹0"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-7 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
