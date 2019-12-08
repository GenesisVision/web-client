import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import FormError from "components/form/form-error/form-error";
import GVButton from "components/gv-button";
import InputAmountField from "components/input-amount-field/input-amount-field";
import StatisticItem from "components/statistic-item/statistic-item";
import { InjectedFormikProps, withFormik } from "formik";
import { WalletBaseData } from "gv-api-web";
import { useGetRate } from "hooks/get-rate.hook";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import { ASSET } from "shared/constants/constants";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { CurrencyEnum, SetSubmittingType } from "utils/types";

import { depositValidationSchema } from "./deposit-form-validation-schema";
import { TFees } from "./deposit.types";
import { ConvertCurrency } from "./form-fields/convert-currency";
import { InvestorFees } from "./form-fields/investor-fees";
import { WalletField } from "./form-fields/wallet-field";

const INIT_WALLET_CURRENCY = "GVT";

const isAllow = (currency: string) => ({
  formattedValue,
  value
}: NumberFormatValues): boolean =>
  (formattedValue === "" || validateFraction(value, currency)) && value !== ".";

const _DepositForm: React.FC<
  InjectedFormikProps<Props, IDepositFormValues>
> = ({
  minDeposit,
  fees,
  availableToInvest: availableToInvestProp = Number.MAX_SAFE_INTEGER,
  t,
  wallets,
  asset,
  hasEntryFee,
  values,
  currency,
  isValid,
  dirty,
  handleSubmit,
  isSubmitting,
  errorMessage,
  setFieldValue,
  setFieldTouched,
  ownAsset
}) => {
  const { walletCurrency, amount = 0 } = values;
  const { rate, getRate } = useGetRate();
  const [availableInWallet, setAvailableInWallet] = useState<number>(0);
  const [availableToInvest, setAvailableToInvest] = useState<number>(0);
  useEffect(() => {
    getRate({ from: walletCurrency, to: currency });
  }, [currency, walletCurrency]);
  useEffect(() => {
    setAvailableToInvest(convertToCurrency(availableToInvestProp, rate));
    setFieldValue(DEPOSIT_FORM_FIELDS.availableToInvest, availableToInvestProp);
  }, [availableToInvestProp, rate]);
  useEffect(() => {
    const available = wallets.find(
      ({ currency }) => currency === walletCurrency
    )!.available;
    setAvailableInWallet(available);
    setFieldValue(DEPOSIT_FORM_FIELDS.availableInWallet, available);
  }, [walletCurrency, wallets]);
  useEffect(() => {
    setFieldValue(DEPOSIT_FORM_FIELDS.rate, rate);
  }, [rate]);

  const setMaxAmount = useCallback((): void => {
    const max = formatCurrencyValue(
      Math.min(availableInWallet, availableToInvest),
      walletCurrency
    );
    setFieldValue(DEPOSIT_FORM_FIELDS.amount, max);
  }, [availableInWallet, availableToInvest, setFieldValue, walletCurrency]);

  const onWalletChange = ({ currency, id }: WalletBaseData) => {
    setFieldValue(DEPOSIT_FORM_FIELDS.walletCurrency, currency);
    setFieldValue(DEPOSIT_FORM_FIELDS.walletId, id);
    setFieldValue(DEPOSIT_FORM_FIELDS.amount, "");
    setFieldTouched(DEPOSIT_FORM_FIELDS.amount, false);
  };

  return (
    <form id="invest-form" onSubmit={handleSubmit}>
      <DialogBottom>
        <WalletField
          wallets={wallets}
          name={DEPOSIT_FORM_FIELDS.walletId}
          onChange={onWalletChange}
        />
        <DialogField>
          <StatisticItem label={t("deposit-asset.available-in-wallet")} big>
            {formatCurrencyValue(availableInWallet, walletCurrency)}{" "}
            {walletCurrency}
          </StatisticItem>
        </DialogField>
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
        {!ownAsset && (
          <InvestorFees
            fees={fees}
            hasEntryFee={hasEntryFee}
            amount={amount}
            rate={rate}
            currency={currency}
            walletCurrency={walletCurrency}
          />
        )}
        <FormError error={errorMessage} />
        <DialogButtons>
          <GVButton
            type="submit"
            className="invest-form__submit-button"
            disabled={isSubmitting || !isValid || !dirty}
          >
            {t("deposit-asset.confirm")}
          </GVButton>
        </DialogButtons>
        {asset === ASSET.FUND && (
          <div className="dialog__info">
            {t("deposit-asset.fund.disclaimer")}
          </div>
        )}
      </DialogBottom>
    </form>
  );
};

const DepositForm = compose<React.FC<IDepositOwnProps>>(
  translate(),
  withFormik<Props, IDepositFormValues>({
    enableReinitialize: true,
    displayName: "invest-form",
    mapPropsToValues: ({ wallets }) => ({
      [DEPOSIT_FORM_FIELDS.rate]: 1,
      [DEPOSIT_FORM_FIELDS.walletId]: wallets.find(
        wallet => wallet.currency === INIT_WALLET_CURRENCY
      )!.id,
      [DEPOSIT_FORM_FIELDS.amount]: undefined,
      [DEPOSIT_FORM_FIELDS.walletCurrency]: INIT_WALLET_CURRENCY
    }),
    validationSchema: depositValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(
        values[DEPOSIT_FORM_FIELDS.amount]!,
        values[DEPOSIT_FORM_FIELDS.walletCurrency],
        setSubmitting,
        values[DEPOSIT_FORM_FIELDS.walletId]
      );
    }
  })
)(_DepositForm);
export default DepositForm;

export enum DEPOSIT_FORM_FIELDS {
  rate = "rate",
  amount = "amount",
  walletCurrency = "walletCurrency",
  walletId = "walletId",
  availableToInvest = "availableToInvest",
  availableInWallet = "availableInWallet"
}

export interface IDepositOwnProps {
  minDeposit: number;
  ownAsset?: boolean;
  fees: TFees;
  availableToInvest?: number;
  wallets: WalletBaseData[];
  asset: ASSET;
  hasEntryFee: boolean;
  currency: CurrencyEnum;
  errorMessage: string;
  onSubmit: (
    amount: number,
    currency: CurrencyEnum,
    setSubmitting: SetSubmittingType,
    walletId: string
  ) => void;
}

interface Props extends IDepositOwnProps, WithTranslation {}

export interface IDepositFormValues {
  [DEPOSIT_FORM_FIELDS.rate]: number;
  [DEPOSIT_FORM_FIELDS.availableToInvest]?: number;
  [DEPOSIT_FORM_FIELDS.availableInWallet]?: number;
  [DEPOSIT_FORM_FIELDS.amount]?: number;
  [DEPOSIT_FORM_FIELDS.walletCurrency]: CurrencyEnum;
  [DEPOSIT_FORM_FIELDS.walletId]: string;
}
