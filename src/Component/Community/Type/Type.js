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
                  {i18n.dir() === "ltr" && type.community.name}{" "}
                  {t("Comunity.resedd")}{" "}
                  {i18n.dir() === "rtl" && type.community.name_ar}
                </p>
                <hr className="gr"></hr>
              </div>
              <p className="com-tit">
                {i18n.dir() === "ltr"
                  ? type.type.type_details.name
                  : type.type.type_details.name_ar}
              </p>
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
              <p className="com-tit">{t("Comunity.Prices")}</p>
            </div>
            <div className="conmoo">
              {/* <table className="prices">
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
              </table> */}
              <table className="prices">
                <tbody>
                  {type.type.floors.map((item) => (
                    <tr>
                      <th>
                        {i18n.dir() === "ltr"
                          ? item.floor.name
                          : item.floor.name_ar}
                      </th>
                      {item.prices.map((floorPrice) => (
                        <td>
                          {floorPrice.apartment_price} {t("Comunity.sar")}
                        </td>
                      ))}
                    </tr>
                  ))}
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
              {i18n.dir() === "ltr" && type.community.name}{" "}
              {t("Comunity.resedd")}{" "}
              {i18n.dir() === "rtl" && type.community.name_ar}
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
