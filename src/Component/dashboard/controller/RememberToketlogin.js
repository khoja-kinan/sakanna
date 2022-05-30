import axios from "axios";

export const RememberToketlogin = async (remember) => {
  let result = null;
  await axios
    .post(
      "http://90.153.255.50/socialmediafamous/public/api/admin/login_via_token",
      { token: remember },
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
