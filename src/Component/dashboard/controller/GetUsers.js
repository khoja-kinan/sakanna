import axios from "axios";
import { userListUrl } from "../constants/urls";
import { useCookies } from "react-cookie";

function GetUsers() {
  const [cookies, setCookie] = useCookies(["user"]);
  const token = cookies.token;
  if (token === null) return null;
  let result = null;
  axios
    .get(userListUrl, {
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
}
export default GetUsers;
