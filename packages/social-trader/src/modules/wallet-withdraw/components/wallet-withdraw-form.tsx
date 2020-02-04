import "./wallet-withdraw-form.scss";

import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogField } from "components/dialog/dialog-field";
import { DialogList } from "components/dialog/dialog-list";
import { DialogListItem } from "components/dialog/dialog-list-item";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import InputAmountField from "components/input-amount-field/input-amount-field";
import { ISelectChangeEvent } from "components/select/select";
import StatisticItem from "components/statistic-item/statistic-item";
import WalletSelect from "components/wallet-select/wallet-select";
import { InjectedFormikProps, withFormik } from "formik";
import { WalletData } from "gv-api-web";
import * as React from "react";
import { useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { CurrencyEnum, SetSubmittingType } from "utils/types";
import {
  btcWalletValidator,
  ethGvtWalletValidator,
  twoFactorValidator
} from "utils/validators/validators";
import { lazy, object, Schema } from "yup";

const _WalletWithdrawForm: React.FC<InjectedFormikProps<
  Props,
  IWalletWithdrawFormValues
>> = ({
  t,
  twoFactorEnabled,
  handleSubmit,
  wallets,
  values,
  isValid,
  dirty,
  errorMessage,
  setFieldValue,
  isSubmitting
}) => {
  const { currency, amount } = values;
  const [selected, setSelected] = useState<WalletData>(
    safeGetElemFromArray(wallets, wallet => wallet.currency === currency)
  );
  const onChangeCurrency = useCallback(
    (event: ISelectChangeEvent, target: JSX.Element) => {
      const wallet = safeGetElemFromArray(
        wallets,
        wallet => wallet.id === target.props.value
      );
      setSelected(wallet);
      setFieldValue(FIELDS.currency, wallet.currency);
      setFieldValue(FIELDS.id, wallet.id);
      setFieldValue(FIELDS.amount, "");
    },
    [setFieldValue, selected, setSelected, wallets]
  );
  const { withdrawalCommission, available } = selected;
  const willGet = Math.max(parseFloat(amount) - withdrawalCommission, 0);
  const isAllow = (inputValues: NumberFormatValues) => {
    const { floatValue, formattedValue, value } = inputValues;
    const { currency } = values;
    return (
      formattedValue === "" ||
      (validateFraction(value, currency) && floatValue <= available)
    );
  };
  const setMaxAmount = () => {
    setFieldValue(FIELDS.amount, formatCurrencyValue(available, currency));
  };

  return (
    <form id="wallet-withdraw" onSubmit={handleSubmit} noValidate>
      <DialogTop title={t("wallet-withdraw.title")}>
        <DialogField>
          <WalletSelect
            name={FIELDS.id}
            label={t("wallet-withdraw.select-currency")}
            items={wallets}
            onChange={onChangeCurrency}
          />
        </DialogField>
        <DialogField>
          <StatisticItem label={t("wallet-withdraw.available")} big>
            {`${formatCurrencyValue(available, currency)} ${currency}`}
          </StatisticItem>
        </DialogField>
      </DialogTop>
      <DialogBottom>
        <InputAmountField
          name={FIELDS.amount}
          label={t("wallet-withdraw.amount")}
          currency={currency}
          isAllow={isAllow}
          setMax={setMaxAmount}
        />
        <DialogField>
          <GVFormikField
            wide
            name={FIELDS.address}
            label={t("wallet-withdraw.address")}
            component={GVTextField}
            autoComplete="off"
          />
        </DialogField>
        {twoFactorEnabled && (
          <DialogField>
            <GVFormikField
              wide
              type="text"
              name={FIELDS.twoFactorCode}
              label={t("wallet-withdraw.two-factor-code-label")}
              autoComplete="off"
              component={GVTextField}
            />
          </DialogField>
        )}
        <DialogList>
          <DialogListItem label={t("wallet-withdraw.will-get")}>
            <NumberFormat
              value={formatCurrencyValue(willGet, currency)}
              suffix={` ${currency}`}
              displayType="text"
            />
          </DialogListItem>
          <DialogListItem label={t("wallet-withdraw.fee")}>
            <NumberFormat
              value={formatCurrencyValue(withdrawalCommission, currency)}
              suffix={` ${currency}`}
              displayType="text"
            />
          </DialogListItem>
        </DialogList>
        <DialogError error={errorMessage} />
        <DialogButtons>
          <GVButton
            wide
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || !isValid || !dirty}
          >
            {t("buttons.confirm")}
          </GVButton>
        </DialogButtons>
      </DialogBottom>
    </form>
  );
};

enum FIELDS {
  id = "id",
  currency = "currency",
  amount = "amount",
  address = "address",
  twoFactorCode = "twoFactorCode"
}

export interface IWalletWithdrawFormValues {
  [FIELDS.currency]: CurrencyEnum;
  [FIELDS.id]: string;
  [FIELDS.amount]: string;
  [FIELDS.address]: string;
  [FIELDS.twoFactorCode]: string;
}

interface Props extends WithTranslation, OwnProps {}

interface OwnProps {
  twoFactorEnabled: boolean;
  wallets: WalletData[];
  currentWallet: WalletData;
  onSubmit(
    data: IWalletWithdrawFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  errorMessage?: string;
}

const WalletWithdrawForm = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, IWalletWithdrawFormValues>({
    displayName: "wallet-withdraw",
    mapPropsToValues: ({ currentWallet: { id, currency } }) => ({
      [FIELDS.id]: id,
      [FIELDS.currency]: currency,
      [FIELDS.amount]: "",
      [FIELDS.address]: "",
      [FIELDS.twoFactorCode]: ""
    }),
    validationSchema: ({ t, twoFactorEnabled }: Props) =>
      lazy(
        (values: IWalletWithdrawFormValues): Schema<any> => {
          switch (values[FIELDS.currency]) {
            case "GVT":
            case "ETH":
            case "USDT":
              return object().shape({
                [FIELDS.address]: ethGvtWalletValidator.required(
                  t("wallet-withdraw.validation.address-is-required")
                ),
                [FIELDS.twoFactorCode]: twoFactorValidator(t, twoFactorEnabled)
              });
            default:
              return object().shape({
                [FIELDS.address]: btcWalletValidator.required(
                  t("wallet-withdraw.validation.address-is-required")
                ),
                [FIELDS.twoFactorCode]: twoFactorValidator(t, twoFactorEnabled)
              });
          }
        }
      ),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_WalletWithdrawForm);
export default WalletWithdrawForm;
