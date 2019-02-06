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
  onChangeCurrencyFrom = (name, target) => {
    const { setFieldValue } = this.props;
    setFieldValue("fromWallet", target.props.value);
  };
  onChangeCurrencyTo = (name, target) => {
    const { setFieldValue } = this.props;
    setFieldValue("toWallet", target.props.value);
  };
  render() {
    const {
      t,
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

    const { fromWallet, toWallet } = values;
    const selected =
      wallets.find(wallet => wallet.currency === fromWallet) || {};

    const isAllow = values => {
      const { floatValue, formattedValue, value, fromWallet } = values;
      return (
        formattedValue === "" ||
        (validateFraction(value, fromWallet) &&
          floatValue <= parseFloat(availableToWithdrawal))
      );
    };

    const setMaxAmount = () => {
      setFieldValue(
        "amount",
        formatCurrencyValue(availableToWithdrawal, fromWallet)
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
          <GVFormikField
            name="fromWallet"
            component={GVTextField}
            label={t("wallet-transfer.from")}
            InputComponent={Select}
            onChange={this.onChangeCurrencyFrom}
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
          <StatisticItem label={t("wallet-transfer.availableFrom")}>
            {`${formatCurrencyValue(
              availableToWithdrawal,
              fromWallet
            )} ${fromWallet}`}
          </StatisticItem>
        </div>
        <div className="dialog__bottom">
          <GVFormikField
            name="toWallet"
            component={GVTextField}
            label={t("wallet-transfer.to")}
            InputComponent={Select}
            onChange={this.onChangeCurrencyTo}
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
          <StatisticItem label={t("wallet-transfer.availableTo")}>
            {`${formatCurrencyValue(
              availableToWithdrawal,
              toWallet
            )} ${toWallet}`}
          </StatisticItem>
          <div className="dialog-field">
            <InputAmountField
              name="amount"
              label={t("wallet-transfer.amount")}
              currency={fromWallet}
              isAllow={isAllow}
              setMax={setMaxAmount}
            />
          </div>
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

export default compose(
  translate(),
  withFormik({
    displayName: "wallet-transfer",
    mapPropsToValues: props => {
      let currency = props.currentWallet ? props.currentWallet.currency : "GVT";
      if (!props.wallets.find(wallet => wallet.currency === currency)) {
        currency = props.wallets[0] ? props.wallets[0].currency : "";
      }
      return { fromWallet: currency, amount: "", toWallet: "GVT" }; //@todo когда будет приходить несколько кошельков, нужно сделать, чтобы кошелек from, to не совпадали
    },
    validationSchema: ({ t, availableToWithdrawal }) =>
      object().shape({
        amount: number().max(
          availableToWithdrawal,
          t("wallet-transfer.validation.amount-more-than-available")
        )
      }),
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(WalletTransferForm);
