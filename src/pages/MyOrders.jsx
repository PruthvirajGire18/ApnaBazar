import React, { useEffect, useState } from "react";
import { UseAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import OrderCancelModal from "../components/OrderCancelModal";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { currency, axios, user, navigate, addToCart, cartItems, setcartItems } = UseAppContext();

  const fetchOrders = async () => {
    if(!user) {
      setLoading(false);
      return;
    }
    try {
      const {data} = await axios.get('/api/order/user');
      if(data.success){
        setOrders(data.orders);
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const quickReorder = (order) => {
    if(!order.items || order.items.length === 0) {
      toast.error("No items to reorder");
      return;
    }
    let newCart = {...cartItems};
    order.items.forEach(item => {
      if(item.product && item.product._id) {
        if(newCart[item.product._id]) {
          newCart[item.product._id] += item.quantity;
        } else {
          newCart[item.product._id] = item.quantity;
        }
      }
    });
    setcartItems(newCart);
    toast.success("Items added to cart!");
    navigate('/cart');
  };

  const handleCancelClick = (order) => {
    setSelectedOrder(order);
    setCancelModalOpen(true);
  };

  const handleCancelSuccess = () => {
    fetchOrders();
  };

  const canCancelOrder = (order) => {
    return ['Order Placed', 'Confirmed'].includes(order.status);
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-5 py-6 sm:py-8 md:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-green-700">
        🛍️ My Orders
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-80">
          <p className="text-gray-600 text-lg font-medium">Loading orders...</p>
        </div>
      ) : !user ? (
        <div className="flex flex-col items-center justify-center h-80">
          <p className="text-gray-600 text-lg font-medium">Please login to view orders</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-80">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7232775-5875284.png"
            alt="No Orders"
            className="w-60 mb-4"
          />
          <p className="text-gray-600 text-lg font-medium">
            You haven't placed any orders yet!
          </p>
        </div>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition mb-4 sm:mb-6 md:mb-8 overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-green-100/60 px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                  Order ID: <span className="text-green-700 font-mono text-xs sm:text-sm">{String(order._id).slice(-8)}</span>
                </h2>
                {order.trackingNumber && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                    Tracking: <span className="font-mono">{order.trackingNumber}</span>
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <span
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium whitespace-nowrap ${
                    order.status === "Delivered"
                      ? "bg-green-200 text-green-800"
                      : order.status === "Cancelled"
                      ? "bg-red-200 text-red-800"
                      : order.status === "Out for Delivery"
                      ? "bg-orange-200 text-orange-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
                {order.trackingNumber && (
                  <button
                    onClick={() => navigate(`/track-order/${order.trackingNumber}`)}
                    className="px-2 sm:px-4 py-1 sm:py-1.5 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap"
                  >
                    Track
                  </button>
                )}
              </div>
            </div>

            {/* Order Details */}
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-gray-100 text-xs sm:text-sm md:text-base space-y-1">
              <p className="text-gray-600">
                <strong>Payment:</strong> {order.paymentType}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 font-medium">
                <strong>Total:</strong> {currency}
                {order.amount}
              </p>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-100">
              {Array.isArray(order.items) &&
                order.items.map((item, i) => {
                  const product = item.product;
                  if(!product) return null;
                  return (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4 gap-3"
                  >
                    {/* Product info */}
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto min-w-0">
                      <img
                        src={product.images?.[0] || product.image?.[0]}
                        alt={product.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 capitalize">
                          {product.category}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Qty: {item.quantity || 1}
                        </p>
                      </div>
                    </div>

                    {/* Amount info */}
                    <div className="text-left sm:text-right w-full sm:w-auto flex-shrink-0">
                      <p className="text-xs sm:text-sm text-gray-600">
                        Price: {currency}
                        {(product.offerPrice || product.price || 0).toFixed(2)}
                      </p>
                      <p className="font-semibold text-sm sm:text-base text-green-700">
                        Amount: {currency}
                        {((item.quantity || 1) * (product.offerPrice || product.price || 0)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                )})}
            </div>
            
            {/* Order Actions */}
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-gray-50 flex flex-col sm:flex-row gap-2 sm:gap-3">
              {order.status !== "Cancelled" && (
                <>
                  {canCancelOrder(order) && (
                    <button
                      onClick={() => handleCancelClick(order)}
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-xs sm:text-sm"
                    >
                      Cancel Order
                    </button>
                  )}
                  <button
                    onClick={() => quickReorder(order)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-xs sm:text-sm"
                  >
                    Quick Reorder
                  </button>
                </>
              )}
              {order.trackingNumber && (
                <button
                  onClick={() => navigate(`/track-order/${order.trackingNumber}`)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-xs sm:text-sm"
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        ))
      )}

      {selectedOrder && (
        <OrderCancelModal
          order={selectedOrder}
          isOpen={cancelModalOpen}
          onClose={() => {
            setCancelModalOpen(false);
            setSelectedOrder(null);
          }}
          onCancelSuccess={handleCancelSuccess}
        />
      )}
    </div>
  );
};

export default MyOrders;
