import { Button, Card } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import React, { useState } from 'react';

// ✅ Moved CustomInput outside Login
const CustomInput = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) => (
  <div className="space-y-2">
    <label className="text-sm text-gray-700 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`
        w-full px-4 py-3 bg-input-background rounded-lg border-2 transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
        ${error
          ? 'border-red-300 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'}
      `}
    />
    {error && (
      <p className="text-red-500 text-sm mt-1">{error}</p>
    )}
  </div>
);

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const errors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login form submitted", formData);
    }
  };

  const handleGitHubLogin = () => {
    console.log("GitHub login clicked");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-br from-purple-400/25 to-pink-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-blue-400/25 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 animate-slide-down">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3">
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-wide">
                BHARATGIG
              </h1>
              <p className="text-xs text-gray-600">Welcome Back</p>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 flex items-center justify-center px-6 py-8 animate-fade-in-up">
          <div className="w-full max-w-md animate-scale-in">
            <Card className="p-8 shadow-2xl bg-white/95 backdrop-blur-lg border border-white/50 rounded-3xl">
              <div className="space-y-6">
                <div className="text-center mb-8 animate-fade-in">
                  <h5 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2  ">
                    Login
                  </h5>
                
                  <p className="text-sm text-gray-600">Access your account and continue your journey</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 animate-fade-in delay-200">
                  <CustomInput
                    label="Email ID"
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    error={formErrors.email}
                    placeholder="Enter your email address"
                    type="email"
                  />

                  <CustomInput
                    label="Password"
                    value={formData.password}
                    onChange={(value) => handleInputChange('password', value)}
                    error={formErrors.password}
                    placeholder="Enter your password"
                    type="password"
                  />

                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600
                               hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25
                               hover:-translate-y-0.5 transition-all duration-300 ease-out flex items-center justify-center gap-2 group"
                  >
                    Login
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-8 animate-fade-in delay-300">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-6 bg-white text-gray-500 font-medium">or continue with</span>
                  </div>
                </div>

                {/* Social logins */}
                <div className="space-y-4 animate-fade-in delay-500">
                  <button
                    type="button"
                    onClick={handleGitHubLogin}
                    className="w-full py-3 px-6 rounded-xl border-2 border-gray-200 bg-white
                               hover:bg-gray-50 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5
                               text-gray-700 font-medium transition-all duration-300 ease-out
                               flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/5 to-gray-600/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    <GitHubIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="relative">Continue with GitHub</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-3 px-6 rounded-xl border-2 border-gray-200 bg-white
                               hover:bg-gray-50 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5
                               text-gray-700 font-medium transition-all duration-300 ease-out
                               flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-red-500/5 to-yellow-500/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    <GoogleIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="relative">Continue with Google</span>
                  </button>
                </div>

                {/* Signup link */}
                <div className="text-center pt-6 animate-fade-in delay-500">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors duration-200"
                    >
                      Create account
                    </button>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px) scale(1);} 50% { transform: translateY(-20px) scale(1.02);} }
        @keyframes float-delayed { 0%, 100% { transform: translateY(0px) rotate(0deg) scale(1);} 50% { transform: translateY(-30px) rotate(5deg) scale(1.03);} }
        @keyframes float-slow { 0%, 100% { transform: translateX(0px) translateY(0px);} 50% { transform: translateX(-15px) translateY(-25px);} }
        @keyframes fade-in { 0% { opacity: 0;} 100% { opacity: 1;} }
        @keyframes slide-in { 0% { transform: translateX(-20px); opacity: 0;} 100% { transform: translateX(0); opacity: 1;} }
        @keyframes slide-down { 0% { transform: translateY(-20px); opacity: 0;} 100% { transform: translateY(0); opacity: 1;} }
        @keyframes fade-in-up { 0% { transform: translateY(30px); opacity: 0;} 100% { transform: translateY(0); opacity: 1;} }
        @keyframes scale-in { 0% { transform: scale(0.95); opacity: 0;} 100% { transform: scale(1); opacity: 1;} }
        @keyframes shimmer { 0% { transform: translateX(-100%);} 100% { transform: translateX(100%);} }
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0px);} 50% { transform: translateY(-2px);} }
        .animate-float { animation: float 6s ease-in-out infinite;}
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite;}
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite;}
        .animate-fade-in { animation: fade-in 0.6s ease-out;}
        .animate-slide-in { animation: slide-in 0.5s ease-out;}
        .animate-slide-down { animation: slide-down 0.4s ease-out;}
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out;}
        .animate-scale-in { animation: scale-in 0.4s ease-out;}
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite;}
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite;}
        .delay-200 { animation-delay: 0.2s;}
        .delay-300 { animation-delay: 0.3s;}
        .delay-500 { animation-delay: 0.5s;}
      `}</style>
    </div>
  );
};

export default Login;
