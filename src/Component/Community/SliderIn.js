import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { baseImageUrl } from "../../constants/urls";

const SliderIn = ({ images }) => {
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
        {images[0].images.map((img) => (
          <div key={img.id}>
            <div
              className="firsti"
              style={{
                backgroundImage: `url(${baseImageUrl}${img.imageUrl})`,
              }}
            ></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderIn;
