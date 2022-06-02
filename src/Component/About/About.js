import React from "react";
import { useEffect, useState } from "react";
import Community from "../Community/Community";
import Axios from "axios";

const About = () => {
  const [data, setData] = useState([]);

  const arr = data.map((data, index) => {
    return (
      <tr>
        <td>{data.id}</td>
        <td>{data.name}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>About Page</h1>
      <h1>About Page</h1>

      <h1>About Page</h1>
      <h1>About Page</h1>
      <h1>About Page</h1>
      <h1>About Page</h1>
      <table>
        <tr>
          <th>id</th>
          <th>name</th>
        </tr>
        {arr}
      </table>
    </>
  );
};
export default About;
