import { InjectedFormikProps, withFormik } from "formik";
import { ProgramInvestInfo, WalletBaseData } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { ISelectChangeEvent } from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import WalletSelect from "shared/components/wallet-select/wallet-select";
import { ASSET, ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import rateApi from "shared/services/api-client/rate-api";
import {
  calculatePercentage,
  convertFromCurrency,
  convertToCurrency
} from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import {
  investorSchema,
  managerSchema
} from "./deposit-form-validation-schema";
import { TInvestInfo } from "./deposit.types";

class _DepositForm extends React.PureComponent<
  InjectedFormikProps<Props, IDepositFormValues>
> {
  componentDidMount(): void {
    this.fetchRate({
      currencyFrom: this.props.values[DEPOSIT_FORM_FIELDS.walletCurrency]
    });
  }

  composeEntryFee = (fee: any): number => {
    const { hasEntryFee } = this.props;
    return hasEntryFee ? fee : 0;
  };

  entryFee = (amount: number): number => {
    const { info } = this.props;
    return this.composeEntryFee(calculatePercentage(amount, info.entryFee));
  };

  gvFee = (amount: number): number => {
    const { info } = this.props;
    return calculatePercentage(amount, info.gvCommission);
  };

  investAmount = (amount: number): number => {
    return (amount || 0) - this.gvFee(amount) - this.entryFee(amount);
  };

  isAllow = (currency: string) => (values: NumberFormatValues): boolean => {
    const { formattedValue, value } = values;
    return (
      (formattedValue === "" || validateFraction(value, currency)) &&
      value !== "."
    );
  };

  onChangeCurrencyFrom = (
    event: ISelectChangeEvent,
    target: JSX.Element
  ): void => {
    const { setFieldValue, setFieldTouched, wallets } = this.props;
    const wallet = wallets.find(wallet => wallet.id === target.props.value)!;
    setFieldValue(DEPOSIT_FORM_FIELDS.walletId, wallet.id);
    setFieldValue(DEPOSIT_FORM_FIELDS.walletCurrency, wallet.currency);
    setFieldValue(DEPOSIT_FORM_FIELDS.amount, "");
    setFieldTouched(DEPOSIT_FORM_FIELDS.amount, false);
    this.fetchRate({ currencyFrom: wallet.currency });
  };

  fetchRate = (params: {
    currencyFrom?: string;
    currencyTo?: string;
  }): void => {
    const { values, currency, setFieldValue } = this.props;
    rateApi
      .v10RateByFromByToGet(
        params.currencyFrom || values[DEPOSIT_FORM_FIELDS.walletCurrency],
        params.currencyTo || currency
      )
      .then(rate => {
        setFieldValue("rate", rate);
      });
  };

  getMaxAmount = () => {
    const { setFieldValue, info, wallets, values } = this.props;
    const availableToInvestBase = (info as ProgramInvestInfo)
      ? (info as ProgramInvestInfo).availableToInvestBase
      : undefined;
    const wallet = wallets.find(
      wallet => wallet.currency === values[DEPOSIT_FORM_FIELDS.walletCurrency]
    );
    const availableInWallet = wallet ? wallet.available : 0;

    let maxAvailable = Number.MAX_SAFE_INTEGER;
    if (availableToInvestBase !== undefined)
      maxAvailable = availableToInvestBase;

    const availableToInvest = convertToCurrency(
      maxAvailable,
      values[DEPOSIT_FORM_FIELDS.rate]
    );
    if (availableInWallet !== values[DEPOSIT_FORM_FIELDS.availableInWallet])
      setFieldValue(DEPOSIT_FORM_FIELDS.availableInWallet, availableInWallet);
    if (availableToInvest !== values[DEPOSIT_FORM_FIELDS.availableToInvest])
      setFieldValue(DEPOSIT_FORM_FIELDS.availableToInvest, availableToInvest);
  };

  setMaxAmount = (): void => {
    const { setFieldValue, values, role } = this.props;
    const { availableInWallet, availableToInvest, walletCurrency } = values;
    const max = formatCurrencyValue(
      role === ROLE.INVESTOR
        ? Math.min(availableInWallet || 0, availableToInvest || 0)
        : availableInWallet || 0,
      walletCurrency
    );
    setFieldValue(DEPOSIT_FORM_FIELDS.amount, max);
  };

  render() {
    this.getMaxAmount();
    const {
      role,
      wallets,
      t,
      asset,
      hasEntryFee,
      values,
      info,
      currency,
      isValid,
      dirty,
      handleSubmit,
      isSubmitting,
      errorMessage
    } = this.props;
    const { walletCurrency, rate } = values;
    const wallet = wallets.find(wallet => wallet.currency === walletCurrency);
    return (
      <form className="dialog__bottom" id="invest-form" onSubmit={handleSubmit}>
        <WalletSelect
          name={DEPOSIT_FORM_FIELDS.walletId}
          label={t("follow-program.create-account.from")}
          items={wallets}
          onChange={this.onChangeCurrencyFrom}
        />
        <StatisticItem label={t("deposit-asset.available-in-wallet")} big>
          {formatCurrencyValue(wallet ? wallet.available : 0, walletCurrency)}{" "}
          {walletCurrency}
        </StatisticItem>
        <InputAmountField
          name={DEPOSIT_FORM_FIELDS.amount}
          label={t("deposit-asset.amount")}
          currency={walletCurrency}
          isAllow={this.isAllow(walletCurrency)}
          setMax={this.setMaxAmount}
        />

        <div className="invest-popup__currency">
          {currency !== walletCurrency && (
            <NumberFormat
              value={formatCurrencyValue(
                convertFromCurrency(values.amount || 0, rate),
                currency
              )}
              prefix="≈ "
              suffix={` ${currency}`}
              displayType="text"
            />
          )}
        </div>
        {role === ROLE.INVESTOR && (
          <ul className="dialog-list">
            {hasEntryFee && (
              <li className="dialog-list__item">
                <span className="dialog-list__title">
                  {t("deposit-asset.entry-fee")}
                </span>
                <span className="dialog-list__value">
                  {info.entryFee} %{" "}
                  <NumberFormat
                    value={formatCurrencyValue(
                      this.entryFee(
                        convertFromCurrency(values.amount || 0, rate)
                      ),
                      currency
                    )}
                    prefix=" ("
                    suffix={` ${currency})`}
                    displayType="text"
                  />
                </span>
              </li>
            )}
            <li className="dialog-list__item">
              <span className="dialog-list__title">
                {t("deposit-asset.gv-commission")}
              </span>
              <span className="dialog-list__value">
                {info.gvCommission} %
                <NumberFormat
                  value={formatCurrencyValue(
                    this.gvFee(values.amount || 0),
                    walletCurrency
                  )}
                  prefix={" ("}
                  suffix={` ${walletCurrency})`}
                  displayType="text"
                />
              </span>
            </li>
            <li className="dialog-list__item">
              <span className="dialog-list__title">
                {t("deposit-asset.investment-amount")}
              </span>
              <span className="dialog-list__value">
                <NumberFormat
                  value={formatCurrencyValue(
                    this.investAmount(
                      convertFromCurrency(values.amount || 0, rate)
                    ),
                    currency
                  )}
                  prefix="≈ "
                  suffix={` ${currency}`}
                  displayType="text"
                />
              </span>
            </li>
          </ul>
        )}
        <div className="form-error">
          <FormError error={errorMessage} />
        </div>
        <div className="dialog__buttons">
          <GVButton
            type="submit"
            className="invest-form__submit-button"
            disabled={isSubmitting || !isValid || !dirty}
          >
            {t("deposit-asset.confirm")}
          </GVButton>
        </div>
        {asset === ASSET.FUND ? (
          <div className="dialog__info">
            {t("deposit-asset.fund.disclaimer")}
          </div>
        ) : null}
      </form>
    );
  }
}

const DepositForm = compose<React.FC<IDepositOwnProps>>(
  withRole,
  translate(),
  withFormik<Props, IDepositFormValues>({
    enableReinitialize: true,
    displayName: "invest-form",
    mapPropsToValues: ({ wallets }) => ({
      [DEPOSIT_FORM_FIELDS.rate]: 1,
      [DEPOSIT_FORM_FIELDS.walletId]: wallets.find(
        wallet => wallet.currency === "GVT"
      )!.id,
      [DEPOSIT_FORM_FIELDS.maxAmount]: undefined,
      [DEPOSIT_FORM_FIELDS.amount]: undefined,
      [DEPOSIT_FORM_FIELDS.walletCurrency]: "GVT"
    }),
    validationSchema: (params: Props) =>
      params.role === ROLE.MANAGER
        ? managerSchema(params)
        : investorSchema(params),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(
        values[DEPOSIT_FORM_FIELDS.amount]!,
        values[DEPOSIT_FORM_FIELDS.walletCurrency],
        setSubmitting
      );
    }
  })
)(_DepositForm);
export default DepositForm;

export enum DEPOSIT_FORM_FIELDS {
  rate = "rate",
  maxAmount = "maxAmount",
  amount = "amount",
  walletCurrency = "walletCurrency",
  walletId = "walletId",
  availableToInvest = "availableToInvest",
  availableInWallet = "availableInWallet"
}

export interface IDepositOwnProps {
  wallets: WalletBaseData[];
  asset: ASSET;
  hasEntryFee: boolean;
  info: TInvestInfo;
  currency: CurrencyEnum;
  errorMessage: string;
  onSubmit: (
    amount: number,
    currency: CurrencyEnum,
    setSubmitting: SetSubmittingType
  ) => void;
}

interface Props extends IDepositOwnProps, WithRoleProps, WithTranslation {}

export interface IDepositFormValues {
  [DEPOSIT_FORM_FIELDS.rate]: number;
  [DEPOSIT_FORM_FIELDS.availableToInvest]?: number;
  [DEPOSIT_FORM_FIELDS.availableInWallet]?: number;
  [DEPOSIT_FORM_FIELDS.amount]?: number;
  [DEPOSIT_FORM_FIELDS.walletCurrency]: CurrencyEnum;
}
