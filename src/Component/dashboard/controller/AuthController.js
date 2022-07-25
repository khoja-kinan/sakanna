import axios from "axios";
import { loginUrl } from "../../../constants/urls";

export const login = async (email, password) => {
  let result = null;
  await axios
    .post(
      loginUrl,
      { email, password },
      { headers: { Accept: "application/json" } }
    )
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((error) => {
      /* console.log(error.response); */
      result = error.response;
    });
  return result;
};
