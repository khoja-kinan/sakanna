import React from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Roll from "react-reveal/Roll";
import Slide from "react-reveal/Slide";
import { baseImageUrl } from "../../constants/urls";
import { Link } from "@mui/material";
import { useTranslation, initReactI18next } from "react-i18next";

const Location = ({
  locationName,
  locationDescription,
  locationImage,
  locLat,
  locLong,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Slide left>
        <div
          className="map-loc"
          style={{ backgroundImage: `url(${baseImageUrl}${locationImage})` }}
        ></div>
      </Slide>
      <Roll right>
        <div className="di-loc">
          <div className="title">
            <div className="sup">
              <p className="sup-tit">{t('Comunity.Location')}</p>
              <hr className="gr"></hr>
            </div>
            <p className="loc-tit">{locationName}</p>
            <p className="loc-con">{locationDescription}</p>
            <center>
              <Link
                underline="none"
                href={`https://www.google.com/maps/search/?api=1&query=${locLat},${locLong}`}
                target="_blank"
                rel="noopener"
              >
                <Button variant="outlined">
                  <p className="bo-big"> {t('Comunity.map')}</p>
                </Button>
              </Link>
            </center>
          </div>
        </div>
      </Roll>
    </>
  );
};
export default Location;
