import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class SimpleSlider extends Component {
  render() {
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
        <Slider {...settings} className="SliderAr">
          <div>
            <div className="second t1"></div>
          </div>
          <div>
            <div className="second t2"></div>
          </div>
        </Slider>
      </div>
    );
  }
}
