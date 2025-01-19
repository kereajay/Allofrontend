import React from 'react'
import Footer from '../Components/Footer'
import Department from '../Components/Department'
import Hero from '../Components/Hero'

function Home() {
  return (
    <div>
        <Hero title={"Welcome to allohealth care"} imageurl={"/hero.png"} />
        <Department/>
      <Footer/>
    </div>
  )
}

export default Home
