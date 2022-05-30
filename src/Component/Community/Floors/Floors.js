import React from "react";
import Slide from "react-reveal/Slide";

const Floors = ({ floors }) => {
  console.log(floors);
  return (
    <>
      <Slide left>
        <div className="floors-cols">
          <div className="col-f">
            <div className="info-tec-floor">
              <div className="floor-tit">GROUND FLOOR</div>
              <div className="tre-f">Area : 80 m&#178; </div>
              <table>
                <tr>
                  <th>Majlis </th>
                  <td>4.50 x 3.80 m</td>
                </tr>
                <tr>
                  <th>Foyer </th>
                  <td>1.75 x 1.28 m </td>
                </tr>
                <tr>
                  <th>Foyer </th>
                  <td>2.15 x 1.28 m </td>
                </tr>
                <tr>
                  <th>T&B </th>
                  <td>2.15 x 1.28 m </td>
                </tr>
                <tr>
                  <th>T&B </th>
                  <td>2.15 x 1.28 m </td>
                </tr>
                <tr>
                  <th>Open Kitchen </th>
                  <td>4.25 x 2.65 m</td>
                </tr>
                <tr>
                  <th>Family Living </th>
                  <td>6.10 x 4.00 m</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="col-f">
            <div className="info-tec-floor">
              <div className="floor-tit">FIRST FLOOR</div>
              <div className="tre-f">Area : 90 m&#178; </div>
              <table>
                <tr>
                  <th>Bedroom </th>
                  <td>4.40 x 3.28 m</td>
                </tr>
                <tr>
                  <th>Bedroom </th>
                  <td>4.40 x 3.28 m</td>
                </tr>
                <tr>
                  <th>Lobby </th>
                  <td>3.70 x 2.25 m </td>
                </tr>
                <tr>
                  <th>T&B </th>
                  <td>2.10 x 1.95 m </td>
                </tr>
                <tr>
                  <th>T&B </th>
                  <td>2.05 x 1.40 m </td>
                </tr>
                <tr>
                  <th>Master Bedroom </th>
                  <td>5.05 x 3.80 m</td>
                </tr>
                <tr>
                  <th>Closet </th>
                  <td>3.80 x 1.50 m</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="col-f">
            <div className="info-tec-floor">
              <div className="floor-tit">ROOF FLOOR</div>
              <div className="tre-f">Area : 47 m&#178; </div>
              <table>
                <tr>
                  <th>Bedroom </th>
                  <td>3.80 x 3.23 m</td>
                </tr>
                <tr>
                  <th>Bedroom </th>
                  <td>3.80 x 3.23 m</td>
                </tr>
                <tr>
                  <th>Lobby </th>
                  <td>3.30 x 2.85 m </td>
                </tr>
                <tr>
                  <th>T&B </th>
                  <td>2.10 x 1.50 m </td>
                </tr>
                <tr>
                  <th>Balcony</th>
                  <td>6.65x 6.00 m </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </Slide>
    </>
  );
};
export default Floors;
