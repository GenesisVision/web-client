import React from "react";

import CloseIcon from "./close-icon";

import "./popup-header.css";

const PopupHeader = ({ header, onClose }) => {
  return (
    <div className="popup-header">
      <div className="popup-header__text">{header}</div>
      <div className="popup-header__close">
        <span onClick={onClose}>
          <CloseIcon />
        </span>
      </div>
    </div>
  );
};

export default PopupHeader;
