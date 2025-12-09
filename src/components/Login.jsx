import React from "react";
import { UseAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = ({ setShowUserLogin }) => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => setShowUserLogin(false);
  const {setUser,axios,fetchUser}=UseAppContext();

  const handleGoogleLogin = async () => {
    // In production, integrate with Google OAuth
    // For now, this is a placeholder
    toast.error("Google login integration pending. Please use email/password.");
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      if(state === "register"){
        const {data} = await axios.post('/api/user/register',{name,email,password});
        if(data.success){
          setUser(data.user);
          toast.success("Account created successfully!");
          setShowUserLogin(false);
        }
      } else {
        const {data} = await axios.post('/api/user/login',{email,password});
        if(data.success){
          setUser(data.user);
          toast.success("Logged in successfully!");
          setShowUserLogin(false);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-4 animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto">
        {/* Background Blur Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl"></div>
        
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 sm:gap-6 p-5 sm:p-6 md:p-8 lg:p-10 text-gray-700 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/50">
          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 z-10"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center mb-3 sm:mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg">
              <span className="text-3xl">🛒</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {state === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
              {state === "login" ? "Login to continue shopping" : "Join us for the best deals"}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 sm:space-y-4">
            {state === "register" && (
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Full Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Enter your name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-green-500 focus:ring-2 sm:focus:ring-4 focus:ring-green-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                  type="text"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-green-500 focus:ring-2 sm:focus:ring-4 focus:ring-green-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                type="email"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-green-500 focus:ring-2 sm:focus:ring-4 focus:ring-green-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                type="password"
                required
              />
            </div>
          </div>

          {/* Social Login */}
          {state === "login" && (
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-center text-gray-500 mb-3">OR</p>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          )}

          {/* Toggle Login/Register */}
          <div className="text-center">
            {state === "register" ? (
              <p className="text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setState("login")}
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  Login here
                </button>
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setState("register")}
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  Sign up here
                </button>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              state === "register" ? "Create Account" : "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
