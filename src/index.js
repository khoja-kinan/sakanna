import React from "react";
import ReactDOM from "react-dom/client";
import './i18n';
import App from "./App";
import "./App.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

    <App />
  </BrowserRouter>
);
