import "./details-description-control.scss";

import React from "react";

const DetailsDescriptionControl = ({ t, children, text }) => (
  <div className="details-description-control">
    <div className="details-description-control__text">{text}</div>
    {children}
  </div>
);

export default DetailsDescriptionControl;
