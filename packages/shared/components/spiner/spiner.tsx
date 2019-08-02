import "./spinner.scss";

import * as React from "react";

const Spinner: React.FC = React.memo(() => (
  <div className="gv-spinner__wrapper">
    <div className="gv-spinner">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
));

export default Spinner;
