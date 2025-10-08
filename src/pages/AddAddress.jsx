import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    landmark: "",
    addressType: "Home",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    for (const key in formData) {
      if (formData[key] === "") {
        alert("Please fill all fields");
        return;
      }
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Save locally or send to backend
    localStorage.setItem("userAddress", JSON.stringify(formData));

    alert("Address added successfully ✅");
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4 font-[Inter]">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-green-700 mb-6 text-center">
          🏠 Add Delivery Address
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Address Fields */}
          <input
            type="text"
            name="house"
            value={formData.house}
            onChange={handleChange}
            placeholder="Flat / House No."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street / Area / Colony"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="Nearby Landmark (Optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Address Type */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Address Type
            </label>
            <div className="flex gap-3">
              {["Home", "Work", "Other"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer ${
                    formData.addressType === type
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="addressType"
                    value={type}
                    checked={formData.addressType === type}
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Save Address
          </button>

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition duration-200"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
