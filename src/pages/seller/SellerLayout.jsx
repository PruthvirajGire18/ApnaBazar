import { Outlet, Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { UseAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const location = useLocation();
  const [isSeller, setIsSeller] = useState(true); // for logout simulation
  const {axios,navigate}=UseAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: "add_icon" },
    { name: "Product List", path: "/seller/products-list", icon: "product_list_icon" },
    { name: "Orders", path: "/seller/orders", icon: "order_icon" },
  ];

  const logout = async() => {
   
    try {
      axios.get('/api/seller/logout');
      setIsSeller(false);
      toast.success("Logged out successfully");
      navigate('/seller');
      // Optionally, you can add a toast notification here for successful logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
      // Optionally, you can add a toast notification here for logout failure
    }
    // Redirect to login if using router
  };

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="md:w-64 w-20 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="flex items-center justify-center py-6 border-b border-gray-200">
          <img src={assets.logo} alt="logo" className="w-32 md:w-40" />
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          {sidebarLinks.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition 
                  ${active ? "bg-green-100 text-green-700" : "text-gray-700 hover:bg-green-50"}`}
              >
                <img src={assets[item.icon]} alt={item.name} className="w-6 h-6" />
                <span className="md:block hidden">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-6 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full text-white bg-green-600 hover:bg-green-700 rounded-lg py-2 font-medium transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-green-700">
            Seller Dashboard
          </h1>
          <p className="text-gray-600 font-medium">Hi, Seller 👋</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SellerLayout;
