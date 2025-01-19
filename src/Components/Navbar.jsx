import React, { useState, useEffect, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSunnySharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Usercontext } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
// import ajay from '../../assets/Images/ajay.png'

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Usercontext);

  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handletheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handlelogout = async () => {
    const res = await fetch("https://allobackend.onrender.com/api/v1/user/stafflogout", {
      withCredntials: true,
      credentials: "include",
      method: "GET",
      // credentials: 'include',
    });
    const data = await res.json();
    if (data.success == false) {
      toast.error(data.message, {
        autoClose: 1200,
      });
    } else {
      toast.success(data.message, {
        autoClose: 1200,
      });
      setIsAuthenticated(false);
      navigate("/login");
    }
  };
  // if(isAuthenticated!==true){
  //   navigate("/login")
  // }

  const handlelogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <div className="lg:flex md:hidden sm:hidden  px-4  py-2 text-grey-500 dark:bg-black dark:text-white items-center justify-between">
        <div className="flex gap-4 items-center ">
          {/* <img src={ajay} alt="" width={50}  className='rounded-full'/> */}
          <h1 className="text-3xl  px-4 py-1 flex items-center gap-2 text-purple-400">
            <span>
              <img
                src="https://cdn.prod.website-files.com/61a4b9739ac56e51853f7bb2/63104b02a54e193fc31e5261_Allo%20Logo.webp"
                alt=""
                className="w-16"
              />
            </span>{" "}
          </h1>
        </div>
        {isAuthenticated && (
          <ul
            type="none"
            className="flex flex-row gap-8 justify-center m-auto  px-4 py-3 items-center text-xl font-bold text-purple-400 "
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/appointment">Appointments</Link>
            </li>

            <li>
              <Link to="/doctors">Doctors</Link>
            </li>
          </ul>
        )}

        <div className="px-4 flex flex-row items-center gap-5 justify-end">
          <p onClick={handletheme} className="hover:cursor-pointer">
            <IoSunnySharp />
          </p>
          {isAuthenticated === true ? (
            <button
              class="bg-purple-300 text-lg text-black border border-purple-400 border-b-4 font-bold overflow-hidden relative px-4 py-2 rounded-3xl hover:brightness-10 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
              onClick={handlelogout}
            >
              <span class="bg-purple-400 shadow-purple-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Logout
            </button>
          ) : (
            <button
              class="bg-purple-300 text-lg text-black border border-purple-400 border-b-4 font-bold overflow-hidden relative px-4 py-2 rounded-3xl hover:brightness-10 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
              onClick={handlelogin}
            >
              <span class="bg-purple-400 shadow-purple-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Login
            </button>
          )}
          <Link to={"https://alloadmin.vercel.app/"}>
            {" "}
            <button class="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-purple-300 backdrop-blur-md lg:font-bold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group">
              Admin
              <svg
                class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  class="fill-gray-800 group-hover:fill-gray-800"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
      </div>
      <div className="text-3xl lg:hidden md:visible sm:visible dark:bg-black text-purple-500 p-2">
        <GiHamburgerMenu onClick={() => setOpen(!open)} />
      </div>
      {open && (
        <div>
          <ul
            type="none"
            className=" lg:hidden flex flex-col gap-4 dark:bg-black py-4 px-4 text-lg font-semibold  text-purple-400"
          >
            <li className="text-3xl   py-1 ">alloHealth</li>

            {isAuthenticated && (
              <ul className="flex flex-col gap-4">
                {" "}
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/appointment">Appointment</Link>
                </li>
                <li>
                  <Link to="/doctors">Doctors</Link>
                </li>
                <li onClick={handletheme} className="hover:cursor-pointer">
                  <IoSunnySharp />
                </li>{" "}
              </ul>
            )}

            {isAuthenticated === true ? (
              <button
                className="text-xl font-semibold bg-purple-500 py-1 px-2 rounded-2xl text-white "
                onClick={handlelogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="text-xl font-semibold bg-purple-500 py-1 px-2 rounded-2xl text-white w-28"
                onClick={handlelogin}
              >
                Login
              </button>
            )}
            <Link to={"https://alloadmin.vercel.app/"}>
              {" "}
              <button className="text-xl font-semibold bg-purple-500 py-1 px-2 rounded-2xl text-white w-28">
                Admin
              </button>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
