import "./wallet-transfer-form.scss";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { getWalletIcon } from "shared/components/wallet/components/wallet-currency";
import { validateFraction } from "shared/utils/formatter";
import { formatCurrencyValue } from "shared/utils/formatter";

import filesService from "../../../services/file-service";

const getWalletsTo = (wallets, newCurrencyFrom) => {
  const index = wallets.findIndex(
    wallet => wallet.currency === newCurrencyFrom
  );
  const walletsTo = [...wallets];
  walletsTo.splice(index, 1);
  return walletsTo;
};

class WalletTransferForm extends Component {
  onChangeCurrencyFrom = (name, target) => {
    const { setFieldValue, values } = this.props;
    const currencyFromNew = target.props.value;
    if (currencyFromNew === values.currencyTo) {
      setFieldValue("currencyTo", values.currencyFrom);
    }
    setFieldValue("currencyFrom", currencyFromNew);
  };

  onChangeCurrencyTo = (name, target) => {
    const { setFieldValue } = this.props;
    setFieldValue("currencyTo", target.props.value);
  };

  render() {
    const {
      t,
      handleSubmit,
      wallets,
      values,
      disabled,
      isValid,
      dirty,
      errorMessage,
      setFieldValue
    } = this.props;

    const { currencyFrom, currencyTo } = values;

    const walletsTo = getWalletsTo(wallets, currencyFrom);

    const selectedFromWallet =
      wallets.find(wallet => wallet.currency === currencyFrom) || {};

    const availableToWithdrawalFrom = selectedFromWallet.availableToWithdrawal;

    const selectedToWallet =
      walletsTo.find(wallet => wallet.currency === currencyTo) || {};

    const availableToWithdrawalTo = selectedToWallet.availableToWithdrawal;

    const isAllow = values => {
      const { floatValue, formattedValue, value, currencyFrom } = values;
      return (
        formattedValue === "" ||
        (validateFraction(value, currencyFrom) &&
          floatValue <= parseFloat(availableToWithdrawalFrom))
      );
    };

    const setMaxAmount = () => {
      setFieldValue(
        "amount",
        formatCurrencyValue(availableToWithdrawalFrom, currencyFrom)
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
            name="currencyFrom"
            component={GVTextField}
            label={t("wallet-transfer.from")}
            InputComponent={Select}
            onChange={this.onChangeCurrencyFrom}
          >
            {wallets.map(wallet => {
              return (
                <option value={wallet.currency} key={wallet.currency}>
                  <img
                    src={filesService.getFileUrl(wallet.logo)}
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
              availableToWithdrawalFrom,
              currencyFrom
            )} ${currencyFrom}`}
          </StatisticItem>
        </div>
        <div className="dialog__bottom">
          <GVFormikField
            name="currencyTo"
            component={GVTextField}
            label={t("wallet-transfer.to")}
            InputComponent={Select}
            onChange={this.onChangeCurrencyTo}
          >
            {walletsTo.map(wallet => {
              return (
                <option value={wallet.currency} key={wallet.currency}>
                  <img
                    src={filesService.getFileUrl(wallet.logo)}
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
              availableToWithdrawalTo,
              currencyTo
            )} ${currencyTo}`}
          </StatisticItem>
          <div className="dialog-field">
            <InputAmountField
              name="amount"
              label={t("wallet-transfer.amount")}
              currency={currencyFrom}
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
      const { currencyWallet, wallets } = props;
      if (!wallets === undefined || wallets.length <= 1) return null;
      let currencyFrom = currencyWallet ? currencyWallet.currency : "GVT";
      if (!wallets.find(wallet => wallet.currency === currencyFrom)) {
        currencyFrom = wallets[0].currency;
      }
      const walletTo = getWalletsTo(wallets, currencyFrom);
      const currencyTo = walletTo.length ? walletTo[0].currency : "";
      return { currencyFrom, amount: "", currencyTo };
    },
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(WalletTransferForm);
