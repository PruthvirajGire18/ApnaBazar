import React, { useState, useEffect } from 'react';
import { UseAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const LocationSelector = () => {
  const { navigate } = UseAppContext();
  const [location, setLocation] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('deliveryLocation');
    if (saved) {
      setLocation(JSON.parse(saved));
    }
    
    const savedLocs = localStorage.getItem('savedLocations');
    if (savedLocs) {
      setSavedLocations(JSON.parse(savedLocs));
    }
  }, []);

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In real app, reverse geocode to get address
          const detectedLocation = {
            address: 'Current Location',
            lat: latitude,
            lng: longitude,
            area: 'Detected Area'
          };
          setLocation(detectedLocation);
          localStorage.setItem('deliveryLocation', JSON.stringify(detectedLocation));
          toast.success('Location detected!');
          setShowModal(false);
        },
        (error) => {
          toast.error('Could not detect location. Please enter manually.');
        }
      );
    } else {
      toast.error('Geolocation not supported');
    }
  };

  const saveLocation = () => {
    if (!location || !location.address) {
      toast.error('Please enter a location');
      return;
    }
    localStorage.setItem('deliveryLocation', JSON.stringify(location));
    toast.success('Location saved!');
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white rounded-lg border border-gray-200 hover:border-green-500 transition-colors shadow-sm"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[120px] sm:max-w-none">
          {location?.address || 'Select Location'}
        </span>
        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-5 md:p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Select Delivery Location</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={detectLocation}
                className="w-full flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Use Current Location</p>
                  <p className="text-sm text-gray-500">Detect automatically</p>
                </div>
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter Address</label>
                <input
                  type="text"
                  value={location?.address || ''}
                  onChange={(e) => setLocation({ ...location, address: e.target.value })}
                  placeholder="Enter your delivery address"
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-500/10 outline-none"
                />
              </div>

              {savedLocations.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Saved Locations</p>
                  <div className="space-y-2">
                    {savedLocations.map((loc, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setLocation(loc);
                          saveLocation();
                        }}
                        className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <p className="font-medium text-gray-800">{loc.address}</p>
                        <p className="text-sm text-gray-500">{loc.area}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={saveLocation}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationSelector;

