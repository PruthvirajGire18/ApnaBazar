import { useEffect, useState } from "react";
import { UseAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { Package, IndianRupee, Calendar, MapPin, Phone, Mail } from "lucide-react";
import toast from "react-hot-toast";

const Order = () => {
  const { currency, axios } = UseAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const {data} = await axios.get('/api/order/seller');
      console.log('Orders response:', data);
      
      if(data && data.success){
        setOrders(Array.isArray(data.orders) ? data.orders : []);
        if(data.count === 0){
          console.log('No orders found');
        }
      } else {
        const errorMsg = data?.message || "Failed to fetch orders";
        console.error('Failed to fetch orders:', errorMsg);
        toast.error(errorMsg);
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      console.error('Error response:', error.response);
      
      const errorMessage = error.response?.data?.message || error.message || "Error fetching orders";
      
      // Check if it's an authentication error
      if(error.response?.status === 401){
        toast.error("Please login as seller to view orders");
      } else {
        toast.error(errorMessage);
      }
      
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const {data} = await axios.post('/api/order/status', {orderId, status});
      if(data.success){
        toast.success("Order status updated");
        fetchOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen md:p-10 p-4 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
        <Package className="text-green-500" />
        Orders List
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-80 text-center">
          <p className="text-gray-600 text-lg font-medium">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-80 text-center">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-orders-6773746-5647822.png"
            alt="No Orders"
            className="w-60 mb-4"
          />
          <p className="text-gray-600 text-lg font-medium">
            No orders have been placed yet!
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Header */}
              <div className="bg-green-100/70 px-6 py-3 rounded-t-2xl flex justify-between items-center">
                <h3 className="text-gray-800 font-semibold">
                  Order ID:{" "}
                  <span className="text-green-700">{order._id || `#ORD${index + 1}`}</span>
                </h3>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    order.isPaid
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </div>

              {/* Order Info */}
              <div className="p-6 grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-6">
                {/* Products */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    <Package className="w-4 h-4 text-green-600" /> Items
                  </h4>
                  {Array.isArray(order.items) && order.items.map((item, i) => {
                    const product = item.product;
                    if(!product) return null;
                    return (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg"
                    >
                      <img
                        src={product.images?.[0] || product.image?.[0] || assets.box_icon}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  )})}
                </div>

                {/* Address */}
                {order.address && (
                <div className="text-sm text-gray-700 space-y-1">
                  <h4 className="font-semibold mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" /> Address
                  </h4>
                  <p className="font-medium">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-gray-600">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state} - {order.address.zipCode || order.address.zipcode}
                  </p>
                  <p className="text-gray-600">{order.address.country}</p>
                  <p className="flex items-center gap-1 text-gray-600">
                    <Phone className="w-4 h-4 text-green-600" />{" "}
                    {order.address.phone}
                  </p>
                  <p className="flex items-center gap-1 text-gray-600">
                    <Mail className="w-4 h-4 text-green-600" />{" "}
                    {order.address.email}
                  </p>
                </div>
                )}

                {/* Payment Info */}
                <div className="text-sm text-gray-700 space-y-2">
                  <h4 className="font-semibold mb-1">Payment Info</h4>
                  <p>Method: {order.paymentType}</p>
                  <p className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-green-600" />{" "}
                    {new Date(order.createdAt || order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="font-medium text-gray-800">
                    <IndianRupee className="w-4 h-4 inline text-green-600" />
                    {order.amount}
                  </p>
                </div>

                {/* Status */}
                <div className="flex flex-col items-center justify-center gap-3">
                  <select
                    className="border border-gray-300 rounded-lg px-3 py-2 outline-none text-sm cursor-pointer hover:border-green-500 transition"
                    value={order.status || "Order Placed"}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    order.status === "Delivered" ? "bg-green-200 text-green-800" :
                    order.status === "Cancelled" ? "bg-red-200 text-red-800" :
                    "bg-yellow-200 text-yellow-800"
                  }`}>
                    {order.status || "Order Placed"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
