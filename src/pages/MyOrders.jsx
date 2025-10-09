import React, { useEffect, useState } from "react";
import { UseAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { currency } = UseAppContext();

  const fetchOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
        🛍️ My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-80">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7232775-5875284.png"
            alt="No Orders"
            className="w-60 mb-4"
          />
          <p className="text-gray-600 text-lg font-medium">
            You haven’t placed any orders yet!
          </p>
        </div>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition mb-8 overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-green-100/60 px-6 py-3 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">
                Order ID: <span className="text-green-700">{order._id}</span>
              </h2>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-200 text-green-800"
                    : order.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-blue-200 text-blue-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Order Details */}
            <div className="px-6 py-4 border-b border-gray-100 text-sm md:text-base">
              <p className="text-gray-600">
                <strong>Payment:</strong> {order.paymentType}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 font-medium mt-1">
                <strong>Total:</strong> {currency}
                {order.amount}
              </p>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-100">
              {Array.isArray(order.items) &&
                order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row items-center justify-between px-6 py-4"
                  >
                    {/* Product info */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <img
                        src={item.product.image[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {item.product.category}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Qty: {item.quantity || 1}
                        </p>
                      </div>
                    </div>

                    {/* Amount info */}
                    <div className="text-right mt-3 md:mt-0">
                      <p className="text-gray-600 text-sm">
                        Price: {currency}
                        {item.product.offerPrice}
                      </p>
                      <p className="font-semibold text-green-700">
                        Amount: {currency}
                        {item.quantity * item.product.offerPrice}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
