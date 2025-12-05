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
      const {data}=await axios.get('/api/seller/logout');
      if(data.success){
      setIsSeller(false);
      toast.success("Logged out successfully");
      navigate('/');
      }
      else{
         toast.error("Logout failed. Please try again.");
      }
      // Optionally, you can add a toast notification here for successful logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
      // Optionally, you can add a toast notification here for logout failure
    }
    // Redirect to login if using router
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-green-600 text-white p-2 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 md:w-64 w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="flex items-center justify-between md:justify-center px-4 md:px-0 py-4 md:py-6 border-b border-gray-200">
          <img src={assets.logo} alt="logo" className="w-32 md:w-40" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base
                  ${active ? "bg-green-100 text-green-700" : "text-gray-700 hover:bg-green-50"}`}
              >
                <img src={assets[item.icon]} alt={item.name} className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 sm:px-4 py-4 sm:py-6 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full text-white bg-green-600 hover:bg-green-700 rounded-lg py-2 text-sm sm:text-base font-medium transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-3 sm:p-4 md:p-6 w-full md:w-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700">
            Seller Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-medium">Hi, Seller 👋</p>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-3 sm:p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SellerLayout;
