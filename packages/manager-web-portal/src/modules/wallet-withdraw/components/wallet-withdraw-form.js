import "./wallet-withdraw-form.scss";

import Select from "shared/components/select/select";
import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { ethWalletValidator } from "shared/utils/validators/validators";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatValue } from "shared/utils/formatter";
import { number, object, string } from "yup";

const WalletWithdrawForm = ({
  t,
  twoFactorEnabled,
  handleSubmit,
  availableToWithdrawal,
  wallets,
  values,
  disabled,
  errorMessage
}) => {
  const { currency, amount } = values;
  const currentWallet =
    wallets.find(wallet => wallet.currency === currency) || {};

  const { commission = null, rateToGvt = null } = currentWallet;

  const willGet = Math.max(
    convertFromCurrency(amount, rateToGvt) - commission,
    0
  );

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
        <div className="gv-text-field__wrapper">
          <label className="gv-text-field__label gv-text-field__label--shrink">
            {t("wallet-withdraw.available")}
          </label>
          <div className="gv-text-field wallet-withdraw__field">
            <div className="gv-text-field__input dialog-field__value">
              {availableToWithdrawal} GVT
            </div>
          </div>
        </div>
        <GVFormikField
          name="currency"
          component={GVTextField}
          label={t("wallet-withdraw.select-currency")}
          InputComponent={Select}
        >
          {wallets.map(wallet => {
            return (
              <option value={wallet.currency} key={wallet.currency}>{`${
                wallet.description
              } | ${wallet.currency}`}</option>
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
          isAllowed={values => {
            const { floatValue, formattedValue } = values;
            return (
              formattedValue === "" ||
              floatValue <= parseFloat(availableToWithdrawal)
            );
          }}
        />
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
        <ul className="dialog-list">
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {t("wallet-withdraw.will-get")}
            </span>
            <span className="dialog-list__value">
              <NumberFormat
                value={formatValue(willGet)}
                suffix={` ${currency}`}
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
                suffix={` ${currency}`}
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
            disabled={disabled}
          >
            {t("buttons.confirm")}
          </GVButton>
        </div>
        {currency !== "GVT" && (
          <div className="dialog__info">{t("wallet-withdraw.info")}</div>
        )}
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
    mapPropsToValues: props => {
      let currency = "GVT";
      if (!props.wallets.find(wallet => wallet.currency === currency)) {
        currency = props.wallets[0] ? props.wallets[0].currency : "";
      }
      return { currency, amount: "", address: "", twoFactorCode: "" };
    },
    validationSchema: ({ t, availableToWithdrawal, twoFactorEnabled }) =>
      object().shape({
        amount: number()
          .max(
            availableToWithdrawal,
            t("wallet-withdraw.validation.amount-more-than-available")
          )
          .required(t("wallet-withdraw.validation.amount-is-required")),
        address: ethWalletValidator.required(
          t("wallet-withdraw.validation.address-is-required")
        ),
        twoFactorCode: twoFactorvalidator(t, twoFactorEnabled)
      }),
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(WalletWithdrawForm);
