import "./wallet-withdraw-form.scss";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { getWalletIcon } from "shared/components/wallet/components/wallet-currency";
import ArrowIcon from "shared/media/arrow-down.svg";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { formatValue, validateFraction } from "shared/utils/formatter";
import { ethWalletValidator } from "shared/utils/validators/validators";
import { number, object, string } from "yup";

const WalletWithdrawForm = ({
  t,
  twoFactorEnabled,
  handleSubmit,
  availableToWithdrawal,
  wallets,
  currentWallet,
  values,
  disabled,
  isValid,
  dirty,
  errorMessage,
  setFieldValue
}) => {
  const { amount } = values;
  const selected =
    wallets.find(wallet => wallet.currency === currentWallet.currency) || {};

  const { commission = null, rateToGvt = null } = selected;

  const willGet = Math.max(
    convertFromCurrency(amount, rateToGvt) - commission,
    0
  );

  const isAllow = values => {
    const { floatValue, formattedValue, value } = values;
    return (
      formattedValue === "" ||
      (validateFraction(value, "GVT") &&
        floatValue <= parseFloat(availableToWithdrawal))
    );
  };

  const setMaxAmount = () => {
    setFieldValue("amount", formatCurrencyValue(availableToWithdrawal, "GVT"));
  };

  return (
    <form
      id="wallet-withdraw"
      className="wallet-withdraw-popup"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("wallet-withdraw.title")}</h2>
        </div>
        <div className="dialog-field">
          <div className="dialog__row">
            <img
              src={getWalletIcon(currentWallet.currency)}
              className="wallet-withdraw-popup__icon wallet-withdraw-popup__icon--currency"
              alt={currentWallet.currency}
            />
            <StatisticItem
              equivalent={currentWallet.available}
              equivalentCurrency={currentWallet.currency}
              big
              accent
            >
              {currentWallet.currency}
            </StatisticItem>
          </div>
        </div>
      </div>
      <div className="dialog__bottom">
        <StatisticItem
          className="wallet-withdraw-popup__from-text"
          label={t("wallet-withdraw.to")}
        >
          <img
            src={ArrowIcon}
            alt="Icon"
            className="wallet-withdraw-popup__icon"
          />
          {t("wallet-add-funds.external")}
        </StatisticItem>
        <GVFormikField
          name="address"
          label={t("wallet-withdraw.address")}
          component={GVTextField}
          autoComplete="off"
        />
        {twoFactorEnabled && (
          <GVFormikField
            type="text"
            name="twoFactorCode"
            label={t("wallet-withdraw.two-factor-code-label")}
            autoComplete="off"
            component={GVTextField}
          />
        )}
        <InputAmountField
          name="amount"
          label={t("wallet-withdraw.amount")}
          currency="GVT"
          isAllow={isAllow}
          setMax={setMaxAmount}
        />
        <ul className="dialog-list">
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {t("wallet-withdraw.will-get")}
            </span>
            <span className="dialog-list__value">
              <NumberFormat
                value={formatValue(willGet)}
                suffix={` ${currentWallet.currency}`}
                displayType="text"
              />
            </span>
          </li>
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {t("wallet-withdraw.fee")}
            </span>
            <span className="dialog-list__value">
              <NumberFormat
                value={formatValue(commission)}
                suffix={` ${currentWallet.currency}`}
                displayType="text"
              />
            </span>
          </li>
        </ul>
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
      </div>
    </form>
  );
};

WalletWithdrawForm.propTypes = {
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
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"))
        .required(t("wallet-withdraw.validation.two-factor-required"))
    : string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"));
};

export default compose(
  translate(),
  withFormik({
    displayName: "wallet-withdraw",
    mapPropsToValues: () => {
      return { amount: "", address: "", twoFactorCode: "" };
    },
    validationSchema: ({ t, availableToWithdrawal, twoFactorEnabled }) =>
      object().shape({
        amount: number().max(
          availableToWithdrawal,
          t("wallet-withdraw.validation.amount-more-than-available")
        ),
        address: ethWalletValidator.required(
          t("wallet-withdraw.validation.address-is-required")
        ),
        twoFactorCode: twoFactorvalidator(t, twoFactorEnabled)
      }),
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(WalletWithdrawForm);
