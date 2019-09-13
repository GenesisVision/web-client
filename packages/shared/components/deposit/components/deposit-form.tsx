import { InjectedFormikProps, withFormik } from "formik";
import { ProgramInvestInfo, WalletBaseData } from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  useTranslation,
  WithTranslation,
  withTranslation as translate
} from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { ISelectChangeEvent } from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import WalletSelect from "shared/components/wallet-select/wallet-select";
import { ASSET, ROLE } from "shared/constants/constants";
import withLoader from "shared/decorators/with-loader";
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

const INIT_WALLET_CURRENCY = "GVT";

const _DepositForm: React.FC<
  InjectedFormikProps<Props, IDepositFormValues>
> = ({
  t,
  role,
  wallets,
  asset,
  hasEntryFee,
  values,
  info,
  currency,
  isValid,
  dirty,
  handleSubmit,
  isSubmitting,
  errorMessage,
  setFieldValue,
  setFieldTouched
}) => {
  const {
    walletCurrency,
    rate,
    availableInWallet = 0,
    availableToInvest = 0,
    amount = 0
  } = values;
  const [wallet, setWallet] = useState<WalletBaseData>(
    wallets.find(wallet => wallet.currency === walletCurrency)!
  );
  useEffect(
    () => {
      rateApi.v10RateByFromByToGet(walletCurrency, currency).then(rate => {
        setFieldValue(DEPOSIT_FORM_FIELDS.rate, rate);
      });
      setWallet(wallets.find(wallet => wallet.currency === walletCurrency)!);
    },
    [currency, setFieldValue, walletCurrency, wallets]
  );
  useEffect(
    () => {
      const maxAvailable =
        (info as ProgramInvestInfo).availableToInvestBase !== undefined
          ? (info as ProgramInvestInfo).availableToInvestBase
          : Number.MAX_SAFE_INTEGER;
      const availableToInvest = convertToCurrency(maxAvailable, rate);
      const availableInWallet = wallets.find(
        ({ currency }) => currency === walletCurrency
      )!.available;

      if (availableInWallet !== values[DEPOSIT_FORM_FIELDS.availableInWallet])
        setFieldValue(DEPOSIT_FORM_FIELDS.availableInWallet, availableInWallet);
      if (availableToInvest !== values[DEPOSIT_FORM_FIELDS.availableToInvest])
        setFieldValue(DEPOSIT_FORM_FIELDS.availableToInvest, availableToInvest);
    },
    [info, wallets, values, rate, setFieldValue, walletCurrency]
  );

  const isAllow = useCallback(
    (currency: string) => ({
      formattedValue,
      value
    }: NumberFormatValues): boolean =>
      (formattedValue === "" || validateFraction(value, currency)) &&
      value !== ".",
    []
  );

  const onChangeCurrencyFrom = useCallback(
    (event: ISelectChangeEvent, target: JSX.Element): void => {
      const wallet = wallets.find(wallet => wallet.id === target.props.value)!;
      setFieldValue(DEPOSIT_FORM_FIELDS.walletId, wallet.id);
      setFieldValue(DEPOSIT_FORM_FIELDS.walletCurrency, wallet.currency);
      setFieldValue(DEPOSIT_FORM_FIELDS.amount, "");
      setFieldTouched(DEPOSIT_FORM_FIELDS.amount, false);
    },
    [setFieldTouched, setFieldValue, wallets]
  );

  const setMaxAmount = useCallback(
    (): void => {
      const max = formatCurrencyValue(
        role === ROLE.INVESTOR
          ? Math.min(availableInWallet, availableToInvest)
          : availableInWallet,
        walletCurrency
      );
      setFieldValue(DEPOSIT_FORM_FIELDS.amount, max);
    },
    [availableInWallet, availableToInvest, role, setFieldValue, walletCurrency]
  );

  return (
    <form className="dialog__bottom" id="invest-form" onSubmit={handleSubmit}>
      <WalletSelect
        name={DEPOSIT_FORM_FIELDS.walletId}
        label={t("follow-program.create-account.from")}
        items={wallets}
        onChange={onChangeCurrencyFrom}
      />
      <StatisticItem label={t("deposit-asset.available-in-wallet")} big>
        {formatCurrencyValue(wallet.available, walletCurrency)} {walletCurrency}
      </StatisticItem>
      <InputAmountField
        name={DEPOSIT_FORM_FIELDS.amount}
        label={t("deposit-asset.amount")}
        currency={walletCurrency}
        isAllow={isAllow(walletCurrency)}
        setMax={setMaxAmount}
      />
      <ConvertCurrency
        condition={currency !== walletCurrency}
        amount={amount}
        rate={rate}
        currency={currency}
      />
      <InvestorFees
        condition={role === ROLE.INVESTOR}
        hasEntryFee={hasEntryFee}
        info={info}
        amount={amount}
        rate={rate}
        currency={currency}
        walletCurrency={walletCurrency}
      />
      <FormError error={errorMessage} />
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
        <div className="dialog__info">{t("deposit-asset.fund.disclaimer")}</div>
      ) : null}
    </form>
  );
};

const DepositForm = compose<React.FC<IDepositOwnProps>>(
  withRole,
  translate(),
  withFormik<Props, IDepositFormValues>({
    enableReinitialize: true,
    displayName: "invest-form",
    mapPropsToValues: ({ wallets }) => ({
      [DEPOSIT_FORM_FIELDS.rate]: 1,
      [DEPOSIT_FORM_FIELDS.walletId]: wallets.find(
        wallet => wallet.currency === INIT_WALLET_CURRENCY
      )!.id,
      [DEPOSIT_FORM_FIELDS.maxAmount]: undefined,
      [DEPOSIT_FORM_FIELDS.amount]: undefined,
      [DEPOSIT_FORM_FIELDS.walletCurrency]: INIT_WALLET_CURRENCY
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

const _InvestorFees: React.FC<IInvestorFeesProps> = ({
  amount,
  rate,
  hasEntryFee,
  info,
  currency,
  walletCurrency
}) => {
  const gvFee = calculatePercentage(amount, info.gvCommission);
  const entryFee = calculatePercentage(amount - gvFee, info.entryFee);
  const investAmount = amount - gvFee - entryFee * +hasEntryFee;
  const [t] = useTranslation();
  return (
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
                convertFromCurrency(entryFee, rate),
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
            value={formatCurrencyValue(gvFee, walletCurrency)}
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
              convertFromCurrency(investAmount, rate),
              currency
            )}
            prefix="≈ "
            suffix={` ${currency}`}
            displayType="text"
          />
        </span>
      </li>
    </ul>
  );
};
const InvestorFees = withLoader(React.memo(_InvestorFees));

const _ConvertCurrency: React.FC<{
  amount: number;
  currency: CurrencyEnum;
  rate: number;
}> = ({ rate, amount, currency }) => (
  <div className="invest-popup__currency">
    <NumberFormat
      value={formatCurrencyValue(convertFromCurrency(amount, rate), currency)}
      prefix="≈ "
      suffix={` ${currency}`}
      displayType="text"
    />
  </div>
);
const ConvertCurrency = withLoader(React.memo(_ConvertCurrency));

interface IInvestorFeesProps {
  hasEntryFee: boolean;
  info: TInvestInfo;
  amount: number;
  rate: number;
  currency: CurrencyEnum;
  walletCurrency: CurrencyEnum;
}

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
