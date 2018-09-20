import "./wallet-add-funds-popup.scss";

import CopyIcon from "components/icon/copy-icon";
import copy from "copy-to-clipboard";
import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import React from "react";
import { translate } from "react-i18next";
import * as uuid from "uuid";

const WalletAddFundsBottom = ({ t, walletId }) => {
  return (
    <div className="dialog__bottom wallet-add-funds-popup__bottom">
      <QRCode
        className="wallet-add-funds-popup__qr"
        value={walletId}
        bgColor={"transparent"}
        fgColor={"white"}
        size={170}
      />
      <div className="wallet-add-funds-popup__title">
        {t("Deposit address")}
      </div>
      <div className="wallet-add-funds-popup__value">{walletId}</div>
      <GVButton
        color="secondary"
        onClick={() => {
          copy(walletId);
        }}
      >
        <CopyIcon />
        &nbsp;
        {t("Copy")}
      </GVButton>
    </div>
  );
};

WalletAddFundsBottom.propTypes = {
  walletId: PropTypes.string.isRequired,
  t: PropTypes.func
};

WalletAddFundsBottom.defaultProps = {
  walletId: uuid.v4()
};

export default translate()(WalletAddFundsBottom);
