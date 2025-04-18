import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore.js";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(formData);
    } catch (error) {
      console.log("Error in handleSubmit");
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                <MessageSquare className="w-6 h-6 text-cyan-400" />
              </div>
              <h1 className="text-3xl font-extrabold mt-2 text-cyan-400">
                Welcome Back
              </h1>
              <p className="text-gray-400">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              className={`w-full bg-cyan-400 text-black font-semibold py-3 rounded-lg hover:bg-cyan-300 transition ${
                isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                  Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Create Account */}
          <div className="text-center">
            <p className="text-gray-500">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-cyan-400 hover:text-cyan-300">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Info Section */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gray-900 text-center">
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-4">
          Welcome Back!
        </h2>
        <p className="text-lg text-gray-400 max-w-md">
          Login to protect yourself from online fraud, harassment, and security
          breaches. Your safety starts here.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Glad to have you back!
        </p>
      </div>
    </div>
  );
};

export default LoginPage;