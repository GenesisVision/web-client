import "./wallet-transfer-form.scss";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { getWalletIcon } from "shared/components/wallet/components/wallet-currency";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatValue, validateFraction } from "shared/utils/formatter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { ethWalletValidator } from "shared/utils/validators/validators";
import { number, object, string } from "yup";

class WalletTransferForm extends Component {
  onChangeCurrency = (name, target) => {
    const { setFieldValue } = this.props;
    setFieldValue("currency", target.props.value);
  };
  render() {
    const {
      t,
      twoFactorEnabled,
      handleSubmit,
      availableToWithdrawal,
      wallets,
      values,
      disabled,
      isValid,
      dirty,
      errorMessage,
      setFieldValue
    } = this.props;

    const { currency, amount } = values;
    const selected = wallets.find(wallet => wallet.currency === currency) || {};

    const { commission = null, rateToGvt = null } = selected;

    const willGet = Math.max(
      convertFromCurrency(amount, rateToGvt) - commission,
      0
    );

    const isAllow = values => {
      const { floatValue, formattedValue, value, currency } = values;
      return (
        formattedValue === "" ||
        (validateFraction(value, currency) &&
          floatValue <= parseFloat(availableToWithdrawal))
      );
    };

    const setMaxAmount = () => {
      setFieldValue(
        "amount",
        formatCurrencyValue(availableToWithdrawal, currency)
      );
    };

    return (
      <form
        id="wallet-transfer"
        className="wallet-transfer-popup"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{t("wallet-transfer.title")}</h2>
          </div>
          <div className="dialog-field">
            <div className="gv-text-field__wrapper">
              <StatisticItem label={t("wallet-transfer.available")} big>
                {`${formatCurrencyValue(
                  availableToWithdrawal,
                  currency
                )} ${currency}`}
              </StatisticItem>
            </div>
          </div>
          <GVFormikField
            name="currency"
            component={GVTextField}
            label={t("wallet-transfer.from")}
            InputComponent={Select}
            onChange={this.onChangeCurrency}
          >
            {wallets.map(wallet => {
              return (
                <option value={wallet.currency} key={wallet.currency}>
                  <img
                    src={getWalletIcon(wallet.currency)}
                    className="wallet-transfer-popup__icon"
                    alt={wallet.currency}
                  />
                  {`${wallet.description} | ${wallet.currency}`}
                </option>
              );
            })}
          </GVFormikField>
        </div>
        <div className="dialog__bottom">
          <InputAmountField
            name="amount"
            label={t("wallet-transfer.amount")}
            currency={currency}
            isAllow={isAllow}
            setMax={setMaxAmount}
          />
          <div className="dialog-field">
            <div className="gv-text-field__wrapper">
              <StatisticItem label={t("wallet-transfer.available")} big>
                {`${formatCurrencyValue(
                  availableToWithdrawal,
                  currency
                )} ${currency}`}
              </StatisticItem>
            </div>
          </div>
          <GVFormikField
            name="currency"
            component={GVTextField}
            label={t("wallet-transfer.to")}
            InputComponent={Select}
            onChange={this.onChangeCurrency}
          >
            {wallets.map(wallet => {
              return (
                <option value={wallet.currency} key={wallet.currency}>
                  <img
                    src={getWalletIcon(wallet.currency)}
                    className="wallet-transfer-popup__icon"
                    alt={wallet.currency}
                  />
                  {`${wallet.description} | ${wallet.currency}`}
                </option>
              );
            })}
          </GVFormikField>
          <div className="form-error">{errorMessage}</div>
          <div className="dialog__buttons">
            <GVButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={disabled || !isValid || !dirty}
            >
              {t("buttons.confirm")}
            </GVButton>
          </div>
          <div className="dialog__info">{t("wallet-transfer.info")}</div>
        </div>
      </form>
    );
  }
}

WalletTransferForm.propTypes = {
  availableToWithdrawal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      commission: PropTypes.number,
      currency: PropTypes.string,
      description: PropTypes.string,
      logo: PropTypes.string,
      rateToGvt: PropTypes.number
    })
  ),
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func
};

const twoFactorvalidator = (t, twoFactorEnabled) => {
  return twoFactorEnabled
    ? string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-transfer.validation.two-factor-6digits"))
        .required(t("wallet-transfer.validation.two-factor-required"))
    : string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-transfer.validation.two-factor-6digits"));
};

export default compose(
  translate(),
  withFormik({
    displayName: "wallet-transfer",
    mapPropsToValues: props => {
      let currency = props.currentWallet ? props.currentWallet.currency : "GVT";
      if (!props.wallets.find(wallet => wallet.currency === currency)) {
        currency = props.wallets[0] ? props.wallets[0].currency : "";
      }
      return { currency, amount: "", address: "", twoFactorCode: "" };
    },
    validationSchema: ({ t, availableToWithdrawal, twoFactorEnabled }) =>
      object().shape({
        amount: number().max(
          availableToWithdrawal,
          t("wallet-transfer.validation.amount-more-than-available")
        ),
        address: ethWalletValidator.required(
          t("wallet-transfer.validation.address-is-required")
        ),
        twoFactorCode: twoFactorvalidator(t, twoFactorEnabled)
      }),
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(WalletTransferForm);
