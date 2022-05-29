import React from "react";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Roll from "react-reveal/Roll";
import Slide from "react-reveal/Slide";
import { baseImageUrl } from "../../constants/urls";

const Location = ({ locationName, locationDescription, locationImage }) => {
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
              <p className="sup-tit">Location</p>
              <hr className="gr"></hr>
            </div>
            <p className="loc-tit">{locationName}</p>
            <p className="loc-con">{locationDescription}</p>
            <center>
              <Button variant="outlined" LinkComponent={NavLink} to="/contact">
                <p className="bo-big">VIEW ON GOOGLE MAP </p>
              </Button>
            </center>
          </div>
        </div>
      </Roll>
    </>
  );
};
export default Location;
