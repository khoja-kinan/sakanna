import React from "react";
import { Routes, Route, Switch, Navigate } from "react-router-dom";
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
import "./Component/Community/Floors/Floors.scss";
import "./index.scss";
import "./Component/Navbar/Navbar.scss";
import { useTranslation } from "react-i18next";
import "./Component/CustomPopup/CustomPopup";
import "./Component/dashboard/IndexDashboard";
import DashboardLayout from "./Component/dashboard/layouts/dashboard";
import DashboardApp from "./Component/dashboard/pages/DashboardApp";
import User from "./Component/dashboard/pages/User";
import Comunities from "./Component/dashboard/pages/Comunities";
import Privileges from "./Component/dashboard/pages/Privileges";
import Medals from "./Component/dashboard/pages/Medals";
import Countries from "./Component/dashboard/pages/Countries";
import NotFound from "./Component/dashboard/pages/Page404";
import Unauthorized from "./Component/dashboard/pages/Unauthorized";
import IndexDashboard from "./Component/dashboard/IndexDashboard";
import i18n from "./i18n";

const App = () => {
  // const { t, i18n } = useTranslation();
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  // document.documentElement.lang = i18n.language;
  // const { t } = this.props;
  document.documentElement.lang = i18n.language;
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
      <Route path="/login" element={<IndexDashboard />} />

      <Route path="/Dashboard" element={<DashboardLayout />}>
        <Route path="app" element={<DashboardApp />} />

        {/* <Route element={<RequireAuth allowedRoles={[1]} />}> */}
        <Route path="user" element={<User />} />
        {/*  </Route>
        <Route element={<RequireAuth allowedRoles={[13]} />}> */}
        <Route path="comunities" element={<Comunities />} />
        {/*  </Route>
        <Route element={<RequireAuth allowedRoles={[5]} />}> */}
        <Route path="privileges" element={<Privileges />} />
        {/*  </Route>
        <Route element={<RequireAuth allowedRoles={[17]} />}> */}
        <Route path="medals" element={<Medals />} />
        {/*  </Route>
        <Route element={<RequireAuth allowedRoles={[9]} />}> */}
        <Route path="countries" element={<Countries />} />
        {/*  </Route> */}
      </Route>
      {/*  </Route> */}

      {/* Catch All */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="404" />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default App;
