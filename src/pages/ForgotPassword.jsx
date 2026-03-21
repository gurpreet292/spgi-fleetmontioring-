import { useState } from "react";
import { FaCheck, FaArrowLeft, FaLock, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/spgi-logo.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null); // null, 'change', 'reset'
  const [modePulseKey, setModePulseKey] = useState(0);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleModeSelect = (nextMode) => {
    setMode(nextMode);
    setError("");
    setModePulseKey((prev) => prev + 1);
  };

  // Change Password Handler
  const handleChangeSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users[0];

    if (!currentUser) {
      setError("No user found. Please login first.");
      navigate("/login");
      return;
    }

    if (currentUser.password !== currentPassword) {
      setError("Current password is incorrect");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const updatedUsers = users.map((user) =>
      user.email === currentUser.email
        ? { ...user, password: newPassword }
        : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setShowSuccess(true);
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  // Reset Password Handler
  const handleResetSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((user) => user.email === email);

    if (!userExists) {
      setError("Email not found in our records");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, password: newPassword } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setShowSuccess(true);
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-white text-gray-800 relative overflow-hidden page-open-animate"
      style={{
        backgroundImage: `linear-gradient(135deg, #ecfdf5 0%, #d1fae5 36%, #a7f3d0 68%, #6ee7b7 100%)`,
        backgroundSize: "400% 400%",
        animation: "gradientFlow 16s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          25% { background-position: 50% 100%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 0%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes cardReveal {
          0% { opacity: 0; transform: scale(0.92) translateY(14px); }
          60% { opacity: 1; transform: scale(1.02) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes circlePulseOnce {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
          35% { opacity: 0.38; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.22); }
        }
      `}</style>

      {/* Animated Light Orbs */}
      <div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(110, 231, 183, 0.34), transparent)",
          animation: "shimmer 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(22, 101, 52, 0.26), transparent)",
          animation: "shimmer 5s ease-in-out infinite 1s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.22), transparent)",
          animation: "shimmer 6s ease-in-out infinite 2s",
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-emerald-200/80 z-0"
        style={{
          animation: "circlePulseOnce 1.1s ease-out 1",
        }}
      />

      <div
        className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-0 border border-white/70 relative z-10 overflow-hidden mx-4"
        style={{ animation: "cardReveal 0.75s cubic-bezier(0.2, 0.7, 0.2, 1) 1" }}
      >
        {/* Company Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 md:p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <img src={logo} alt="Shree Pankaj Green Innovation" className="h-8 md:h-10 w-auto object-contain" />
          </div>
          <p className="text-white text-opacity-90 text-xs font-medium tracking-widest">
            SECURE ACCOUNT RECOVERY
          </p>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 relative overflow-hidden">

          {mode !== null && (
            <div
              key={`mode-circle-${mode}-${modePulseKey}`}
              className="absolute top-1/2 left-1/2 w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full border border-emerald-300/70 pointer-events-none"
              style={{
                animation: "circlePulseOnce 0.95s ease-out 1",
              }}
            />
          )}

          {mode === null ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-100 p-4 rounded-full">
                  <FaShieldAlt className="text-3xl text-emerald-600" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-2">Account Security</h1>
              <p className="text-center text-xs md:text-sm text-slate-600 mb-8">
                Choose how you would like to update your password
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => handleModeSelect("change")}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-600 text-slate-800 font-semibold py-4 rounded-lg transition-all text-left pl-5"
                >
                  <div className="font-bold text-emerald-700">Change Password (if you remember it)</div>
                </button>

                <button
                  onClick={() => handleModeSelect("reset")}
                  className="w-full bg-red-50 hover:bg-red-100 border-2 border-red-600 text-slate-800 font-semibold py-4 rounded-lg transition-all text-left pl-5"
                >
                  <div className="font-bold text-red-700">Reset Password (if you forgot it)</div>
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full flex items-center justify-center gap-2 text-slate-600 hover:text-slate-800 transition-all pt-4"
                >
                  <FaArrowLeft className="text-sm" />
                  Back to Login
                </button>
              </div>
            </>
          ) : mode === "change" ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-100 p-4 rounded-full">
                  <FaLock className="text-3xl text-emerald-600" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-2">Change Password</h1>
              <p className="text-center text-xs md:text-sm text-slate-600 mb-8">
                Keep your account secure with a strong password
              </p>

              <form onSubmit={handleChangeSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full bg-white/70 border border-slate-300 rounded-lg px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 md:right-4 top-2 md:top-3 text-slate-500 hover:text-slate-700 text-xs font-medium"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full bg-white/70 border border-slate-300 rounded-lg px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full bg-white/70 border border-slate-300 rounded-lg px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                    required
                  />
                </div>

                {error && <p className="text-red-600 text-xs md:text-sm">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-2 md:py-3 text-sm md:text-base rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Update Password
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode(null);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setError("");
                  }}
                  className="w-full flex items-center justify-center gap-2 text-slate-600 hover:text-slate-800 transition-all py-2 md:py-3 text-sm md:text-base"
                >
                  <FaArrowLeft className="text-sm" />
                  Back
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-red-100 p-4 rounded-full">
                  <FaLock className="text-3xl text-red-600" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-2">Reset Password</h1>
              <p className="text-center text-xs md:text-sm text-slate-600 mb-8">
                Verify your email to reset your password
              </p>

              <form onSubmit={handleResetSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full bg-white/70 border border-slate-300 rounded-lg px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full bg-white/70 border border-slate-300 rounded-lg px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 md:right-4 top-2 md:top-3 text-slate-500 hover:text-slate-700 text-xs font-medium"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full bg-white/70 border border-slate-300 rounded-lg px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                    required
                  />
                </div>

                {error && <p className="text-red-600 text-xs md:text-sm">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-2 md:py-3 text-sm md:text-base rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Reset Password
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode(null);
                    setEmail("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setError("");
                  }}
                  className="w-full flex items-center justify-center gap-2 text-slate-600 hover:text-slate-800 transition-all py-2 md:py-3 text-sm md:text-base"
                >
                  <FaArrowLeft className="text-sm" />
                  Back
                </button>
              </form>
            </>
          )}
        </div>

        {/* Company Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-4 md:px-8 py-3 md:py-4 text-center text-xs text-slate-500">
          <p>🔒 Enterprise-Grade Security | SPGI Admin Portal</p>
          <p className="mt-1 text-slate-400 text-xs">Your data is protected with end-to-end encryption</p>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-sm w-full text-center transform transition-all">
            <div className="flex justify-center mb-4">
              <div className="bg-emerald-100 rounded-full p-4 md:p-5 animate-bounce">
                <FaCheck className="text-3xl md:text-4xl text-emerald-600" />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Password Updated!</h2>
            <p className="text-slate-600 text-sm md:text-base mb-1">
              Your password has been securely changed.
            </p>
            <p className="text-xs md:text-sm text-slate-500">
              Redirecting to login...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
