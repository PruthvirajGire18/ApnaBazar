import React, { useEffect, useState } from "react";
import { UseAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import DeliverySlots from "../components/DeliverySlots";

const Cart = () => {
  const {
    products,
    navigate,
    currency,
    cartItems,
    removeFromCart,
    addToCart,
    getCartCount,
    updateCartItem,
    getCartAmount,
    axios,
    user,
    setcartItems,
    fetchUser
  } = UseAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState("");
  const [isExpressDelivery, setIsExpressDelivery] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if(product){
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  const fetchAddresses = async () => {
    try {
      const {data} = await axios.get('/api/address/get');
      if(data.success && data.addresses.length > 0){
        setAddresses(data.addresses);
        setSelectedAddress(data.addresses[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const applyCoupon = async () => {
    if(!couponCode.trim()){
      toast.error("Please enter a coupon code");
      return;
    }
    if(!user){
      toast.error("Please login to apply coupon");
      return;
    }
    try {
      const orderValue = getCartAmount();
      const {data} = await axios.post('/api/coupon/apply', {
        code: couponCode,
        orderValue
      });
      if(data.success){
        setAppliedCoupon(data.coupon);
        setDiscount(data.discount);
        toast.success(`Coupon applied! Discount: ${currency}${data.discount.toFixed(2)}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  const calculateDeliveryFee = () => {
    const subtotal = getCartAmount();
    if(subtotal >= 500 && !isExpressDelivery) return 0;
    return isExpressDelivery ? 50 : 30;
  };

  const calculateTotal = () => {
    const subtotal = getCartAmount();
    const tax = subtotal * 0.02;
    const deliveryFee = calculateDeliveryFee();
    return subtotal + tax + deliveryFee - discount;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async () => {
    if(!user){
      toast.error("Please login to place order");
      return;
    }
    if(!selectedAddress){
      toast.error("Please select an address");
      return;
    }
    if(cartArray.length === 0){
      toast.error("Cart is empty");
      return;
    }
    if(isExpressDelivery && !deliveryTimeSlot){
      toast.error("Please select a delivery time slot for express delivery");
      return;
    }

    setLoading(true);
    try {
      const items = cartArray.map(item => ({
        product: item._id,
        quantity: item.quantity
      }));

      // Create Razorpay order
      const {data: orderData} = await axios.post('/api/payment/create-order', {
        items,
        address: selectedAddress._id,
        deliveryTimeSlot: isExpressDelivery ? deliveryTimeSlot : null,
        isExpressDelivery,
        couponCode: appliedCoupon?.code || null,
        discount
      });

      if(!orderData.success){
        throw new Error('Failed to create payment order');
      }

      // Load Razorpay script
      const razorpayLoaded = await loadRazorpayScript();
      if(!razorpayLoaded){
        toast.error("Failed to load payment gateway");
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ApnaBazaar',
        description: 'Order Payment',
        order_id: orderData.orderId,
        handler: async function(response) {
          try {
            // Verify payment
            const {data: verifyData} = await axios.post('/api/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items,
              address: selectedAddress._id,
              deliveryTimeSlot: isExpressDelivery ? deliveryTimeSlot : null,
              isExpressDelivery,
              couponCode: appliedCoupon?.code || null,
              discount
            });

            if(verifyData.success){
              toast.success("Order placed successfully!");
              setcartItems({});
              setAppliedCoupon(null);
              setDiscount(0);
              navigate('/my-orders');
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error(error.response?.data?.message || "Payment verification failed");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: user.name || '',
          email: user.email || '',
          contact: user.phone || ''
        },
        theme: {
          color: '#10b981'
        },
        modal: {
          ondismiss: function(){
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      razorpay.on('payment.failed', function(response){
        toast.error("Payment failed. Please try again.");
        setLoading(false);
      });

    } catch (error) {
      console.error('Payment initiation error:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Error initiating payment";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    if(paymentOption === "Online"){
      await handleOnlinePayment();
      return;
    }

    if(!user){
      toast.error("Please login to place order");
      return;
    }
    if(!selectedAddress){
      toast.error("Please select an address");
      return;
    }
    if(cartArray.length === 0){
      toast.error("Cart is empty");
      return;
    }
    if(isExpressDelivery && !deliveryTimeSlot){
      toast.error("Please select a delivery time slot for express delivery");
      return;
    }
    setLoading(true);
    try {
      const items = cartArray.map(item => ({
        product: item._id,
        quantity: item.quantity
      }));
      const {data} = await axios.post('/api/order/cod', {
        items,
        address: selectedAddress._id,
        deliveryTimeSlot: isExpressDelivery ? deliveryTimeSlot : null,
        isExpressDelivery,
        couponCode: appliedCoupon?.code || null,
        discount
      });
      if(data.success){
        toast.success("Order placed successfully!");
        setcartItems({});
        setAppliedCoupon(null);
        setDiscount(0);
        navigate('/my-orders');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Error placing order";
      toast.error(errorMessage);
      // Log full error for debugging
      if(error.response?.data?.details){
        console.error('Error details:', error.response.data.details);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [cartItems, products]);

  useEffect(() => {
    if(user){
      fetchAddresses();
    }
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-4 sm:py-6 md:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Section - Cart Items */}
          <div className="flex-1 lg:max-w-3xl">

            {cartArray.length > 0 ? (
              <div className="space-y-4">
                {cartArray.map((product, index) => (
                    <div
                      key={index}
                      className="group bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 p-3 sm:p-4 md:p-6 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {/* Product Image */}
                        <div
                          onClick={() => {
                            navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                            scrollTo(0, 0);
                          }}
                          className="cursor-pointer w-full sm:w-24 md:w-32 h-24 sm:h-28 md:h-32 rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 group-hover:border-green-300 transition-all flex-shrink-0"
                        >
                          <img
                            src={product.images?.[0] || product.image?.[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 min-w-0">
                          <div className="flex-1 min-w-0">
                            <h3 
                              onClick={() => {
                                navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                scrollTo(0, 0);
                              }}
                              className="font-bold text-base sm:text-lg text-gray-800 hover:text-green-600 cursor-pointer transition-colors mb-1 sm:mb-2 line-clamp-2"
                            >
                              {product.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 capitalize">
                              {product.category}
                            </p>
                            
                            {/* Quantity Control */}
                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                              <span className="text-xs sm:text-sm font-medium text-gray-700">Qty:</span>
                              <div className="flex items-center gap-1 sm:gap-2 bg-gray-50 rounded-lg border border-gray-200">
                                <button
                                  onClick={() => removeFromCart(product._id)}
                                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-l-lg transition-all font-bold text-sm sm:text-base"
                                >
                                  −
                                </button>
                                <span className="w-8 sm:w-12 text-center font-semibold text-gray-800 text-sm sm:text-base">
                                  {cartItems[product._id]}
                                </span>
                                <button
                                  onClick={() => addToCart(product._id)}
                                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-r-lg transition-all font-bold text-sm sm:text-base"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Price & Remove */}
                          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-2 sm:gap-0">
                            <div className="text-left sm:text-right">
                              <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                                {currency}{(product.offerPrice * product.quantity).toFixed(2)}
                              </p>
                              {product.offerPrice < product.price && (
                                <p className="text-xs sm:text-sm text-gray-400 line-through">
                                  {currency}{(product.price * product.quantity).toFixed(2)}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                const newCart = {...cartItems};
                                delete newCart[product._id];
                                setcartItems(newCart);
                                toast.success("Removed From Cart");
                              }}
                              className="text-red-500 hover:text-red-600 text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors"
                            >
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</p>
                <p className="text-gray-500 mb-6">Add some products to get started!</p>
                <button
                  onClick={() => navigate('/products')}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Start Shopping
                </button>
              </div>
            )}

            {cartArray.length > 0 && (
              <button
                onClick={() => {
                  navigate(`/products`);
                  scrollTo(0, 0);
                }}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </button>
            )}
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:w-96 w-full">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-5 md:p-6 sticky top-20 md:top-24">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-4 sm:mb-6">
                Order Summary
              </h2>

              {/* Address Section */}
              <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm font-bold text-gray-700 uppercase">Delivery Address</p>
                </div>
                <div className="relative">
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    {selectedAddress
                      ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                      : addresses.length === 0 
                      ? "No address found. Please add an address."
                      : "Please select an address"}
                  </p>
                  {addresses.length > 0 && (
                    <button
                      onClick={() => setShowAddress(!showAddress)}
                      className="text-green-600 text-sm font-semibold hover:text-green-700 transition-colors"
                    >
                      {showAddress ? 'Hide' : 'Change'}
                    </button>
                  )}
                  {showAddress && addresses.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                      {addresses.map((addr) => (
                        <div
                          key={addr._id}
                          onClick={() => {
                            setSelectedAddress(addr);
                            setShowAddress(false);
                          }}
                          className="p-4 border-b border-gray-100 hover:bg-green-50 cursor-pointer transition-colors"
                        >
                          <p className="text-sm font-medium text-gray-800">
                            {`${addr.street}, ${addr.city}, ${addr.state}, ${addr.country}`}
                          </p>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          navigate("/add-address");
                          setShowAddress(false);
                        }}
                        className="w-full p-3 text-green-600 font-semibold hover:bg-green-50 transition-colors text-center border-t border-gray-100"
                      >
                        + Add new address
                      </button>
                    </div>
                  )}
                  {addresses.length === 0 && (
                    <button
                      onClick={() => navigate("/add-address")}
                      className="text-green-600 text-sm font-semibold hover:text-green-700 transition-colors"
                    >
                      + Add address
                    </button>
                  )}
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-6">
                {!appliedCoupon ? (
                  <div>
                    {!showCouponInput ? (
                      <button
                        onClick={() => setShowCouponInput(true)}
                        className="w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200"
                      >
                        + Apply Coupon
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Enter coupon code"
                          className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none"
                        />
                        <button
                          onClick={applyCoupon}
                          className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                        >
                          Apply
                        </button>
                        <button
                          onClick={() => {
                            setShowCouponInput(false);
                            setCouponCode("");
                          }}
                          className="px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-green-700">{appliedCoupon.code}</p>
                      <p className="text-xs text-green-600">{appliedCoupon.description || 'Coupon applied'}</p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Delivery Options */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase">Delivery Options</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-400 transition-colors">
                    <input
                      type="checkbox"
                      checked={isExpressDelivery}
                      onChange={(e) => {
                        setIsExpressDelivery(e.target.checked);
                        if(!e.target.checked) setDeliveryTimeSlot("");
                      }}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Express Delivery</p>
                      <p className="text-xs text-gray-500">Get your order in 2 hours - {currency}50</p>
                    </div>
                  </label>
                  {isExpressDelivery && (
                    <div className="ml-8 mt-4">
                      <DeliverySlots 
                        isExpressDelivery={isExpressDelivery}
                        onSelectSlot={(slot) => setDeliveryTimeSlot(slot)}
                      />
                    </div>
                  )}
                  {!isExpressDelivery && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Standard Delivery: Next day delivery - {getCartAmount() >= 500 ? 'FREE' : `${currency}30`}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Payment Method</label>
                <select
                  onChange={(e) => setPaymentOption(e.target.value)}
                  value={paymentOption}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all bg-white"
                >
                  <option value="COD">Cash On Delivery</option>
                  <option value="Online">Online Payment</option>
                </select>
              </div>

              <div className="border-t-2 border-gray-200 pt-4 mb-6">
                {/* Price Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">{currency}{getCartAmount().toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">-{currency}{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">
                      {calculateDeliveryFee() === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `${currency}${calculateDeliveryFee().toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (2%)</span>
                    <span className="font-semibold">{currency}{(getCartAmount() * 0.02).toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                    {currency}{calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={loading || !selectedAddress || cartArray.length === 0 || !user || (isExpressDelivery && !deliveryTimeSlot)}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Placing Order...
                  </span>
                ) : (
                  paymentOption === "COD" ? `Place Order - ${currency}${calculateTotal().toFixed(2)}` : `Pay Now - ${currency}${calculateTotal().toFixed(2)}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
