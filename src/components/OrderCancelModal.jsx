import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { UseAppContext } from '../context/AppContext';

const OrderCancelModal = ({ order, isOpen, onClose, onCancelSuccess }) => {
  const { axios } = UseAppContext();
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const cancellationReasons = [
    'Changed my mind',
    'Found better price elsewhere',
    'Delivery time too long',
    'Product no longer needed',
    'Other'
  ];

  const handleCancel = async () => {
    if (!reason.trim()) {
      toast.error('Please select a cancellation reason');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post('/api/order/cancel', {
        orderId: order._id,
        reason
      });

      if (data.success) {
        toast.success('Order cancelled successfully');
        onCancelSuccess();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error cancelling order');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Cancel Order</h2>
        <p className="text-gray-600 mb-4">
          Order ID: <span className="font-mono text-sm">{String(order._id).slice(-8)}</span>
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Cancellation
          </label>
          <div className="space-y-2">
            {cancellationReasons.map((r) => (
              <label key={r} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="radio"
                  name="reason"
                  value={r}
                  checked={reason === r}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-4 h-4 text-green-600"
                />
                <span className="text-sm text-gray-700">{r}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleCancel}
            disabled={loading || !reason}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cancelling...' : 'Cancel Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCancelModal;

