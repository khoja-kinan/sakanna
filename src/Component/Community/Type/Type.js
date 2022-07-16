import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fade from "react-reveal/Fade";
import SliderIn from "../SliderIn";
import { useParams } from "react-router-dom";
import { baseImageUrl, getTypeByIdFront } from "../../../constants/urls";
import Footer from "../../Footer/Footer";
import Floors from "../Floors/Floors";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

// const rawHTML = `
// <map name="image-map">
// <area target="" alt="resption" title="Reception
// 7.15 x 4.00 m" href="" coords="2990,2383,3914,728" shape="rect">
// <area target="" alt="bed2" title="Bedroom 2
// 2 5.00 x3.65 m" href="" coords="2032,2692,2924,1520" shape="rect">
// <area target="" alt="bed1" title="Bedroom1
// 5.00 x 3.80 m<" href="" coords="1976,1515,1091,2690" shape="rect">
// <area target="" alt="mbed" title="Master Bedroom
// 5.00 x 4.00 m" href="" coords="107,2683,1021,1137,681,1142,716,1502,107,1506,100,1149,236,1257,300,1348,303,1278,401,1278,475,1373,328,1443,289,1404,261,1359,265,1306,251,1415,240,1313,422,1219,475,1303,552,1266,618,1179,657,1245,622,1305" shape="rect">
// <area target="" alt="g toi" title="Guest Toilet :
// 1.70 x 1.60 m " href="" coords="2913,723,2531,1070" shape="rect">
// <area target="" alt="ketchin" title="Kitchen
// 4.20 x 2.20 m" href="" coords="2472,100,1967,1070" shape="rect">
// <area target="" alt="m room" title="Maid Room
// 2.25 x 1.90 m
// " href="" coords="1897,345,1473,846" shape="rect">
// <area target="" alt="s lun" title="Storage & Laundry
// 1.90 x 0.95 m" href="" coords="1908,890,1081,1131" shape="rect">
// <area target="" alt="m bath" title="Maid Room Toilet
// 2.25 x 1.40 m" href="" coords="1424,348,1116,856" shape="rect">
// <area target="" alt="bath1" title="Bathroom
// 2.20 x 1.90 m" href="" coords="1053,567,608,1086" shape="rect">
// <area target="" alt="bath 2" title="bath 2" href="" coords="562,331,96,1077" shape="rect">
// </map>`;

