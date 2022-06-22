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
    nextArrow: <NextArrowCom />,
    prevArrow: <PrevArrowCom />,
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
function NextArrowCom(props) {
  const { na, style, onClick } = props;
  return (
    <div
      className={na}
      style={{
        ...style,
        display: "block",
        color: "#523f3f00",
        position: "absolute",
        top:"21vw",
        right:"5vw",

      }}
      onClick={onClick}
    >
    <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_b_213_41736)">
<path d="M19.5 0C9.00655 0 0.5 8.50655 0.5 19C0.5 29.4932 9.00655 38 19.5 38C29.9934 38 38.5 29.4932 38.5 19C38.5 8.50655 29.9934 0 19.5 0ZM25.2897 20.2868C25.1971 20.3794 25.0955 20.4577 24.9897 20.5257L17.859 27.6564C17.5127 28.003 17.0588 28.1761 16.6048 28.1761C16.1508 28.1761 15.6971 28.003 15.3505 27.6564C14.6577 26.9635 14.6577 25.84 15.3505 25.1474L21.495 19.002L15.3814 12.8885C14.6886 12.1952 14.6886 11.0721 15.3814 10.3794C16.0743 9.68658 17.1976 9.68696 17.8904 10.3791L24.9896 17.4778C25.0954 17.5459 25.197 17.624 25.2892 17.7167C25.6433 18.0709 25.8142 18.5374 25.8062 19.0019C25.8146 19.4661 25.6441 19.9324 25.2897 20.2868Z" fill="#fefefe" fill-opacity="0.33"/>
</g>
<defs>
<filter id="filter0_b_213_41736" x="-54.5" y="-55" width="148" height="148" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImage" stdDeviation="27.5"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_213_41736"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_213_41736" result="shape"/>
</filter>
</defs>
</svg>

    </div>
  );
}

function PrevArrowCom(props) {
  const { pr, style, onClick } = props;
  return (
    <div
      className={pr}
      style={{ ...style, display: "block", color: "#523f3f00" ,position: "absolute",
        top:"20vw",
        left:"5vw",
        zIndex:1000, }}
      onClick={onClick}
    >



      <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_b_213_41736)">
<path d="M19.5 38C29.9934 38 38.5 29.4934 38.5 19C38.5 8.50681 29.9934 1.2205e-06 19.5 2.13787e-06C9.00655 3.05524e-06 0.499998 8.50681 0.499999 19C0.5 29.4935 9.00655 38 19.5 38ZM13.7103 17.7132C13.8029 17.6206 13.9045 17.5423 14.0103 17.4743L21.141 10.3436C21.4873 9.99704 21.9412 9.82389 22.3952 9.82389C22.8492 9.82389 23.3029 9.99704 23.6495 10.3436C24.3423 11.0365 24.3423 12.16 23.6495 12.8526L17.505 18.998L23.6186 25.1115C24.3114 25.8048 24.3114 26.9279 23.6186 27.6206C22.9257 28.3134 21.8024 28.313 21.1096 27.6209L14.0104 20.5222C13.9046 20.4541 13.803 20.376 13.7108 20.2833C13.3567 19.9291 13.1858 19.4626 13.1938 18.9981C13.1854 18.5339 13.3559 18.0676 13.7103 17.7132Z" fill="#fefefe" fill-opacity="0.33"/>
</g>
<defs>
<filter id="filter0_b_213_41736" x="-54.5" y="-55" width="148" height="148" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feGaussianBlur in="BackgroundImage" stdDeviation="27.5"/>
<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_213_41736"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_213_41736" result="shape"/>
</filter>
</defs>
</svg>


    </div>
  );
}
export default SliderIn;
