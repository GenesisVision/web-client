import React from "react";
import ReactDOM from "react-dom";
import App from "./components/core/App";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
