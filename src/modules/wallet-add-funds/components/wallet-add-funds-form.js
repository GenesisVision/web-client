import GVqr from "components/gv-qr/gv-qr";
import CopyIcon from "components/icon/copy-icon";
import Select from "components/select/select";
import copy from "copy-to-clipboard";
import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { convertToCurrency } from "utils/currency-converter";
import { formatValue } from "utils/formatter";

const WalletAddFundsForm = ({
  t,
  notifySuccess,
  notifyError,
  values,
  wallets
}) => {
  const selected = wallets.find(w => w.currency === values.currency) || {};
  const { address = "", currency = null, rateToGVT = null } = selected;

  const onCopy = () => {
    try {
      copy(address);
      notifySuccess(t("wallet-add-funds.copy-to-clipboard-success"));
    } catch (error) {
      notifyError(t("wallet-add-funds.copy-to-clipboard-error"));
    }
  };

  return (
    <form id="add-funds">
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("wallet-add-funds.title")}</h2>
        </div>
        <GVFormikField
          name="currency"
          component={GVTextField}
          label={t("wallet-add-funds.select-currency")}
          InputComponent={Select}
        >
          {wallets.map(wallet => {
            const { description, currency } = wallet;
            return (
              <option
                value={currency}
                key={currency}
              >{`${description} | ${currency}`}</option>
            );
          })}
        </GVFormikField>
        <GVFormikField
          name="amount"
          label={t("wallet-add-funds.will-send")}
          component={GVTextField}
          adornment={currency}
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
              <NumberFormat
                value={formatValue(convertToCurrency(values.amount, rateToGVT))}
                suffix=" GVT"
                displayType="text"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="dialog__bottom wallet-add-funds-popup__bottom">
        <GVqr className="wallet-add-funds-popup__qr" value={address} />
        <div className="wallet-add-funds-popup__title">
          {t("wallet-add-funds.deposit-address")}
        </div>
        <div className="wallet-add-funds-popup__value">{address}</div>
        <GVButton color="secondary" onClick={onCopy} disabled={!address}>
          <CopyIcon />
          &nbsp;
          {t("buttons.copy")}
        </GVButton>
        <div className="dialog__info">
          {currency !== "GVT" &&
            (currency !== null &&
              t("wallet-add-funds.disclaimer", {
                currency
              }))}
        </div>
      </div>
    </form>
  );
};

WalletAddFundsForm.propTypes = {
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      currency: PropTypes.string,
      rateToGVT: PropTypes.number,
      description: PropTypes.string,
      logo: PropTypes.string
    })
  ),
  t: PropTypes.func
};

export default compose(
  translate(),
  withFormik({
    displayName: "add-funds",
    mapPropsToValues: () => ({
      currency: "",
      amount: ""
    })
  })
)(WalletAddFundsForm);
