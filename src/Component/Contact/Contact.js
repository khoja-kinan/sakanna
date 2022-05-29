import React from "react";
import ContactForm from "../ContactForm/ContactForm";
import Roll from "react-reveal/Roll";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="con-all">
        <div className="contact">
          <div className="title">
            <div className="sup">
              <p className="sup-tit">Get In Touch</p>
              <hr className="gr"></hr>
            </div>
            <p className="main-tit">Contact Us</p>
          </div>
          <div className="flco">
            <ContactForm />
            <Roll right>
              <div className="locati">
                {/* <p className="conat">SAKANA REAL ESTATE DEVELOPMENT</p> */}
                <div className="rocon">
                  <svg
                    class="svgcon"
                    viewBox="0 0 107 107"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_155_3262)">
                      <circle
                        cx="53.5"
                        cy="49.5"
                        r="49.5"
                        fill="url(#paint0_linear_155_3262)"
                      />
                    </g>
                    <path
                      d="M54.5 53C60.1388 53 63 49 63 44.5C63 40 59.75 36 54.5 36C48.5 36 46 41 46 44.5C46 48 48.8612 53 54.5 53ZM54.5 39.25C57.3954 39.25 59.75 41.6046 59.75 44.5C59.75 47.3954 57.3954 49.75 54.5 49.75C51.6046 49.75 49.25 47.3954 49.25 44.5C49.25 41.6046 51.6046 39.25 54.5 39.25Z"
                      fill="white"
                    />
                    <path
                      d="M52.4775 75.015C52.9218 75.3353 53.4541 75.5075 54 75.5075C54.5459 75.5075 55.0782 75.3353 55.5225 75.015C56.3205 74.4453 75.0759 60.7738 74.9998 43.7077C74.9998 32.0184 65.5787 22.5075 54 22.5075C42.4213 22.5075 33.0002 32.0184 33.0002 43.6944C32.9241 60.7738 51.6795 74.4453 52.4775 75.015ZM54 25C62.686 25 72.5 34.9388 72.5 43.7209C72.5551 55.4817 58.2315 68.5439 54 72.0075C49.7712 68.5413 35.5 56.9227 35.5 43.7209C35.5 33.6787 45.314 25 54 25Z"
                      fill="white"
                    />
                    <defs>
                      <filter
                        id="filter0_d_155_3262"
                        x="0"
                        y="0"
                        width="107"
                        height="107"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_155_3262"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_155_3262"
                          result="shape"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_155_3262"
                        x1="15.8166"
                        y1="98.7527"
                        x2="118.69"
                        y2="96.315"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#356968" />
                        <stop offset="1" stop-color="#172120" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="conat">Saudi Arabia - AL Khobar</p>
                </div>
                <div className="rocon">
                  <svg
                    class="svgcon"
                    viewBox="0 0 107 107"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_156_3118)">
                      <circle
                        cx="53.5"
                        cy="49.5"
                        r="49.5"
                        fill="url(#paint0_linear_156_3118)"
                      />
                    </g>
                    <path
                      d="M70.9989 60.2042V65.4731C71.0009 65.9623 70.9005 66.4464 70.7042 66.8946C70.5078 67.3428 70.2199 67.7451 69.8587 68.0757C69.4976 68.4064 69.0712 68.6582 68.6069 68.8149C68.1426 68.9716 67.6507 69.0298 67.1626 68.9857C61.7474 68.3985 56.5458 66.5518 51.9756 63.5939C47.7236 60.8974 44.1187 57.2996 41.4168 53.0561C38.4428 48.4742 36.5919 43.2576 36.0143 37.8289C35.9703 37.3432 36.0281 36.8537 36.1841 36.3916C36.3401 35.9294 36.5907 35.5048 36.9202 35.1446C37.2496 34.7845 37.6505 34.4967 38.0975 34.2997C38.5445 34.1026 39.0276 34.0006 39.5163 34.0002H44.7956C45.6497 33.9918 46.4776 34.2936 47.1252 34.8494C47.7727 35.4052 48.1957 36.177 48.3152 37.021C48.538 38.7072 48.9513 40.3628 49.5471 41.9562C49.7838 42.5848 49.8351 43.268 49.6947 43.9248C49.5544 44.5816 49.2283 45.1845 48.7552 45.662L46.5202 47.8925C49.0254 52.2895 52.6733 55.9302 57.079 58.4304L59.3139 56.1999C59.7924 55.7276 60.3964 55.4022 61.0545 55.2621C61.7127 55.1221 62.3972 55.1732 63.0271 55.4095C64.6237 56.0041 66.2826 56.4165 67.9721 56.6389C68.8269 56.7593 69.6076 57.189 70.1657 57.8464C70.7238 58.5037 71.0203 59.3429 70.9989 60.2042Z"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <filter
                        id="filter0_d_156_3118"
                        x="0"
                        y="0"
                        width="107"
                        height="107"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_156_3118"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_156_3118"
                          result="shape"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_156_3118"
                        x1="15.8166"
                        y1="98.7527"
                        x2="118.69"
                        y2="96.315"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#356968" />
                        <stop offset="1" stop-color="#172120" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="conat">+966138813760</p>
                </div>
                <div className="rocon">
                  <svg
                    class="svgcon"
                    viewBox="0 0 107 107"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_156_3124)">
                      <circle
                        cx="53.5"
                        cy="49.5"
                        r="49.5"
                        fill="url(#paint0_linear_156_3124)"
                      />
                    </g>
                    <path
                      d="M70 41.375C70 39.5188 68.47 38 66.6 38H39.4C37.53 38 36 39.5188 36 41.375M70 41.375V61.625C70 63.4813 68.47 65 66.6 65H39.4C37.53 65 36 63.4813 36 61.625V41.375M70 41.375L53 53.1875L36 41.375"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <filter
                        id="filter0_d_156_3124"
                        x="0"
                        y="0"
                        width="107"
                        height="107"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_156_3124"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_156_3124"
                          result="shape"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_156_3124"
                        x1="15.8166"
                        y1="98.7527"
                        x2="118.69"
                        y2="96.315"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#356968" />
                        <stop offset="1" stop-color="#172120" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="conat">+966138813760</p>
                </div>
              </div>
            </Roll>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Contact;
