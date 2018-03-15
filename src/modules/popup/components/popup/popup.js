import { Modal } from "reactstrap";
import React from "react";

import {
  TRADER_DEPOSIT_POPUP,
  TRADER_WITHDRAW_POPUP
} from "../../actions/popup-actions.constants";

import TraderDepositContainer from "../../../trader-deposit/components/trader-deposit-container/trader-deposit-container";
const POPUP_COMPONENTS = {
  [TRADER_DEPOSIT_POPUP]: TraderDepositContainer,
  [TRADER_WITHDRAW_POPUP]: ""
};

const Popup = ({ isOpen, type, onClosePopup, popupProps }) => {
  const SpecificPopup = POPUP_COMPONENTS[type];
  return (
    <Modal isOpen={isOpen} toggle={onClosePopup}>
      <SpecificPopup closeModal={onClosePopup} {...popupProps} />
    </Modal>
  );
};

export default Popup;
