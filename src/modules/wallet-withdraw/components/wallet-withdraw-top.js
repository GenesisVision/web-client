import Select from "components/select/select";
import { GVFormikField, GVTextField } from "gv-react-components";
import { CURRENCY_VALUES } from "modules/currency-select/currency-select.constants";
import { convertToCurrency } from "modules/program-deposit/components/program-deposit-form";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

const WalletWithdrawTop = ({ t, currency, amount, rate, available }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("wallet-withdraw.title")}</h2>
      </div>
      <div className="gv-text-field__wrapper">
        <label className="gv-text-field__label gv-text-field__label--shrink">
          {t("wallet-withdraw.available")}
        </label>
        <div className="gv-text-field wallet-withdraw__field">
          <div className="gv-text-field__input dialog-field__value">
            {available} GVT
          </div>
        </div>
      </div>
      <GVFormikField
        name="amount"
        label={t("wallet-withdraw.amount")}
        component={GVTextField}
        adornment="GVT"
        autoComplete="off"
        InputComponent={NumberFormat}
        allowNegative={false}
      />
      <GVFormikField
        name="currency"
        component={GVTextField}
        label={t("wallet-withdraw.select-currency")}
        InputComponent={Select}
      >
        {Object.keys(CURRENCY_VALUES).map(key => {
          return (
            <option value={key} key={key}>{`${
              CURRENCY_VALUES[key]
            } | ${key}`}</option>
          );
        })}
      </GVFormikField>
      <div className="gv-text-field__wrapper">
        <label className="gv-text-field__label gv-text-field__label--shrink">
          {t("wallet-withdraw.will-get")}
        </label>
        <div className="gv-text-field wallet-withdraw__field">
          <div className="gv-text-field__input dialog-field__value">
            {convertToCurrency(amount, rate)} {currency}
          </div>
        </div>
      </div>
    </div>
  );
};

WalletWithdrawTop.propTypes = {};

export default translate()(WalletWithdrawTop);
