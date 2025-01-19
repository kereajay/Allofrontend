import React from 'react'
import Hero from './Hero'
import Appointmentform from './Appointmentform'
import Footer from './Footer'

function Newappointment() {
  return (
    <div>
       <Hero title={"Schedule a appointment | alloHealth care"} imageurl={"/signin.png"}/>
       <Appointmentform/>
       <Footer/>

      
    </div>
  )
}

export default Newappointment
