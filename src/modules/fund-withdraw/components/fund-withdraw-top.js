import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { formatValue } from "utils/formatter";

const FundWithdrawTop = ({ t, availableToWithdraw, title, type }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("withdraw-fund.title")}</h2>
        <p>{title}</p>
      </div>
      <div className="dialog-field">
        <div className="dialog-field__description">
          {type === "withdraw-program" &&
            t("withdraw-fund.available-to-withdraw")}
          {type === "withdraw-fund" && t("withdraw-fund.available-to-withdraw")}
        </div>
        <div className="dialog-field__value">
          {formatValue(availableToWithdraw)} GVT
        </div>
      </div>
    </div>
  );
};

FundWithdrawTop.propTypes = {
  availableToWithdraw: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default translate()(FundWithdrawTop);
