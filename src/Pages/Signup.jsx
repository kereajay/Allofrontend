import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Usercontext } from "../main";

function Signup() {
    const { isAuthenticated, setIsAuthenticated } = useContext(Usercontext);
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        Hospitalid: "",
        dob: "",
        gender: "",
        password: "",
        confirmpassword: "",
        role: "Staff",
    });

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://allobackend.onrender.com/api/v1/user/staff/signup", {
                withCredntials: true,
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formdata),
            });
            const data = await res.json();
            if (data.success === true) {
                toast.success(data.message, {
                    autoClose: 1200,
                });
                navigate("/login");
            } else {
                toast.error(data.message, {
                    autoClose: 1500,
                });
            }
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="mt-10 px-4 md:px-0 py-5">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="mb-8 md:mb-0 md:mr-8 w-full md:w-1/2">
                    <img
                        src="https://cdn.dribbble.com/users/1172503/screenshots/4745561/media/bd5ad18ddc22ecdf30106c0ccc392c9b.gif"
                        alt="Signup Animation"
                        className="w-full h-auto object-cover rounded-lg "
                    />
                </div>

                <div className="max-w-lg w-full md:w-1/2 bg-white p-6 rounded-xl shadow-[10px_10px_60px_0px_#2b6cb0] dark:shadow-[10px_10px_60px_0px_#2b6cb0]">
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-bold">Signup</h1>
                    </div>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="flex-1">
                                <label
                                    htmlFor="firstName"
                                    className="block text-lg font-medium text-gray-700"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formdata.firstName}
                                    onChange={handleChange}
                                    className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="lastName"
                                    className="block text-lg font-medium text-gray-700"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formdata.lastName}
                                    onChange={handleChange}
                                    className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={formdata.phone}
                                onChange={handleChange}
                                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

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
                                value={formdata.email}
                                onChange={handleChange}
                                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="Hospitalid"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Hospitalid
                            </label>
                            <input
                                type="number"
                                name="Hospitalid"
                                id="Hospitalid"
                                value={formdata.Hospitalid}
                                onChange={handleChange}
                                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="dob"
                                className="block text-lg font-medium text-gray-700"
                            >
                                DOB
                            </label>
                            <input
                                type="date"
                                name="dob"
                                id="dob"
                                value={formdata.dob}
                                onChange={handleChange}
                                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="gender"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Gender
                            </label>
                            <input
                                type="text"
                                name="gender"
                                id="gender"
                                value={formdata.gender}
                                onChange={handleChange}
                                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                value={formdata.password}
                                onChange={handleChange}
                                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <p>
                                Already Registered?{" "}
                                <Link to="/login" className="text-indigo-600 hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                        >
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
