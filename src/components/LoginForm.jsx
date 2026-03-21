import { FaUser, FaBriefcase } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const roles = [
  "Admin",
  "Manager",
  "Analyst",
];

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
      name: "",
      email: "",
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

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
 });  

 const handleSubmit = (e) => {
  e.preventDefault();

  const nameRegex = /^[A-Z][a-zA-Z\s]*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@spgi\.com$/;

  let newErrors = { name: "", email: "", password: "" };
  let valid = true;

  // Validate Name
  if (!nameRegex.test(form.name)) {
    newErrors.name =
      "Name must start with a capital letter and contain only alphabets.";
    valid = false;
  }

  // Validate Email (only company email allowed)
  if (!emailRegex.test(form.email)) {
    newErrors.email =
      "Only company email addresses (@spgi.com) are allowed.";
    valid = false;
  }

  // Check password in localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const storedUser = users.find(u => u.email === form.email);
  
  if (storedUser && storedUser.password !== form.password) {
    newErrors.password = "Incorrect password";
    valid = false;
  }

  setErrors(newErrors);

  if (!valid) return;

  // Store user in localStorage if not exists
  const userExists = users.find(u => u.email === form.email);
  
  if (!userExists) {
    users.push({
      name: form.name,
      email: form.email,
      role: form.role,
      password: form.password
    });
    localStorage.setItem("users", JSON.stringify(users));
  }

  const userData = {
    name: form.name,
    email: form.email,
    role: form.role,
  };

  login(userData);

  const routes = {
    Admin: "/dashboard",
    Analyst: "/analytics",
    "Manager": "/operations"
  };

  navigate(routes[form.role] || "/dashboard");
};

   const handleForgotPassword = () => {
    navigate("/forgot-password");
   };
  

  
  
  return (
    <div className="w-full lg:w-1/2 flex items-start justify-center bg-gray-100 lg:min-h-screen px-3 md:px-4 lg:py-12 -mt-8 lg:mt-0">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md px-4 md:px-7 py-6 md:py-9">

        {/* Card Header */}
        <div className="mb-6 md:mb-7 text-center">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-800">Welcome Back</h2>
          <p className="text-green-600 text-xs md:text-sm mt-1 font-medium">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">

          {/* Full Name */}
<div className="flex flex-col gap-1">
  <label className="text-xs md:text-sm font-bold text-gray-800">
    Full Name
  </label>

  <div className="flex items-center gap-2 md:gap-3 border border-gray-200 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all">
    <FaUser className="text-gray-400 text-sm md:text-base shrink-0" />

    <input
      type="text"
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Enter your full name"
      pattern="[A-Z][a-zA-Z\s]*"
      title="Name must start with a capital letter"
      className="flex-1 bg-transparent text-xs md:text-sm text-gray-800 placeholder-gray-400 outline-none"
     required
    />
  </div>
  {errors.name && (
    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
  )}
</div>

          {/* Username or Email */}
<div className="flex flex-col gap-1">
  <label className="text-xs md:text-sm font-bold text-gray-800">
    Email Address
  </label>

  <div className="flex items-center gap-2 md:gap-3 border border-gray-200 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all">
    <FaUser className="text-gray-400 text-sm md:text-base shrink-0" />

    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Enter your email"
      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
      title="Enter a valid email address"
      className="flex-1 bg-transparent text-xs md:text-sm text-gray-800 placeholder-gray-400 outline-none"
      required
    />
  </div>
  {errors.email && (
    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
  )}
</div>

          {/* Select Role */}
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-sm font-bold text-gray-800">Select Role</label>
            <div className="flex items-center gap-2 md:gap-3 border border-gray-200 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all">
              <FaBriefcase className="text-gray-400 text-sm md:text-base shrink-0" />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="flex-1 bg-transparent text-xs md:text-sm text-gray-800 outline-none appearance-none cursor-pointer"
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
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-sm font-bold text-gray-800">Password</label>
            <div className="flex items-center gap-2 md:gap-3 border border-gray-200 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all">
              <MdLock className="text-gray-400 text-sm md:text-base shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="flex-1 bg-transparent text-xs md:text-sm text-gray-800 placeholder-gray-400 outline-none"
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
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            {/* Forgot Password */}
            <div className="flex justify-end mt-1">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs md:text-sm text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors"
              >
                Account Security
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-2.5 md:py-3.5 text-sm md:text-base rounded-lg md:rounded-xl transition-colors shadow-md shadow-green-200 mt-2 md:mt-1"
          >
            Sign In
            <FiArrowRight className="text-base md:text-lg" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs md:text-sm text-gray-500 mt-4 md:mt-6">
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
