import { useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import toast from "react-hot-toast";
import { User, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const { isSigningUp, signup } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gray-900 text-center">
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-4">
          🌐 Your First Step Towards Cyber Justice
        </h2>
        <p className="text-lg text-gray-400 max-w-md">
          Take action against online threats. File your complaint securely and
          get support from cyber crime experts.
        </p>
        <p className="mt-4 text-sm text-gray-500">Start your journey today!</p>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-cyan-400">
              Create Your Account
            </h1>
            <p className="text-gray-400">Join us and stay protected</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                placeholder="Your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
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
              type="submit"
              className={`w-full bg-cyan-400 text-black font-semibold py-3 rounded-lg hover:bg-cyan-300 transition ${
                isSigningUp ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                  Signing Up...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;