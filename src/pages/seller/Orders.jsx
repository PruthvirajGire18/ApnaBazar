import { useEffect, useState } from "react";
import { UseAppContext } from "../../context/AppContext";
import { assets, dummyOrders } from "../../assets/assets";
import { Package, IndianRupee, Calendar, MapPin, Phone, Mail } from "lucide-react";

const Order = () => {
  const { currency } = UseAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    setOrders(dummyOrders);
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

      {orders.length === 0 ? (
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
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg"
                    >
                      <img
                        src={item.product.image[0] || assets.box_icon}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Address */}
                <div className="text-sm text-gray-700 space-y-1">
                  <h4 className="font-semibold mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" /> Address
                  </h4>
                  <p className="font-medium">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-gray-600">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state} - {order.address.zipcode}
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

                {/* Payment Info */}
                <div className="text-sm text-gray-700 space-y-2">
                  <h4 className="font-semibold mb-1">Payment Info</h4>
                  <p>Method: {order.paymentType}</p>
                  <p className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-green-600" />{" "}
                    {new Date(order.orderDate).toLocaleDateString()}
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
                    defaultValue={order.status || "Pending"}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                    Update
                  </button>
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
