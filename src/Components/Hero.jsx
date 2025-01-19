import React from "react";

function Hero({ title, imageurl }) {
  return (
    <div className="grid lg:grid-cols-2 mt-0">
      <div className="px-20 mt-24">
        <h1 className="text-3xl font-bold text-gray-500 mt-10">{title}</h1>
        <br />
        <p className="text-lg text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
          est quas nam, laborum sunt fugit repellat illum labore odio porro
          corporis hic quibusdam architecto, dignissimos cupiditate adipisci
          quisquam minima. Itaque.
        </p>
      </div>
      <div className="bg-[url('/Vector.png')] bg-no-repeat bg-left">
        <img src={imageurl} alt="hero" className="animated-image" />
       
      </div>
    </div>
  );
}

export default Hero;
