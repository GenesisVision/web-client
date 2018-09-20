import Select from "components/select/select";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";

const WalletAddFundsTop = ({ t, currency }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("deposit-program.title")}</h2>
      </div>
      <div className="dialog-field">
        <div className="dialog-field__description">
          {t("deposit-program.available-to-invest")}
        </div>
        <div className="dialog-field__value">
          <Select value={0} onSelect={value => console.info(value)}>
            <option value="0">dfd</option>
            <option value="1">dfd</option>
            <option value="2">dfd</option>
            <option value="3">dfd</option>
          </Select>
        </div>
      </div>
      <div className="dialog-field">
        <div className="dialog-field__description">
          {t("deposit-program.available-in-wallet")}
        </div>
        <div className="dialog-field__value">{234} GVT</div>
      </div>
      <div className="dialog-field">
        <div className="dialog-field__description">
          {t("deposit-program.available-in-wallet")}
        </div>
        <div className="dialog-field__value">{234} GVT</div>
      </div>
    </div>
  );
};

WalletAddFundsTop.propTypes = {
  currency: PropTypes.string,
  t: PropTypes.func
};

export default translate()(WalletAddFundsTop);
