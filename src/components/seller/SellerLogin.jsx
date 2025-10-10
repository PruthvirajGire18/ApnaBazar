import React, { useEffect, useState } from "react";
import { UseAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const SellerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { navigate, isSeller, setIsSeller,axios } = UseAppContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // Backend API call for seller login
        try {
            console.log('Seller login payload:', { email, password });
            const { data } = await axios.post('/api/seller/login', { email, password });
            if (data.success) {
                setIsSeller(true);
                toast.success("Seller Login Successfully");
                navigate('/seller');
            } else {
                toast.error(data?.message || 'Login failed');
            }
        } catch (error) {
            console.error('Seller login error:', error);
            const serverMessage = error?.response?.data?.message;
            if (serverMessage) toast.error(serverMessage);
            else toast.error(error.message || 'Login failed');
        }
    };

    useEffect(() => {
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller]);

   

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
