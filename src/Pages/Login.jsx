import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Usercontext } from "../main";

function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Usercontext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    role: "Staff",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://allobackend.onrender.com/api/v1/user/staff/login", {
      withCredntials: true,
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.success === true) {
      toast.success(data.message, {
        autoClose: 1200,
      });
      setIsAuthenticated(true);
      navigate("/");
    } else {
      toast.error(data.message, {
        autoClose: 1200,
      });
    }
  };

  if (isAuthenticated === true) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-10 px-4 md:px-0 py-14">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="mb-8 md:mb-0 md:mr-8 w-full md:w-1/2">
          <img
            src="https://cdn.dribbble.com/users/1172503/screenshots/4505740/login-form.gif"
            alt="Login Animation"
            className="w-full h-auto object-cover rounded-lg "
          />
        </div>

        <div className="max-w-lg w-full md:w-1/2 bg-white p-6 rounded-xl shadow-[10px_10px_60px_0px_#ecc94b]">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-blue-500">Login</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmpassword"
                className="block text-lg font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <p>
                Not Registered?{" "}
                <Link to="/signup" className="text-indigo-600 hover:underline">
                  Signup
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
