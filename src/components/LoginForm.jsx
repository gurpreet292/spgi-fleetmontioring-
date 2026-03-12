import { useState } from "react";
import { FaUser, FaBriefcase } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";

const roles = [
  "Admin",
  "Waste Manager",
  "Field Officer",
  "Analyst",
  "Supervisor",
];

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    role: "Admin",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", form);
  };

  return (
    /* On mobile: overlaps the green banner with negative margin + rounded top */
    <div className="w-full lg:w-1/2 flex items-start justify-center bg-gray-100 lg:min-h-screen px-4 lg:py-12
                    -mt-8 lg:mt-0">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md px-7 py-9">

        {/* Card Header */}
        <div className="mb-7 text-center">
          <h2 className="text-2xl font-extrabold text-gray-800">Welcome Back</h2>
          <p className="text-green-600 text-sm mt-1 font-medium">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Username or Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-800">
              Username or Email
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all">
              <FaUser className="text-gray-400 text-base shrink-0" />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                required
              />
            </div>
          </div>

          {/* Select Role */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-800">Select Role</label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all">
              <FaBriefcase className="text-gray-400 text-base shrink-0" />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="flex-1 bg-transparent text-sm text-gray-800 outline-none appearance-none cursor-pointer"
                required
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <svg
                className="text-gray-400 w-4 h-4 shrink-0 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-800">Password</label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all">
              <MdLock className="text-gray-400 text-base shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-gray-400 hover:text-green-600 transition-colors text-xs font-medium shrink-0"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {/* Forgot Password */}
            <div className="flex justify-end mt-1">
              <a
                href="#"
                className="text-sm text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md shadow-green-200 mt-1"
          >
            Sign In
            <FiArrowRight className="text-lg" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            className="text-green-600 font-bold hover:text-green-700 hover:underline transition-colors"
          >
            Request access
          </a>
        </p>
      </div>
    </div>
  );
}
