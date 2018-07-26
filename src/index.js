import "@fortawesome/fontawesome-free-webfonts/css/fa-solid.css";
import "@fortawesome/fontawesome-free-webfonts/css/fontawesome.css";

import "./i18n";
import "./styles/gv-bootstrap/gv-bootstrap.css";
import "./styles/gv-styles.css";
import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";

import App from "./pages/root";

ReactDOM.render(<App />, document.getElementById("root"));
