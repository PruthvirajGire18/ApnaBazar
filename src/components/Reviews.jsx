import React, { useEffect, useState } from 'react';
import { UseAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';

const Reviews = ({ productId }) => {
  const { user, axios, currency } = UseAppContext();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/review/product/${productId}`);
      if (data.success) {
        setReviews(data.reviews || []);
        setAverageRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitReview = async () => {
    if (!user) {
      toast.error('Please login to add a review');
      return;
    }
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post('/api/review/add', {
        productId,
        rating,
        comment
      });
      if (data.success) {
        toast.success('Review added successfully!');
        setShowReviewForm(false);
        setComment('');
        setRating(5);
        fetchReviews();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 sm:mt-12 border-t border-gray-200 pt-6 sm:pt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center">
              {Array(5).fill('').map((_, i) => (
                <img
                  key={i}
                  src={i < Math.round(averageRating) ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              ))}
            </div>
            <span className="text-sm sm:text-base text-gray-600 ml-2">
              {averageRating.toFixed(1)} ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>
        {user && !showReviewForm && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm sm:text-base"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-6 sm:mb-8 p-4 sm:p-5 md:p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Write Your Review</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-1 sm:gap-2">
                {Array(5).fill('').map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className="focus:outline-none"
                  >
                    <img
                      src={i < rating ? assets.star_icon : assets.star_dull_icon}
                      alt="star"
                      className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer hover:scale-110 transition-transform"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full border-2 border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none resize-none"
                rows="4"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={submitReview}
                disabled={loading}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 text-sm sm:text-base"
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                onClick={() => {
                  setShowReviewForm(false);
                  setComment('');
                  setRating(5);
                }}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4 sm:space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="p-4 sm:p-5 md:p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-3">
                <div className="flex-1">
                  <p className="font-semibold text-sm sm:text-base text-gray-800">{review.userId?.name || 'Anonymous'}</p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center">
                  {Array(5).fill('').map((_, i) => (
                    <img
                      key={i}
                      src={i < review.rating ? assets.star_icon : assets.star_dull_icon}
                      alt="star"
                      className="w-3 h-3 sm:w-4 sm:h-4"
                    />
                  ))}
                </div>
              </div>
              {review.comment && (
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{review.comment}</p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;

