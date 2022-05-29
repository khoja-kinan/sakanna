import React from "react";
import { Routes, Route, Switch } from "react-router-dom";
import Home from "./Component/Home/Home";
import About from "./Component/About/About";
import Policy from "./Component/Policy/Policy";
import Contact from "./Component/Contact/Contact";
import Error from "./Component/Error/Error";
import Community from "./Component/Community/Community";
import Type from "./Component/Community/Type/Type";
import Results from "./Component/Results/Results";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Component/Home/Home.scss";
import "./Component/Footer/Footer.scss";
import "./Component/Community/Community.scss";
import "./Component/Community/Type/Type.scss";
import "./Component/Community/SliderM.scss";
import "./Component/Slider/Slider.scss";
import "./Component/Results/Results.scss";
import "./Component/Contact/Contact.scss";
import "./Component/ContactForm/ContactForm.scss";
import "./Component/SearchContact/SearchContact.scss";
import "./Component/SearchBar/SearchBar.scss";
import "./index.scss";
import "./Component/Navbar/Navbar.scss";
import { useTranslation } from "react-i18next";
import "./Component/CustomPopup/CustomPopup";

const App = () => {
  const { t, i18n } = useTranslation("common");

  // const { t } = this.props;
  // document.documentElement.lang = i18next.language;
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route exact path="/community/:urlId" element={<Community />} />
      <Route
        exact
        path="/community/:comunityId/type/:typeId"
        element={<Type />}
      />
      <Route path="/results" element={<Results />} />
      <Route element={<Error />} />
    </Routes>
  );
};

export default App;
