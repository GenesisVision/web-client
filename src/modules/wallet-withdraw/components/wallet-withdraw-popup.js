import "./wallet-withdraw-popup.scss";

import Select from "components/select/select";
import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import { convertToCurrency } from "modules/program-deposit/components/program-deposit-form";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";

const RATE_MOCK = {
  BTC: 751.73,
  ETH: 26.75,
  GVT: 1
};

const convertFromCurrency = (amount, rate) => {
  return parseFloat(amount) * parseFloat(rate);
};

const WalletWithdrawPopup = ({ t, values, currencies }) => {
  const rate = RATE_MOCK[values.currency];
  const fee = currencies.filter(item => item.currency === values.currency)[0]
    .commission;
  return (
    <form id="wallet-withdraw" className="wallet-withdraw-popup">
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
              {100} GVT
            </div>
          </div>
        </div>
        <GVFormikField
          name="currency"
          component={GVTextField}
          label={t("wallet-withdraw.select-currency")}
          InputComponent={Select}
        >
          {currencies.map(item => {
            return (
              <option value={item.currency} key={item.currency}>{`${
                item.description
              } | ${item.currency}`}</option>
            );
          })}
        </GVFormikField>
      </div>
      <div className="dialog__bottom">
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
          name="address"
          label={t("wallet-withdraw.address")}
          component={GVTextField}
          autoComplete="off"
        />
        <ul className="dialog-list">
          <li className="dialog-list__item">
            {t("wallet-withdraw.will-get")}
            <span className="dialog-list__value">
              {convertToCurrency(values.amount, rate)} {values.currency}
            </span>
          </li>
          <li className="dialog-list__item">
            {t("wallet-withdraw.fee")}
            <span className="dialog-list__value">
              {fee} {values.currency}
            </span>
          </li>
          <li className="dialog-list__item">
            {t("wallet-withdraw.withdrawing")}
            <span className="dialog-list__value">
              {parseFloat(values.amount) + convertFromCurrency(fee, rate)} GVT
            </span>
          </li>
        </ul>
        <div className="dialog__buttons">
          <GVButton type="submit" variant="contained" color="primary">
            {t("buttons.confirm")}
          </GVButton>
        </div>
        <div className="dialog__info">
          {t("wallet-withdraw.info")}
        </div>
      </div>
    </form>
  );
};

WalletWithdrawPopup.propTypes = {};

export default compose(
  translate(),
  withFormik({
    displayName: "wallet-withdraw",
    mapPropsToValues: () => ({
      amount: "",
      currency: "BTC",
      address: ""
    }),
    onSubmit: values => console.info(values)
  })
)(WalletWithdrawPopup);
