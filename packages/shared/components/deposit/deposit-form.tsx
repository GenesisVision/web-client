import { FormikProps, withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import {
  calculateValueOfEntryFee,
  convertFromCurrency
} from "shared/utils/currency-converter";
import {
  formatCurrencyValue,
  formatValue,
  validateFraction
} from "shared/utils/formatter";
import { number, object } from "yup";

import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { ROLE } from "shared/constants/constants";
import { ProgramInvestInfo, WalletData } from "gv-api-web";
import StatisticItem from "../statistic-item/statistic-item";
import Select from "../select/select";
import { getWalletIcon } from "../wallet/components/wallet-currency";
import rateApi from "../../services/api-client/rate-api";

interface IDepositFormOwnProps {
  wallets: WalletData[];
  role: ROLE;
  program: boolean;
  entryFee: boolean;
  info: ProgramInvestInfo;
  currency: string;
  disabled: boolean;
  errorMessage: string;
  onSubmit: (params: any) => {};
}

interface IDepositFormProps {
  errors?: any;
  isValid?: boolean;
  dirty?: boolean;
  values?: FormValues;
  setFieldValue?: any;
}

export interface FormValues {
  amount: any;
  walletCurrency: string;
}

interface IDepositFormState {
  rate: string;
}
type OwnProps = InjectedTranslateProps &
  IDepositFormOwnProps &
  IDepositFormProps &
  FormikProps<FormValues>;

class DepositForm extends React.Component<OwnProps, IDepositFormState> {
  state = {
    rate: "1"
  };
  componentDidMount(): void {
    this.fetchRate({ currencyFrom: this.props.values.walletCurrency });
  }

  composeEntryFee = (fee: any): number => {
    const { entryFee } = this.props;
    return entryFee ? fee : 0;
  };

  entryFee = (amount: number): number => {
    const { info } = this.props;
    return this.composeEntryFee(
      calculateValueOfEntryFee(amount, info.entryFee)
    );
  };

  gvFee = (amount: number): number => {
    const { info } = this.props;
    return calculateValueOfEntryFee(amount, info.gvCommission);
  };

  investAmount = (amount: number): number => {
    return (amount || 0) - this.gvFee(amount) - this.entryFee(amount);
  };

  isAllow = (values: any): boolean => {
    const { role, info } = this.props;
    const { floatValue, formattedValue, value } = values;
    const { availableToInvest, availableInWallet } = info;

    const isValidateFraction = validateFraction(value, "GVT");

    const isAvailableInWallet =
      availableInWallet >= this.investAmount(floatValue);

    const isAvailableToInvest =
      role === ROLE.MANAGER ||
      availableToInvest === undefined ||
      floatValue <= parseFloat(String(availableToInvest));

    return (
      formattedValue === "" ||
      (isValidateFraction && isAvailableInWallet && isAvailableToInvest)
    );
  };

  onChangeCurrencyFrom = (name: any, target: any) => {
    const { setFieldValue } = this.props;
    const walletCurrency = target.props.value;
    setFieldValue("walletCurrency", walletCurrency);
    this.fetchRate({ currencyFrom: walletCurrency });
  };
  fetchRate = (params: { currencyFrom?: string; currencyTo?: string }) => {
    const { values, currency } = this.props;
    rateApi
      .v10RateByFromByToGet(
        params.currencyFrom || values.walletCurrency,
        params.currencyTo || currency
      )
      .then((rate: string) => {
        if (rate !== this.state.rate) this.setState({ rate });
      });
  };
  setMaxAmount = () => {
    const { setFieldValue, info } = this.props;
    const { availableToInvest, availableInWallet } = info;
    const maxFromWallet = availableInWallet;

    let maxAvailable = Number.MAX_SAFE_INTEGER;
    if (availableToInvest !== undefined)
      maxAvailable =
        (availableToInvest /
          (100 - info.gvCommission - this.composeEntryFee(info.entryFee))) *
        100;

    const maxInvest = formatCurrencyValue(
      Math.min(maxFromWallet, maxAvailable),
      "GVT"
    );

    setFieldValue("amount", maxInvest);
  };

  render() {
    const {
      wallets,
      t,
      program,
      entryFee,
      values,
      info,
      currency,
      disabled,
      isValid,
      dirty,
      handleSubmit,
      errorMessage
    } = this.props;
    const { rate } = this.state;
    const { walletCurrency } = values;
    const wallet = wallets.find(wallet => wallet.currency === walletCurrency);
    return (
      <form className="dialog__bottom" id="invest-form" onSubmit={handleSubmit}>
        <GVFormikField
          name="walletCurrency"
          component={GVTextField}
          label={t("follow-program.create-account.from")}
          InputComponent={Select}
          onChange={this.onChangeCurrencyFrom}
        >
          {wallets.map((wallet: WalletData) => {
            return (
              <option value={wallet.currency} key={wallet.currency}>
                <img
                  src={getWalletIcon(wallet.currency)}
                  className="wallet-transfer-popup__icon"
                  alt={wallet.currency}
                />
                {`${wallet.title} | ${wallet.currency}`}
              </option>
            );
          })}
        </GVFormikField>
        <StatisticItem
          label={
            program
              ? t("deposit-asset.available-in-wallet")
              : t("deposit-asset.fund.available-to-invest")
          }
          big
        >
          {formatCurrencyValue(wallet ? wallet.available : 0, "GVT")} GVT
        </StatisticItem>
        <InputAmountField
          name="amount"
          label={
            program ? t("deposit-asset.amount") : t("deposit-asset.amount")
          }
          currency={"GVT"}
          isAllow={this.isAllow}
          setMax={this.setMaxAmount}
        />

        <div className="invest-popup__currency">
          <NumberFormat
            value={formatCurrencyValue(
              convertFromCurrency(values.amount, rate),
              currency
            )}
            prefix="≈ "
            suffix={` ${currency}`}
            displayType="text"
          />
        </div>
        <ul className="dialog-list">
          {entryFee && (
            <li className="dialog-list__item">
              <span className="dialog-list__title">
                {program
                  ? t("deposit-asset.entry-fee")
                  : t("deposit-asset.entry-fee")}
              </span>
              <span className="dialog-list__value">
                {info.entryFee} %{" "}
                <NumberFormat
                  value={formatValue(this.entryFee(values.amount))}
                  prefix=" ("
                  suffix={" GVT)"}
                  displayType="text"
                />
              </span>
            </li>
          )}
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {program
                ? t("deposit-asset.gv-commission")
                : t("deposit-asset.gv-commission")}
            </span>
            <span className="dialog-list__value">
              {info.gvCommission} %
              <NumberFormat
                value={formatCurrencyValue(this.gvFee(values.amount), "GVT")}
                prefix={" ("}
                suffix={" GVT)"}
                displayType="text"
              />
            </span>
          </li>
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {program
                ? t("deposit-asset.investment-amount")
                : t("deposit-asset.investment-amount")}
            </span>
            <span className="dialog-list__value">
              <NumberFormat
                value={formatCurrencyValue(
                  this.investAmount(values.amount),
                  "GVT"
                )}
                suffix={" GVT"}
                displayType="text"
              />
            </span>
          </li>
        </ul>
        <div className="form-error">
          <FormError error={errorMessage} />
        </div>
        <div className="dialog__buttons">
          <GVButton
            type="submit"
            className="invest-form__submit-button"
            disabled={disabled || !isValid || !dirty}
          >
            {program ? t("deposit-asset.confirm") : t("deposit-asset.confirm")}
          </GVButton>
        </div>
      </form>
    );
  }
}

export default compose<React.ComponentType<IDepositFormOwnProps>>(
  translate(),
  withFormik({
    displayName: "invest-form",
    mapPropsToValues: () => ({
      amount: "",
      walletCurrency: "GVT"
    }),
    validationSchema: (params: InjectedTranslateProps & OwnProps) => {
      const { info, t } = params;
      return object().shape({
        amount: number()
          .min(
            info.minInvestmentAmount,
            t("deposit-asset.validation.amount-min-value", {
              min: info.minInvestmentAmount
            })
          )
          .max(
            info.availableInWallet,
            t("deposit-asset.validation.amount-more-than-available")
          )
      });
    },
    handleSubmit: (values, { props }: { props: OwnProps }) => {
      props.onSubmit(values.amount);
    }
  })
)(DepositForm);
