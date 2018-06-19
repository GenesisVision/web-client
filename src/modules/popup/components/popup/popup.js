import { Modal } from "reactstrap";
import React from "react";

import "./popup.css";

const Popup = ({
  isOpen,
  component: Component,
  onSubmitPopup,
  onClosePopup,
  popupProps
}) => {
  return (
    <Modal isOpen={isOpen} toggle={onClosePopup} className="popup-dialog">
      <Component
        submitPopup={onSubmitPopup}
        closePopup={onClosePopup}
        {...popupProps}
      />
    </Modal>
  );
};

export default Popup;
