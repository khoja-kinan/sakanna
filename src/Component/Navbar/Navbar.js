import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import SearchIcon from '@mui/icons-material/Search';
import Logo from "../Image/logo.png";
import Button from "@mui/material/Button";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Language } from "@material-ui/icons";
import Select from "react-select";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

const Navbar = () => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <navbar className="nav">
        <div className="flex-nav">
          <NavLink to="/">
            <img src={Logo} className="logo" alt="" />
          </NavLink>
          <div>
            <input type="checkbox" id="toggler" />
            <label for="toggler">
              {" "}
              <MenuRoundedIcon />
            </label>
            <div className="nav-link menu">
              <ul className="uli list">
                <li className="nav-item">
                  <LanguageOutlinedIcon fontSize="small" color="action" />
                  {i18n.language === "en" && (
                    <button
                      className="langi"
                      onClick={() => i18n.changeLanguage("ar")}
                    >
                      العربية
                    </button>
                  )}
                  {i18n.language === "ar" && (
                    <button
                      className="langi"
                      onClick={() => i18n.changeLanguage("en")}
                    >
                      en
                    </button>
                  )}
                </li>

                <li className="nav-item">
                  <a className="re" href="/">
                    <LocalPhoneRoundedIcon fontSize="small" color="action" />
                    CALL US +966138813760
                  </a>
                </li>
                <li className="nav-item">
                  <a className="re" href="whatsapp://send?phone=053-000-9234">
                    <WhatsAppIcon fontSize="small" color="action" /> SALES &
                    SUPPORT
                  </a>
                </li>
                <li className="nav-item">
                  <Button
                    variant="outlined"
                    className="iopl"
                    LinkComponent={NavLink}
                    to="/contact"
                  >
                    Contact Us
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </navbar>
    </>
  );
};
export default Navbar;
