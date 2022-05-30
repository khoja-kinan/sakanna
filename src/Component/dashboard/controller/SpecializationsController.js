import axios from "axios";
import { specializationsListUrl } from "../constants/urls";

export const getSpecializations = async () => {
  const token = localStorage.getItem("token");
  if (token === null) return null;
  let result = null;
  await axios
    .get(specializationsListUrl, {
      headers: { Authorization: "Bearer " + token, Accept: "application/json" },
    })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        if (data.status === 1) {
          result = data.data;
        }
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
  return result.data;
};
