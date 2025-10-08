import React, { useState, useEffect } from "react";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Dummy orders (yeh tu baad me API se fetch kar sakta hai)
        const sampleOrders = [
            {
                id: "ORD001",
                items: ["Apples", "Bananas", "Milk"],
                totalAmount: 320,
                paymentMethod: "Online",
                status: "Delivered",
                address: "Flat 201, Green View Apartment, Pune",
                date: "2025-10-05 10:30 AM",
            },
            {
                id: "ORD002",
                items: ["Rice", "Oil", "Sugar"],
                totalAmount: 540,
                paymentMethod: "COD",
                status: "Pending",
                address: "201, Royal Residency, Mumbai",
                date: "2025-10-07 06:45 PM",
            },
        ];

        setOrders(sampleOrders);
    }, []);

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7232775-5875284.png"
                    alt="No Orders"
                    className="w-60 mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-700">
                    You haven’t placed any orders yet!
                </h2>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">🛍️ My Orders</h2>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition"
                    >
                        <div className="flex justify-between items-center border-b pb-2 mb-3">
                            <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${order.status === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : order.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-blue-100 text-blue-700"
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        <div className="text-gray-700 space-y-1">
                            <p><strong>Items:</strong> {order.items.join(", ")}</p>
                            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                            <p><strong>Payment:</strong> {order.paymentMethod}</p>
                            <p><strong>Date:</strong> {order.date}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
