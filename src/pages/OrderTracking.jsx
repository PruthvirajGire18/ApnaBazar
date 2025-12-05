import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UseAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const OrderTracking = () => {
  const { trackingNumber } = useParams();
  const { axios, currency, navigate } = UseAppContext();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [trackingNumber]);

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(`/api/order/track/${trackingNumber}`);
      if (data.success) {
        setOrder(data.order);
      } else {
        toast.error('Order not found');
        navigate('/my-orders');
      }
    } catch (error) {
      toast.error('Error fetching order details');
      navigate('/my-orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Order Placed': 'bg-blue-100 text-blue-700',
      'Confirmed': 'bg-purple-100 text-purple-700',
      'Preparing': 'bg-yellow-100 text-yellow-700',
      'Out for Delivery': 'bg-orange-100 text-orange-700',
      'Delivered': 'bg-green-100 text-green-700',
      'Cancelled': 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status, currentStatus) => {
    const isActive = getStatusIndex(status) <= getStatusIndex(currentStatus);
    const isCurrent = status === currentStatus;
    
    if (isCurrent) {
      return (
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
          ✓
        </div>
      );
    } else if (isActive) {
      return (
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
          ✓
        </div>
      );
    } else {
      return (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold">
          ○
        </div>
      );
    }
  };

  const getStatusIndex = (status) => {
    const statuses = ['Order Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
    return statuses.indexOf(status);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const statuses = ['Order Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-4 sm:py-6 md:py-8 lg:py-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/my-orders')}
            className="mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-green-600 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Orders
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
            Order Tracking
          </h1>
          <p className="text-sm sm:text-base text-gray-600 break-all">Tracking Number: <span className="font-semibold font-mono">{order.trackingNumber}</span></p>
        </div>

        {/* Order Status Card */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-5 md:p-6 lg:p-8 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Order Status</h2>
              <span className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm text-gray-500">Order Date</p>
              <p className="font-semibold text-gray-800">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-8">
              {statuses.map((status, index) => (
                <div key={status} className="relative flex items-start gap-4">
                  {getStatusIcon(status, order.status)}
                  <div className="flex-1 pt-2">
                    <p className={`font-semibold ${getStatusIndex(status) <= getStatusIndex(order.status) ? 'text-gray-800' : 'text-gray-400'}`}>
                      {status}
                    </p>
                    {order.statusHistory && order.statusHistory.find(h => h.status === status) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(order.statusHistory.find(h => h.status === status).timestamp).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {order.estimatedDelivery && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600">Estimated Delivery</p>
              <p className="font-semibold text-green-700">
                {new Date(order.estimatedDelivery).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </p>
            </div>
          )}
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h2>
          
          {/* Items */}
          <div className="space-y-4 mb-6">
            {order.items && order.items.length > 0 ? (
              order.items.map((item, index) => {
                const product = item.product;
                if (!product) {
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">N/A</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">Product not found</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                      </div>
                    </div>
                  );
                }
                
                const productPrice = product.offerPrice || product.price || 0;
                const quantity = item.quantity || 1;
                const totalPrice = (productPrice * quantity).toFixed(2);
                
                // Handle both images array and image array formats
                let productImage = null;
                if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                  productImage = product.images[0];
                } else if (product.image && Array.isArray(product.image) && product.image.length > 0) {
                  productImage = product.image[0];
                } else if (typeof product.images === 'string') {
                  productImage = product.images;
                } else if (typeof product.image === 'string') {
                  productImage = product.image;
                }
                
                return (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 border border-gray-300">
                      {productImage ? (
                        <img
                          src={productImage}
                          alt={product.name || 'Product'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs p-2">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800">{product.name || 'Product'}</p>
                      <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                      {product.category && (
                        <p className="text-xs text-gray-400 capitalize mt-1">{product.category}</p>
                      )}
                    </div>
                    <p className="font-bold text-green-600 whitespace-nowrap">
                      {currency}{totalPrice}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No items found in this order</p>
            )}
          </div>

          {/* Address */}
          {order.address && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Delivery Address</h3>
              <div className="text-gray-600 space-y-1">
                {(order.address.firstName || order.address.lastName) && (
                  <p className="font-medium text-gray-800">
                    {order.address.firstName || ''} {order.address.lastName || ''}
                  </p>
                )}
                <p>
                  {[
                    order.address.street,
                    order.address.city,
                    order.address.state,
                    order.address.country
                  ].filter(Boolean).join(', ')}
                  {(order.address.zipCode || order.address.zipcode) && ` - ${order.address.zipCode || order.address.zipcode}`}
                </p>
                {order.address.phone && (
                  <p className="text-sm">Phone: {order.address.phone}</p>
                )}
                {order.address.email && (
                  <p className="text-sm">Email: {order.address.email}</p>
                )}
              </div>
            </div>
          )}

          {/* Price Summary */}
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">{currency}{(order.subtotal || order.amount || 0).toFixed(2)}</span>
              </div>
              {(order.discount || 0) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-semibold">-{currency}{(order.discount || 0).toFixed(2)}</span>
                </div>
              )}
              {(order.deliveryFee || 0) > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">{currency}{(order.deliveryFee || 0).toFixed(2)}</span>
                </div>
              )}
              {(order.tax || 0) > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold">{currency}{(order.tax || 0).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  {currency}{(order.amount || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;

