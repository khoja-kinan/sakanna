// import useState from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Mslider from "./Mslider";
import { makeStyles } from "@material-ui/core";
import Slider from "../Slider/Slider";
import SearchBar from "../SearchBar/SearchBar";
import Slide from "react-reveal/Slide";
import { useTranslation, initReactI18next } from "react-i18next";
import axios from "axios";
import state from "react";
import map from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { GetAllCommunities } from "../../constants/urls";
import { LinearProgress } from "@mui/material";

const Home = () => {
  const { t, i18n } = useTranslation();
  // const classes = useStyles();
  // const [Community, setCommunity] = useState('');
  // const [Type, setType] = useState('');
  // const [Price, setPrice] = useState('');
  // const handleChange = (event) => { setPrice(event.target.value); };
  // const [value, setValue] = useState("");
  // const handleChange = e => setValue(e.target.value)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const [loading, setLoading] = useState(true);
  const [allCommunities, setAllCommunities] = useState();
  useEffect(() => {
    async function fecthData() {
      await axios
        .get(GetAllCommunities)
        .then((response) => {
          if (response.statusText === "OK") {
            const data = response.data;
            setAllCommunities(data);
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
      <div id="home">
        <Slider />
        <div role="navigation" className="ki">
          <div id="menuToggle">
            <input type="checkbox" />
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 26L20.2 20.2M23.3333 12.6667C23.3333 18.5577 18.5577 23.3333 12.6667 23.3333C6.77563 23.3333 2 18.5577 2 12.6667C2 6.77563 6.77563 2 12.6667 2C18.5577 2 23.3333 6.77563 23.3333 12.6667Z"
                stroke="#8c7a6a"
                stroke-width="3.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div id="menu">
              <div className="res">
                <SearchBar className="res" />
              </div>
            </div>
          </div>
        </div>
        <div className="ni">
          <SearchBar />
        </div>
        <div className="comun">
          <div className="title">
            <div className="sup">
              <p className="sup-tit">{t('home.COMMUNITIES')}</p>
              <hr className="gr"></hr>
            </div>
            <p className="main-tit">{t('home.LATEST LAUNCHES')}</p>
          </div>
          <Mslider allCommunities={allCommunities} />
        </div>
        <div className="social-bar">
          <Slide left cascade>
            <p className="soc">{t('home.Follow us on Social Media')}</p>
          </Slide>
          <Slide right cascade>
            <div className="soc-t">
              <svg
                className="svg0"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4.32187C30.4125 4.32187 31.1719 4.35 33.6938 4.4625C36.0375 4.56562 37.3031 4.95938 38.1469 5.2875C39.2625 5.71875 40.0688 6.24375 40.9031 7.07812C41.7469 7.92188 42.2625 8.71875 42.6938 9.83438C43.0219 10.6781 43.4156 11.9531 43.5188 14.2875C43.6313 16.8187 43.6594 17.5781 43.6594 23.9813C43.6594 30.3938 43.6313 31.1531 43.5188 33.675C43.4156 36.0188 43.0219 37.2844 42.6938 38.1281C42.2625 39.2438 41.7375 40.05 40.9031 40.8844C40.0594 41.7281 39.2625 42.2438 38.1469 42.675C37.3031 43.0031 36.0281 43.3969 33.6938 43.5C31.1625 43.6125 30.4031 43.6406 24 43.6406C17.5875 43.6406 16.8281 43.6125 14.3063 43.5C11.9625 43.3969 10.6969 43.0031 9.85313 42.675C8.7375 42.2438 7.93125 41.7188 7.09688 40.8844C6.25313 40.0406 5.7375 39.2438 5.30625 38.1281C4.97813 37.2844 4.58438 36.0094 4.48125 33.675C4.36875 31.1438 4.34063 30.3844 4.34063 23.9813C4.34063 17.5688 4.36875 16.8094 4.48125 14.2875C4.58438 11.9437 4.97813 10.6781 5.30625 9.83438C5.7375 8.71875 6.2625 7.9125 7.09688 7.07812C7.94063 6.23438 8.7375 5.71875 9.85313 5.2875C10.6969 4.95938 11.9719 4.56562 14.3063 4.4625C16.8281 4.35 17.5875 4.32187 24 4.32187ZM24 0C17.4844 0 16.6688 0.028125 14.1094 0.140625C11.5594 0.253125 9.80625 0.665625 8.2875 1.25625C6.70312 1.875 5.3625 2.69062 4.03125 4.03125C2.69063 5.3625 1.875 6.70313 1.25625 8.27813C0.665625 9.80625 0.253125 11.55 0.140625 14.1C0.028125 16.6687 0 17.4844 0 24C0 30.5156 0.028125 31.3312 0.140625 33.8906C0.253125 36.4406 0.665625 38.1938 1.25625 39.7125C1.875 41.2969 2.69063 42.6375 4.03125 43.9688C5.3625 45.3 6.70313 46.125 8.27813 46.7344C9.80625 47.325 11.55 47.7375 14.1 47.85C16.6594 47.9625 17.475 47.9906 23.9906 47.9906C30.5063 47.9906 31.3219 47.9625 33.8813 47.85C36.4313 47.7375 38.1844 47.325 39.7031 46.7344C41.2781 46.125 42.6188 45.3 43.95 43.9688C45.2812 42.6375 46.1063 41.2969 46.7156 39.7219C47.3063 38.1938 47.7188 36.45 47.8313 33.9C47.9438 31.3406 47.9719 30.525 47.9719 24.0094C47.9719 17.4938 47.9438 16.6781 47.8313 14.1188C47.7188 11.5688 47.3063 9.81563 46.7156 8.29688C46.125 6.70312 45.3094 5.3625 43.9688 4.03125C42.6375 2.7 41.2969 1.875 39.7219 1.26562C38.1938 0.675 36.45 0.2625 33.9 0.15C31.3313 0.028125 30.5156 0 24 0Z"
                  fill="white"
                />
                <path
                  d="M24 11.6719C17.1938 11.6719 11.6719 17.1938 11.6719 24C11.6719 30.8062 17.1938 36.3281 24 36.3281C30.8062 36.3281 36.3281 30.8062 36.3281 24C36.3281 17.1938 30.8062 11.6719 24 11.6719ZM24 31.9969C19.5844 31.9969 16.0031 28.4156 16.0031 24C16.0031 19.5844 19.5844 16.0031 24 16.0031C28.4156 16.0031 31.9969 19.5844 31.9969 24C31.9969 28.4156 28.4156 31.9969 24 31.9969Z"
                  fill="white"
                />
                <path
                  d="M39.6937 11.1843C39.6937 12.778 38.4 14.0624 36.8156 14.0624C35.2219 14.0624 33.9375 12.7687 33.9375 11.1843C33.9375 9.59053 35.2313 8.30615 36.8156 8.30615C38.4 8.30615 39.6937 9.5999 39.6937 11.1843Z"
                  fill="white"
                />
              </svg>

              <svg
                className="svg0"
                viewBox="0 0 41 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.1451 0H22.0556V32.6956C22.0556 36.5913 18.9444 39.7913 15.0725 39.7913C11.2007 39.7913 8.08938 36.5913 8.08938 32.6956C8.08938 28.8696 11.1315 25.7391 14.8651 25.6V17.3913C6.63744 17.5304 0 24.2783 0 32.6956C0 41.1827 6.77571 48 15.1417 48C23.5075 48 30.2833 41.1131 30.2833 32.6956V15.9304C33.3255 18.1565 37.059 19.4783 41 19.5479V11.3391C34.9157 11.1304 30.1451 6.12173 30.1451 0Z"
                  fill="white"
                />
              </svg>

              <svg
                className="svg0"
                viewBox="0 0 48 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.1003 39.0014C33.2091 39.0014 43.1166 23.9949 43.1166 10.9852C43.1166 10.5633 43.1072 10.1321 43.0884 9.71019C45.0158 8.31639 46.679 6.58997 48 4.61206C46.205 5.41066 44.2993 5.93223 42.3478 6.15894C44.4026 4.92728 45.9411 2.99241 46.6781 0.712998C44.7451 1.85858 42.6312 2.66669 40.4269 3.10269C38.9417 1.52459 36.978 0.479697 34.8394 0.129567C32.7008 -0.220564 30.5064 0.143566 28.5955 1.16566C26.6846 2.18775 25.1636 3.81088 24.2677 5.78409C23.3718 7.7573 23.1509 9.9707 23.6391 12.0821C19.725 11.8856 15.8959 10.8689 12.4 9.09766C8.90405 7.32645 5.81939 4.84034 3.34594 1.8005C2.0888 3.96795 1.70411 6.53276 2.27006 8.97365C2.83601 11.4145 4.31013 13.5484 6.39281 14.9414C4.82926 14.8918 3.29995 14.4708 1.93125 13.7133V13.8352C1.92985 16.1098 2.7162 18.3146 4.15662 20.075C5.59704 21.8354 7.60265 23.0426 9.8325 23.4914C8.38411 23.8877 6.86396 23.9455 5.38969 23.6602C6.01891 25.6163 7.24315 27.3272 8.89154 28.5541C10.5399 29.781 12.5302 30.4627 14.5847 30.5039C11.0968 33.2437 6.78835 34.7297 2.35313 34.7227C1.56657 34.7215 0.780798 34.6733 0 34.5783C4.50571 37.469 9.74706 39.0042 15.1003 39.0014Z"
                  fill="white"
                />
              </svg>

              <svg
                className="svg0"
                viewBox="0 0 48 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.5219 7.28438C47.5219 7.28438 47.0531 3.975 45.6094 2.52188C43.7812 0.609375 41.7375 0.6 40.8 0.4875C34.0875 -2.68221e-07 24.0094 0 24.0094 0H23.9906C23.9906 0 13.9125 -2.68221e-07 7.2 0.4875C6.2625 0.6 4.21875 0.609375 2.39062 2.52188C0.946875 3.975 0.4875 7.28438 0.4875 7.28438C0.4875 7.28438 0 11.175 0 15.0563V18.6937C0 22.575 0.478125 26.4656 0.478125 26.4656C0.478125 26.4656 0.946875 29.775 2.38125 31.2281C4.20937 33.1406 6.60938 33.075 7.67813 33.2812C11.5219 33.6469 24 33.7594 24 33.7594C24 33.7594 34.0875 33.7406 40.8 33.2625C41.7375 33.15 43.7812 33.1406 45.6094 31.2281C47.0531 29.775 47.5219 26.4656 47.5219 26.4656C47.5219 26.4656 48 22.5844 48 18.6937V15.0563C48 11.175 47.5219 7.28438 47.5219 7.28438ZM19.0406 23.1094V9.61875L32.0062 16.3875L19.0406 23.1094Z"
                  fill="white"
                />
              </svg>

              <svg
                className="svg0"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.8265 34.5652C47.4955 33.6582 46.8582 33.1679 46.135 32.7757C46.0001 32.7021 45.8776 32.6286 45.7673 32.5796C45.5466 32.4693 45.326 32.3589 45.1054 32.2486C42.8501 31.0474 41.085 29.552 39.8716 27.7625C39.5284 27.26 39.2219 26.7206 38.9768 26.1691C38.8665 25.8749 38.8787 25.7033 38.9523 25.544C39.0258 25.4214 39.1239 25.3233 39.2464 25.2375C39.6387 24.9801 40.0309 24.7227 40.3006 24.5511C40.7786 24.2324 41.1708 23.9873 41.416 23.8157C42.3353 23.1661 42.9849 22.4797 43.3894 21.7075C43.9655 20.6288 44.039 19.3663 43.5977 18.2264C42.9849 16.6085 41.465 15.6156 39.6142 15.6156C39.2219 15.6156 38.842 15.6524 38.4497 15.7382C38.3517 15.7627 38.2414 15.7872 38.1433 15.8118C38.1556 14.7086 38.131 13.5442 38.033 12.392C37.6898 8.35939 36.2679 6.25116 34.7971 4.57193C33.8533 3.51781 32.7501 2.62304 31.5122 1.92438C29.2814 0.649631 26.7441 0 23.9863 0C21.2284 0 18.7034 0.649631 16.4726 1.92438C15.2346 2.62304 14.1315 3.51781 13.1877 4.57193C11.7168 6.25116 10.3073 8.37165 9.95179 12.392C9.85373 13.5442 9.82922 14.7086 9.84148 15.8118C9.74342 15.7872 9.64536 15.7627 9.53505 15.7382C9.15507 15.6524 8.76285 15.6156 8.38287 15.6156C6.53204 15.6156 5.01215 16.6207 4.39929 18.2264C3.95803 19.3663 4.03157 20.6288 4.60766 21.7075C5.01215 22.4797 5.66178 23.1661 6.58107 23.8157C6.82621 23.9873 7.20618 24.2324 7.69647 24.5511C7.95387 24.7227 8.33384 24.9679 8.71382 25.213C8.84864 25.2988 8.95896 25.4091 9.04476 25.544C9.1183 25.7033 9.13056 25.8749 9.00799 26.1936C8.76284 26.7329 8.46867 27.26 8.12547 27.7502C6.93653 29.4908 5.22052 30.9739 3.03874 32.1628C1.88657 32.7757 0.685365 33.1802 0.170564 34.5652C-0.209408 35.6071 0.035735 36.7838 1.00405 37.7889C1.35951 38.1566 1.77625 38.4753 2.22977 38.7204C3.17357 39.2352 4.17866 39.6397 5.23278 39.9216C5.45341 39.9829 5.64952 40.0687 5.83338 40.1913C6.18884 40.4977 6.13981 40.9635 6.60558 41.6499C6.83847 42.0053 7.1449 42.3118 7.4881 42.5569C8.48093 43.2433 9.59633 43.2801 10.773 43.3291C11.8394 43.3659 13.0406 43.4149 14.4257 43.8684C15.0017 44.0523 15.5901 44.42 16.2765 44.849C17.9312 45.8664 20.1865 47.2514 23.974 47.2514C27.7615 47.2514 30.029 45.8541 31.696 44.8368C32.3824 44.42 32.9708 44.0523 33.5223 43.8684C34.8951 43.4149 36.1086 43.3659 37.175 43.3291C38.3517 43.2801 39.4671 43.2433 40.4599 42.5569C40.8767 42.2627 41.2198 41.895 41.465 41.4538C41.8082 40.8777 41.7959 40.4732 42.1146 40.1913C42.2862 40.0687 42.4823 39.9829 42.6785 39.9339C43.7326 39.652 44.7622 39.2475 45.7182 38.7204C46.1963 38.463 46.6375 38.1198 47.0052 37.7153L47.0175 37.7031C47.9736 36.7225 48.2064 35.5703 47.8265 34.5652ZM44.468 36.367C42.4211 37.4947 41.0483 37.3721 39.9941 38.0585C39.0871 38.6346 39.6264 39.8849 38.9768 40.3384C38.1678 40.8899 35.7899 40.3016 32.7256 41.3189C30.1884 42.1524 28.5827 44.5671 24.023 44.5671C19.4634 44.5671 17.8944 42.1647 15.3204 41.3189C12.2561 40.3016 9.87825 40.9022 9.06927 40.3384C8.41964 39.8849 8.9467 38.6346 8.05193 38.0585C6.98556 37.3721 5.62501 37.4947 3.57806 36.367C2.26654 35.6439 3.01423 35.2026 3.44323 34.9942C10.8711 31.4029 12.06 25.8504 12.1091 25.4336C12.1703 24.9311 12.2439 24.5389 11.6923 24.0363C11.1653 23.546 8.81187 22.0874 8.14999 21.6339C7.07135 20.874 6.59333 20.1263 6.94878 19.1947C7.19393 18.5574 7.79453 18.3122 8.41964 18.3122C8.61576 18.3122 8.81187 18.3367 9.00799 18.3735C10.1969 18.6309 11.3491 19.2193 12.011 19.3909C12.0968 19.4154 12.1703 19.4276 12.2561 19.4276C12.6116 19.4276 12.7342 19.2438 12.7097 18.8393C12.6361 17.54 12.4523 15.015 12.6606 12.6494C12.9425 9.40125 13.9844 7.78331 15.2346 6.36147C15.8352 5.67507 18.6421 2.70884 24.023 2.70884C29.4039 2.70884 32.2108 5.66282 32.8114 6.34922C34.0617 7.77105 35.1035 9.389 35.3854 12.6371C35.5938 15.0028 35.4099 17.5278 35.3241 18.827C35.2996 19.256 35.4222 19.4154 35.7777 19.4154C35.8635 19.4154 35.937 19.4031 36.0228 19.3786C36.6847 19.2193 37.8369 18.6187 39.0258 18.3613C39.2219 18.3122 39.418 18.3 39.6142 18.3C40.2393 18.3 40.8399 18.5451 41.085 19.1825C41.4405 20.114 40.9625 20.8617 39.8838 21.6217C39.2342 22.0752 36.8808 23.5338 36.3415 24.0241C35.7899 24.5266 35.8635 24.9188 35.9248 25.4214C35.9738 25.8381 37.1627 31.3906 44.5906 34.982C45.0318 35.1904 45.7673 35.6439 44.468 36.367Z"
                  fill="white"
                />
              </svg>

              <svg
                className="svg0"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z"
                  fill="white"
                />
              </svg>
            </div>
          </Slide>
        </div>
        <div className="plans">
          {/* {this.state.Communities.map(Communities => <div>{Communities.name}</div>)} */}
          {/* {state.Communities.map(Communities =>  <div key={Communities.id}>{Communities.data}</div>)} */}
          <div>{/* <h1>{t('welcome.title', {framework:'React'})}</h1> */}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Home;
