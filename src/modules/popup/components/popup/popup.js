import { Modal } from "reactstrap";
import React from "react";

import "./popup.css";

import {
  TRADER_DEPOSIT_POPUP,
  TRADER_WITHDRAW_POPUP
} from "../../actions/popup-actions.constants";

import TraderDepositContainer from "../../../trader-deposit/components/trader-deposit-container/trader-deposit-container";
import traderWithdrawContainer from "../../../trader-withdraw/components/trader-withdraw-container/trader-withdraw-container";
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
