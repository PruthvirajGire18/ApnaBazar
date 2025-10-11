import axios from "axios";
import { UseAppContext } from "../../context/AppContext";
import { PackageOpen, IndianRupee } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProductList = () => {
  const { products, currency, fetchproduct } = UseAppContext();
 const toggleStock = async (id, inStock) => {
  try {
    const response = await axios.post('/api/product/stock', { id, inStock });
    console.log(response.data);

    if (response.status) {
      toast.success("Stock updated successfully");
      fetchproduct();
    }
  } catch (error) {
    console.error(error);
    toast.error("Error while updating stock");
  }
};

  return (
    <div className="flex-1 py-10 flex flex-col justify-between bg-gray-50 min-h-screen">
      <div className="w-full md:p-10 p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <PackageOpen className="text-green-500" />
            All Products
          </h2>
          <p className="text-gray-500 text-sm">
            Total Products:{" "}
            <span className="text-green-600 font-semibold">{products.length}</span>
          </p>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-green-500 text-white text-left">
              <tr>
                <th className="px-6 py-4 font-semibold rounded-tl-2xl">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold hidden md:table-cell">Price</th>
                <th className="px-6 py-4 font-semibold">In Stock</th>
              </tr> 
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-green-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {product.description || "No description"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 capitalize text-gray-700">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="flex items-center gap-1 text-gray-700">
                      <IndianRupee className="w-4 h-4 text-green-600" />
                      {product.offerPrice || product.price}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input onClick={() => toggleStock(product._id, !product.inStock)} checked={product.inStock} type="checkbox" className="sr-only peer" />
                      <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow"></span>
                    </label>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-500">
                    No products found 🛍️
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
