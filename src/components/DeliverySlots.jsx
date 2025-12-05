import React, { useState, useEffect } from 'react';

const DeliverySlots = ({ isExpressDelivery, onSelectSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    generateSlots();
  }, [isExpressDelivery]);

  const generateSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();

    if (isExpressDelivery) {
      // Express delivery: next 2 hours in 30-minute slots
      for (let i = 1; i <= 4; i++) {
        const slotTime = new Date(now.getTime() + i * 30 * 60000);
        const hours = slotTime.getHours();
        const minutes = slotTime.getMinutes();
        const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        slots.push({
          time: timeString,
          display: `${timeString} - ${String((hours + 1) % 24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
          available: true
        });
      }
    } else {
      // Standard delivery: tomorrow and day after in 2-hour slots
      for (let day = 1; day <= 2; day++) {
        for (let hour = 9; hour <= 20; hour += 2) {
          const slotTime = new Date(now);
          slotTime.setDate(slotTime.getDate() + day);
          slotTime.setHours(hour, 0, 0, 0);
          
          const timeString = `${String(hour).padStart(2, '0')}:00`;
          const endHour = (hour + 2) % 24;
          const dayLabel = day === 1 ? 'Tomorrow' : slotTime.toLocaleDateString('en-US', { weekday: 'short' });
          
          slots.push({
            time: timeString,
            display: `${dayLabel}, ${timeString} - ${String(endHour).padStart(2, '0')}:00`,
            date: slotTime,
            available: true
          });
        }
      }
    }

    setAvailableSlots(slots);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot.time);
    if (onSelectSlot) {
      onSelectSlot(slot.time);
    }
  };

  return (
    <div className="space-y-2 sm:space-y-3">
      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
        {isExpressDelivery ? 'Select Express Delivery Time' : 'Select Delivery Slot'}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
        {availableSlots.map((slot, index) => (
          <button
            key={index}
            onClick={() => handleSlotSelect(slot)}
            className={`p-2.5 sm:p-3 rounded-lg border-2 transition-all text-xs sm:text-sm font-medium ${
              selectedSlot === slot.time
                ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                : 'border-gray-200 hover:border-green-300 bg-white text-gray-700'
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              {selectedSlot === slot.time && (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              <span className="break-words">{slot.display}</span>
            </div>
            {isExpressDelivery && (
              <span className="text-xs text-red-600 font-semibold mt-1 block">⚡ Express</span>
            )}
          </button>
        ))}
      </div>
      {selectedSlot && (
        <div className="mt-2 sm:mt-3 p-2.5 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs sm:text-sm text-green-700">
            <span className="font-semibold">Selected:</span> {availableSlots.find(s => s.time === selectedSlot)?.display}
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliverySlots;

