import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { translate } from "react-i18next";

const InvestTop = ({ info, t }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("invest-popup.title")}</h2>
        <p>{info.title}</p>
      </div>
      <div className="dialog-field">
        <div className="dialog-field__description">
          {t("invest-popup.available-to-invest")}
        </div>
        <div className="dialog-field__value">{info.availableToInvest} GVT</div>
      </div>
      <div className="dialog-field">
        <div className="dialog-field__description">
          {t("invest-popup.available-in-wallet")}
        </div>
        <div className="dialog-field__value">{info.availableInWallet} GVT</div>
      </div>
    </div>
  );
};

InvestTop.propTypes = {};

export default translate()(InvestTop);
