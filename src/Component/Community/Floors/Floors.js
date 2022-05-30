import React from "react";
import Slide from "react-reveal/Slide";

const Floors = ({ floors }) => {
  console.log(floors);
  return (
    <>
      <Slide left>
        <div className="floors-cols">
          {floors.map((floor) => (
            <div className="col-f" key={floor.id}>
              <div className="info-tec-floor">
                <div className="floor-tit">{floor.name}</div>
                <div className="tre-f">Area : {floor.area} m&#178; </div>
                <table>
                  <tbody>
                    {floor.Majlis && (
                      <tr>
                        <th>Majlis </th>
                        <td>{floor.Majlis}</td>
                      </tr>
                    )}
                    {floor.Foyer1 && (
                      <tr>
                        <th>Foyer 1 </th>
                        <td>{floor.Foyer1}</td>
                      </tr>
                    )}
                    {floor.Foyer2 && (
                      <tr>
                        <th>Foyer 2 </th>
                        <td>{floor.Foyer2}</td>
                      </tr>
                    )}
                    {floor.TandB1 && (
                      <tr>
                        <th>T&B 1</th>
                        <td>{floor.TandB1}</td>
                      </tr>
                    )}
                    {floor.TandB2 && (
                      <tr>
                        <th>T&B 2</th>
                        <td>{floor.TandB2}</td>
                      </tr>
                    )}
                    {floor.TandB3 && (
                      <tr>
                        <th>T&B 3</th>
                        <td>{floor.TandB3}</td>
                      </tr>
                    )}
                    {floor.Open_Kitchen && (
                      <tr>
                        <th>Open Kitchen</th>
                        <td>{floor.Open_Kitchen}</td>
                      </tr>
                    )}
                    {floor.Family_Living && (
                      <tr>
                        <th>Family Living</th>
                        <td>{floor.Family_Living}</td>
                      </tr>
                    )}
                    {floor.Bedroom1 && (
                      <tr>
                        <th>Bedroom 1</th>
                        <td>{floor.Bedroom1}</td>
                      </tr>
                    )}
                    {floor.Bedroom2 && (
                      <tr>
                        <th>Bedroom 2</th>
                        <td>{floor.Bedroom2}</td>
                      </tr>
                    )}
                    {floor.Lobby && (
                      <tr>
                        <th>Lobby</th>
                        <td>{floor.Lobby}</td>
                      </tr>
                    )}
                    {floor.Master_Bedroom && (
                      <tr>
                        <th>Master Bedroom</th>
                        <td>{floor.Master_Bedroom}</td>
                      </tr>
                    )}
                    {floor.Closet && (
                      <tr>
                        <th>Closet</th>
                        <td>{floor.Closet}</td>
                      </tr>
                    )}
                    {floor.Balcony && (
                      <tr>
                        <th>Balcony</th>
                        <td>{floor.Balcony}</td>
                      </tr>
                    )}
                    {floor.Balcony1 && (
                      <tr>
                        <th>Balcony 1</th>
                        <td>{floor.Balcony1}</td>
                      </tr>
                    )}
                    {floor.Balcony2 && (
                      <tr>
                        <th>Balcony 2</th>
                        <td>{floor.Balcony2}</td>
                      </tr>
                    )}
                    {floor.Balcony3 && (
                      <tr>
                        <th>Balcony 3</th>
                        <td>{floor.Balcony3}</td>
                      </tr>
                    )}
                    {floor.numberOfApartments && (
                      <tr>
                        <th>Number Of Apartments</th>
                        <td>{floor.numberOfApartments}</td>
                      </tr>
                    )}
                    {floor.numberOfPenthouses && (
                      <tr>
                        <th>Number Of Penthouses</th>
                        <td>{floor.numberOfPenthouses}</td>
                      </tr>
                    )}
                    {floor.percentOfAmenities && (
                      <tr>
                        <th>Percent Of Amenities</th>
                        <td>{floor.percentOfAmenities}</td>
                      </tr>
                    )}
                    {floor.percentOfResidential && (
                      <tr>
                        <th>Percent Of Residential</th>
                        <td>{floor.percentOfResidential}</td>
                      </tr>
                    )}
                    {floor.percentOfServices && (
                      <tr>
                        <th>Percent Of Services</th>
                        <td>{floor.percentOfServices}</td>
                      </tr>
                    )}
                    {floor.totalOutdoorAreas && (
                      <tr>
                        <th>Total Outdoor Areas</th>
                        <td>{floor.totalOutdoorAreas}</td>
                      </tr>
                    )}
                    {floor.carSlots && (
                      <tr>
                        <th>Car Slots</th>
                        <td>{floor.carSlots}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </Slide>
    </>
  );
};
export default Floors;
