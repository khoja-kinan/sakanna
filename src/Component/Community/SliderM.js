import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { baseImageUrl } from "../../constants/urls";

const SliderM = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    fade: true,
  };
  return (
    <div>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id}>
            <div
              className="first"
              style={{
                backgroundImage: `url(${baseImageUrl}${image.imageUrl})`,
              }}
            >
              .
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderM;
