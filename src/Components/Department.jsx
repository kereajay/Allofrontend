import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


function Departments() {
  const departmentsArray = [
    {
      name: "Cardiology",
      imageUrl: '/Department/cardio.jpg',
    },
    {
      name: "Orthopedics",
      imageUrl: '/Department/ortho.jpg',
    },
    {
      name: "Pediatrics",
      imageUrl: '/Department/pedia.jpg',
    },
    {
      name: "Neurology",
      imageUrl:'/Department/neuro.jpg',
    },
    {
      name: "Oncology",
      imageUrl: '/Department/onco.jpg',
    },
    {
      name: "Radiology",
      imageUrl: '/Department/radio.jpg',
    },
    {
      name: "Physical Therapy",
      imageUrl: '/Department/therapy.jpg',
    },
    {
      name: "Dermatology",
      imageUrl: '/Department/derma.jpg',
    },
    {
      name: "ENT",
      imageUrl: '/Department/ent.jpg',
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div>
      <div className='py-24'>
        <h2 className='text-3xl font-bold px-28 py-5 text-gray-500'>Departments</h2>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all 0.9s ease"
          transitionDuration={1500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["small", "medium", "large","extraLarge"]}
            // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="relative flex-1 flex flex-row justify-center items-center min-h-[360px] py-5" >
                <div className="depart-name text-3xl font-bold mt-32 bg-white rounded-full p-2">{depart.name}</div>
                <img src={depart.imageUrl} alt="Department" className='absolute -z-10 w-[100%] h-[100%] px-2 rounded-full'/>
              </div>
            );
          })}
        </Carousel>
      </div>
      <div>
        {/* <img src={cardio} alt="" /> */}
      </div>
      
    </div>
  )
}

export default Departments
