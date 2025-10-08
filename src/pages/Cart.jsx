import React, { useEffect, useState } from "react";
import { UseAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";

const Cart = () => {
  const {
    products,
    navigate,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    getCartAmount,
  } = UseAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([dummyAddress]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const placeOrder = async () => {
    // later integrate backend order placement
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [cartItems, products]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row py-10 max-w-6xl w-full px-6 mx-auto font-[Inter]">
      {/* Left Section */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6 text-green-700">
          🛒 My Cart
          <span className="ml-2 text-base text-gray-500">
            ({getCartCount()} items)
          </span>
        </h1>

        {cartArray.length > 0 ? (
          <div className="space-y-4">
            {cartArray.map((product, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => {
                      navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                      scrollTo(0, 0);
                    }}
                    className="cursor-pointer w-24 h-24 rounded-xl overflow-hidden border border-gray-200"
                  >
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-medium text-lg">{product.name}</p>
                    <p className="text-gray-500 text-sm">
                      Weight: {product.weight || "N/A"}
                    </p>
                    <div className="flex items-center mt-1">
                      <p className="text-gray-600 mr-2">Qty:</p>
                      <select
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none"
                        value={cartItems[product._id]}
                        onChange={(e) =>
                          updateCartItem(product._id, Number(e.target.value))
                        }
                      >
                        {Array(
                          cartItems[product._id] > 9 ? cartItems[product._id] : 9
                        )
                          .fill("")
                          .map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-green-700">
                    {currency}
                    {product.offerPrice * product.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="mt-2 text-red-500 text-sm hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">
            Your cart is empty 🛍️
          </p>
        )}

        <button
          onClick={() => {
            navigate(`/products`);
            scrollTo(0, 0);
          }}
          className="mt-8 inline-flex items-center gap-2 text-green-700 font-medium hover:underline"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt="arrow"
            className="w-5"
          />
          Continue Shopping
        </button>
      </div>

      {/* Right Section */}
      <div className="max-w-[360px] w-full bg-white border border-gray-200 shadow-lg rounded-2xl p-5 mt-10 md:mt-0 md:ml-10">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Order Summary
        </h2>
        <hr className="border-gray-200 mb-4" />

        {/* Address Section */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-gray-700 uppercase">
            Delivery Address
          </p>
          <div className="relative mt-2">
            <p className="text-gray-600 text-sm leading-relaxed">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-green-600 text-sm mt-2 hover:underline"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-16 left-0 bg-white border border-gray-300 rounded-lg shadow-lg w-full z-10">
                {address.map((addr, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setShowAddress(false);
                    }}
                    className="p-3 text-gray-600 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {`${addr.street}, ${addr.city}, ${addr.state}, ${addr.country}`}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-green-600 text-center cursor-pointer p-2 hover:bg-green-100"
                >
                  + Add new address
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-gray-700 uppercase">
            Payment Method
          </p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2 text-gray-600 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-200 mb-4" />

        {/* Price Details */}
        <div className="text-gray-600 text-sm space-y-2">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {getCartAmount() * 2 / 100}
            </span>
          </p>
          <p className="flex justify-between text-base font-semibold mt-3">
            <span>Total</span>
            <span>
              {currency}
              {getCartAmount() + getCartAmount() * 2 / 100}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Pay Now"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
