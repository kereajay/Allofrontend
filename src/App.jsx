import { useState,useContext, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Appointment from './Pages/Appointment'
import Newappointment from './Components/Newappointment'
import Doctors from './Pages/Doctors'

import Footer from './Components/Footer'
import {Usercontext} from './main'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
  useContext(Usercontext); 

  useEffect(() => {
    const fecthuser = async () => {
      try {
        const res = await fetch(
          "https://allobackend.onrender.com/api/v1/user/staff/details",
          {
            withCredntials: true,
            credentials: "include",
            method: "GET",
            // headers: {
            //   "Content-Type": "application/json",

            // },
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.success == true) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser({});
        }
      } catch (err) {
        console.log(err);
      }
    };
    fecthuser();
    
  }, [isAuthenticated]);
  

  return (
    <>
    <div className='font-title'>
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/appointment' element={<Appointment/>}/>
          <Route path='/newappointment' element={<Newappointment/>}/>
          <Route path='/doctors' element={<Doctors/>}/>
         
         
          
        </Routes>
        {/* <Footer/> */}
        <ToastContainer/>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