const Type = () => {
  const { t, i18n } = useTranslation();

  const { comunityId } = useParams();
  const { typeId } = useParams();
  const URL = `${getTypeByIdFront}${comunityId}/type/${typeId}`;

  const [loading, setLoading] = useState(true);
  const [type, setType] = useState();

  useEffect(() => {
    async function fecthData() {
      await axios
        .get(URL)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            setType(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    fecthData();
  }, []);
  console.log(type);
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
                <p className="sup-tit">
                  {type.community.name} {t("Comunity.resedd")}
                </p>
                <hr className="gr"></hr>
              </div>
              <p className="com-tit">{type.type.name}</p>
            </div>
          </div>
        </Fade>
        <div className="type-main">
          <Fade left>
            <div className="info-tec">
              <div className="tre">
                {t("Comunity.area")}:
                <b> {type.type.type_details.area} m&#178; </b> <br />
                {t("Comunity.bedno")}
                <b> {type.type.type_details.numberOfBedrooms} </b>
                <br />
                {t("Comunity.count")}
                <b> {type.type.type_details.count} </b>
              </div>
              <table>
                <tbody>
                  {type.type.type_details.reception && (
                    <tr>
                      <th>{t("Comunity.recption")} </th>
                      <td>{type.type.type_details.reception}</td>
                    </tr>
                  )}
                  {type.type.type_details.guestToilet && (
                    <tr>
                      <th>{t("Comunity.gus_to")} </th>
                      <td>{type.type.type_details.guestToilet}</td>
                    </tr>
                  )}
                  {type.type.type_details.bedroom1 && (
                    <tr>
                      <th>{t("Comunity.bed1")} </th>
                      <td>{type.type.type_details.bedroom1}</td>
                    </tr>
                  )}
                  {type.type.type_details.bedroom2 && (
                    <tr>
                      <th>{t("Comunity.bed2")} </th>
                      <td>{type.type.type_details.bedroom2}</td>
                    </tr>
                  )}
                  {type.type.type_details.MasterBedroom && (
                    <tr>
                      <th>{t("Comunity.master")} </th>
                      <td>{type.type.type_details.MasterBedroom}</td>
                    </tr>
                  )}
                  {type.type.type_details.DressingRoom && (
                    <tr>
                      <th>{t("Comunity.dress")} </th>
                      <td>{type.type.type_details.DressingRoom}</td>
                    </tr>
                  )}
                  {type.type.type_details.MasterRoomToilet && (
                    <tr>
                      <th>{t("Comunity.master_t")} </th>
                      <td>{type.type.type_details.MasterRoomToilet}</td>
                    </tr>
                  )}
                  {type.type.type_details.kitchen && (
                    <tr>
                      <th>{t("Comunity.kitchen")} </th>
                      <td>{type.type.type_details.kitchen}</td>
                    </tr>
                  )}
                  {type.type.type_details.bathroom && (
                    <tr>
                      <th>{t("Comunity.bath")} </th>
                      <td>{type.type.type_details.bathroom}</td>
                    </tr>
                  )}
                  {type.type.type_details.maidRoom && (
                    <tr>
                      <th>{t("Comunity.maid")} </th>
                      <td>{type.type.type_details.maidRoom}</td>
                    </tr>
                  )}
                  {type.type.type_details.maidRoomToilet && (
                    <tr>
                      <th>{t("Comunity.maid_t")} </th>
                      <td>{type.type.type_details.maidRoomToilet}</td>
                    </tr>
                  )}
                  {type.type.type_details.storage && (
                    <tr>
                      <th>{t("Comunity.storage")}</th>
                      <td>{type.type.type_details.storage}</td>
                    </tr>
                  )}

                  {type.type.type_details.laundry && (
                    <tr>
                      <th>{t("Comunity.land")} </th>
                      <td>{type.type.type_details.laundry}</td>
                    </tr>
                  )}
                  {type.type.type_details.GROUND_FLOOR_AREA && (
                    <tr>
                      <th>{t("Dashboard.groundFloorArea")} </th>
                      <td>{type.type.type_details.GROUND_FLOOR_AREA}</td>
                    </tr>
                  )}
                  {type.type.type_details.FIRST_FLOOR_AREA && (
                    <tr>
                      <th>{t("Dashboard.firstFloorArea")} </th>
                      <td>{type.type.type_details.FIRST_FLOOR_AREA}</td>
                    </tr>
                  )}
                  {type.type.type_details.ROOF_FLOOR_AREA && (
                    <tr>
                      <th>{t("Dashboard.roofFloorArea")} </th>
                      <td>{type.type.type_details.ROOF_FLOOR_AREA}</td>
                    </tr>
                  )}
                  {type.type.type_details.OUTDOORandTERRACES && (
                    <tr>
                      <th>{t("Dashboard.outDoorAndTerracesArea")} </th>
                      <td>{type.type.type_details.OUTDOORandTERRACES}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Fade>

          <Fade right>
            <img
              className="ty-bac"
              src={`${baseImageUrl}${type.type.type_details.card_image}`}
              alt="9"
            />
          </Fade>
        </div>
        {type.type.floors.length !== 0 && (
          <>
            <div className="conm pa-do">
              <div className="sup">
                <p className="sup-tit">
                  {i18n.dir() === "ltr"
                    ? type.type.type_details.name
                    : type.type.type_details.name_ar}
                </p>
                <hr className="gr"></hr>
              </div>
              <p className="com-tit">PRICES</p>
            </div>
            <div className="conmoo">
              <table className="prices">
                <tbody>
                  <tr>
                    {type.type.floors.map(
                      (item) =>
                        item.availability === 1 && (
                          <th key={item.apartment_number}>
                            {i18n.dir() === "ltr"
                              ? item.floor.name
                              : item.floor.name_ar}
                          </th>
                        )
                    )}
                  </tr>
                  <tr>
                    {type.type.floors.map(
                      (item) =>
                        item.availability === 1 && (
                          <td key={item.apartment_number}>
                            {item.apartment_price} {t("Comunity.sar")}
                          </td>
                        )
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
        {/* <div className="container"> */}

        {/* <iframe src={perf }></iframe>  */}
      </div>
      {type.community.type === "villa" && (
        <Floors floors={type.type.type_details.type_floors} />
      )}
      <div className="gra">
        <div
          className="gra-floor"
          style={{
            backgroundImage: `url(${baseImageUrl}${type.type.type_details.image})`,
          }}
        >
          {/* <img src="" usemap="#image-map"/>
                <div dangerouslySetInnerHTML={{ __html: rawHTML }}></div> */}
        </div>
      </div>
      <div className="types">
        <div className="title">
          <div className="sup">
            <p className="sup-tit">
              {type.community.name} {t("Comunity.resedd")}
            </p>
            <hr className="gr"></hr>
          </div>
          <p className="com-tit">
            {t("Comunity.design")}
            <span className="nui">&nbsp;{t("Comunity.interior")}</span>
          </p>
        </div>
      </div>
      <div>
        <SliderIn images={type.community.interior_samples} />
      </div>
      <Footer />
    </>
  );
};

export default Type;
