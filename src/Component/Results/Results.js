import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Slide from "react-reveal/Slide";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link, useLocation } from "react-router-dom";
import { baseImageUrl } from "../../constants/urls";
const Results = () => {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <>
      <Navbar />
      <div className="resulty">
        <div className="result">{/* <SearchBar /> */}</div>
        <div className="comta">
          <div className="title">
            <div className="sup">
              <p className="sup-tit">{t("Results.chk")}</p>
              <hr className="gr"></hr>
            </div>
            <p className="main-tit">{t("Results.result")}</p>
          </div>
          {location.state.map((res) => (
            <Link
              to={`/community/${res.community.id}/type/${res.type.id}`}
              key={res.type.id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Slide bottom>
                <div className="result-box">
                  <div
                    className="res-img"
                    style={{
                      backgroundImage: `url(${baseImageUrl}${res.type.card_image})`,
                    }}
                  ></div>
                  <div className="type-res">
                    <p class="com-tit-res">{res.type.name}</p>
                    <div class="tre-res">
                      Area {res.type.area} m² <br />
                      Bedroom Number : {res.type.numberOfBedrooms} <br />
                      Total Count In Project : {res.type.count}
                    </div>
                    <div className="loc-res">
                      <svg
                        width="18"
                        height="29"
                        viewBox="0 0 18 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 9C17.5 10.15 17.1508 11.4895 16.5542 12.9201C15.9596 14.3456 15.132 15.8321 14.205 17.2677C12.4813 19.9371 10.4362 22.3965 8.9713 23.9155C7.2833 22.4159 5.23817 19.9585 3.57497 17.2755C1.78599 14.3896 0.5 11.3397 0.5 9C0.5 4.30558 4.30558 0.5 9 0.5C13.6944 0.5 17.5 4.30558 17.5 9Z"
                          stroke="#375958"
                        />
                        <circle
                          cx="9.00078"
                          cy="8.9998"
                          r="3.7"
                          stroke="#375958"
                        />
                        <ellipse
                          cx="9.00039"
                          cy="27.6004"
                          rx="6.6"
                          ry="1.2"
                          fill="black"
                          fill-opacity="0.12"
                        />
                      </svg>
                      {res.community.location}
                    </div>
                  </div>
                  <div className="comu-res">{res.community.name}</div>
                </div>
              </Slide>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Results;
