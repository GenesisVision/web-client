import { Modal } from "reactstrap";
import React from "react";

import "./popup.css";

import {
  TRADER_DEPOSIT_POPUP,
  TRADER_WITHDRAW_POPUP
} from "../../actions/popup-actions.constants";

import TraderDepositContainer from "../../../program-deposit/components/program-deposit-container/program-deposit-container";
import traderWithdrawContainer from "../../../program-withdraw/components/trader-withdraw-container/program-withdraw-container";
const POPUP_COMPONENTS = {
  [TRADER_DEPOSIT_POPUP]: TraderDepositContainer,
  [TRADER_WITHDRAW_POPUP]: traderWithdrawContainer
};

const Popup = ({ isOpen, type, onSubmitPopup, onClosePopup, popupProps }) => {
  const SpecificPopup = POPUP_COMPONENTS[type];
  return (
    <Modal isOpen={isOpen} toggle={onClosePopup} className="popup-dialog">
      <SpecificPopup
        submitPopup={onSubmitPopup}
        closePopup={onClosePopup}
        {...popupProps}
      />
    </Modal>
  );
};

export default Popup;
