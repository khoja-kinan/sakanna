import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from './Slider'
// import Mslider from './Mslider'
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import {
  MenuItem,
  FormControl,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import Select from "react-select";
import SliderM from "./SliderM";
import FeaturesIcon from "./FeaturesIcon";
import Location from "./Location";
import SearchContact from "../SearchContact/SearchContact";
import "../SearchContact/SearchContact.scss";
import { Fade } from "react-reveal";
import { Link, useLocation, useParams } from "react-router-dom";
import { getComunityById } from "../../constants/urls";
import axios from "axios";
import { baseImageUrl } from "../../constants/urls";
import { LinearProgress } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";

const Community = () => {
  const { t } = useTranslation();

  const { urlId } = useParams();

  const [loading, setLoading] = useState(true);
  const [comunityDetails, setComunityDetails] = useState();

  const URL = `${getComunityById}/${urlId}`;

  useEffect(() => {
    async function fecthData() {
      await axios
        .get(URL)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            setComunityDetails(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    fecthData();
  }, []);
  return loading ? (
    <LinearProgress color="primary" />
  ) : (
    <>
      <Navbar />
      <div id="commuu ">
        <Fade top>
          <div className="conm">
            <div className="title">
              <div className="sup">
                <p className="sup-tit">{t("Comunity.feel")}</p>
                <hr className="gr"></hr>
              </div>
              <p className="com-tit">
                {comunityDetails.name}&nbsp;
                <span className="nui">{t("Comunity.res")}</span>
              </p>
            </div>
            <div className="contain">{comunityDetails.description}</div>
          </div>
        </Fade>
        <Fade>
          <SliderM images={comunityDetails.images} className="SliderM" />
        </Fade>
        <button className="graph">{t("Comunity.plan")}</button>
        <div className="featuers">
          <FeaturesIcon amenities={comunityDetails.amenities} />
        </div>
        <div className="location">
          <Location
            locationName={comunityDetails.location}
            locationDescription={comunityDetails.location_description}
            locationImage={comunityDetails.location_image}
            locLat={comunityDetails.latitude}
            locLong={comunityDetails.longitude}
          />
        </div>
        <div className="types">
          <div className="title">
            <div className="sup">
              <p className="sup-tit">
                {comunityDetails.name} {t("Comunity.res")}
              </p>
              <hr className="gr"></hr>
            </div>
            <p className="com-tit">
              {t("Comunity.prop")} &nbsp;
              <span className="nui">{t("Comunity.types")}</span>
            </p>
          </div>

          <div className="types-grid ">
            {comunityDetails.types.map((type) => (
              <Fade bottom big key={type.id}>
                <div
                  className="type-box"
                  id="shcc"
                  style={{
                    backgroundImage: `url(${baseImageUrl}${type.card_image})`,
                  }}
                >
                  <input type="checkbox" className="erw" />

                  <Link to={`/community/${comunityDetails.id}/type/${type.id}`}>
                    <div className="type">{type.name}</div>
                  </Link>
                  <div className="info">
                    {t("Comunity.area")}{" "}
                    <span className="dirc">{type.area} m&#178;</span> <br />
                    {t("Comunity.count")}{" "}
                    <span className="dirc">
                      {type.count}
                      <br />
                    </span>
                    {t("Comunity.bedno")}{" "}
                    <span className="dirc">{type.numberOfBedrooms} </span>
                    <div className="typeinfo" id="menucc">
                      <hr className="typeh" />
                      <ul className="ultype">
                        <li className="litype">
                          {t("Comunity.recption")}
                          <span className="dirc"> {type.reception}</span>
                        </li>
                        <li className="litype">
                          {t("Comunity.gus_to")}
                          <span className="dirc">{type.guestToilet}</span>
                        </li>
                        <li className="litype">
                          {t("Comunity.bed1")}{" "}
                          <span className="dirc"> {type.bedroom1}</span>
                        </li>
                        <li className="litype">
                          {t("Comunity.bed2")}{" "}
                          <span className="dirc"> {type.bedroom2}</span>
                        </li>
                        <li className="litype">
                          {t("Comunity.master")}{" "}
                          <span className="dirc">{type.MasterBedroom}</span>
                        </li>
                        <li className="litype">
                          {t("Comunity.dress")}
                          <span className="dirc"> {type.DressingRoom}</span>
                        </li>
                        <li className="litype">
                          {t("Comunity.master_t")}{" "}
                          <span className="dirc">{type.MasterRoomToilet}</span>
                        </li>
                        <li className="litype">
                          {t("Comunity.kitchen")}{" "}
                          <span className="dirc">{type.kitchen}</span>
                        </li>
                        <li className="litype">
                          {t("Comunity.bath")}{" "}
                          <span className="dirc">{type.bathroom}</span>
                        </li>
                        <li className="litype">
                          {t("Comunity.maid")}{" "}
                          <span className="dirc">{type.maidRoom}</span>
                        </li>
                        <li className="litype">
                          {t("Comunity.maid_t")}
                          <span className="dirc">{type.maidRoomToilet}</span>
                        </li>
                        <li className="litype">
                          {t("Comunity.storage")}{" "}
                          <span className="dirc">{type.storage}</span>
                        </li>
                        <li className="litype">
                          {t("Comunity.land")}
                          <span className="dirc"> {type.laundry}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>

      <div role="main" className="sc ki posi">
        <div id="menuToggle">
          <input type="checkbox" />
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 26L20.2 20.2M23.3333 12.6667C23.3333 18.5577 18.5577 23.3333 12.6667 23.3333C6.77563 23.3333 2 18.5577 2 12.6667C2 6.77563 6.77563 2 12.6667 2C18.5577 2 23.3333 6.77563 23.3333 12.6667Z"
              stroke="#8c7a6a"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div id="menu">
            <div className="res">
              <SearchContact className="res" />
            </div>
          </div>
        </div>
      </div>
      <div className=" sc ni posi">
        <SearchContact />
      </div>
      <Footer />
    </>
  );
};

export default Community;
