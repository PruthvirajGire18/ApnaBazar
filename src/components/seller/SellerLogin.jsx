import React, { useEffect, useState } from "react";
import { UseAppContext } from "../../context/AppContext";

const SellerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { navigate, isSeller, setIsSeller, } = UseAppContext();

    useEffect(() => {
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // Backend API call for seller login will go here
       setIsSeller(true);
    };

    return !isSeller &&(
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
                    Seller Login
                </h1>

                <form onSubmit={onSubmitHandler} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="seller@example.com"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="********"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerLogin;
