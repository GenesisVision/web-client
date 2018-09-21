import Select from "components/select/select";
import { withFormik } from "formik";
import { GVFormikField, GVTextField } from "gv-react-components";
import { CURRENCY_VALUES } from "modules/currency-select/currency-select.constants";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";

const WalletAddFundsTop = ({ t, values }) => {
  return (
    <form id="add-funds" className="dialog__top">
      <div className="dialog__header">
        <h2>{t("wallet-add-funds.title")}</h2>
      </div>
      <GVFormikField
        name="currency"
        component={GVTextField}
        label={t("wallet-add-funds.select-currency")}
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
      <GVFormikField
        name="amount"
        label={t("wallet-add-funds.will-send")}
        component={GVTextField}
        adornment="GVT"
        autoComplete="off"
        InputComponent={NumberFormat}
        allowNegative={false}
      />
      <div className="gv-text-field__wrapper">
        <label className="gv-text-field__label gv-text-field__label--shrink">
          {t("wallet-add-funds.will-get")}
        </label>
        <div className="gv-text-field wallet-add-funds-popup__will-get">
          <div className="gv-text-field__input dialog-field__value">
            {values.amount} GVT
          </div>
        </div>
      </div>
    </form>
  );
};

WalletAddFundsTop.propTypes = {
  currency: PropTypes.string,
  t: PropTypes.func
};

export default compose(
  translate(),
  withFormik({
    displayName: "add-funds",
    mapPropsToValues: () => ({
      currency: "BTC",
      amount: 0
    }),
    onSubmit: values => console.info(values)
  })
)(WalletAddFundsTop);
