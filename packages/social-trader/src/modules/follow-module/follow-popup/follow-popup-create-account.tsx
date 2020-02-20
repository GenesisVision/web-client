import { HookFormWalletField as WalletField } from "components/deposit/components/form-fields/wallet-field";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import GVButton from "components/gv-button";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import StatisticItem from "components/statistic-item/statistic-item";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { WalletData } from "gv-api-web";
import { useGetRate } from "hooks/get-rate.hook";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import {
  convertToCurrency,
  CURRENCY_FRACTIONS
} from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import {
  allowPositiveValuesNumberFormat,
  safeGetElemFromArray
} from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import CreateAccountFormValidationSchema, {
  CREATE_ACCOUNT_FORM_FIELDS
} from "./follow-popup-create-account.validators";

const _FollowCreateAccount: React.FC<CreateAccountFormProps> = ({
  minDeposit,
  onClick,
  wallets,
  followCurrency
}) => {
  const { rate, getRate } = useGetRate();
  const followCurrencyWalletId = safeGetElemFromArray(
    wallets,
    wallet => wallet.currency === followCurrency
  ).id;
  const [t] = useTranslation();

  const form = useForm<CreateAccountFormValues>({
    defaultValues: {
      [CREATE_ACCOUNT_FORM_FIELDS.depositWalletId]: followCurrencyWalletId,
      [CREATE_ACCOUNT_FORM_FIELDS.currency]: followCurrency
    },
    validationSchema: CreateAccountFormValidationSchema({
      rate,
      minDeposit,
      wallets,
      t
    }),
    mode: "onChange"
  });
  const {
    reset,
    watch,
    setValue,
    formState: { isValid, dirty }
  } = form;

  const disabled = !isValid || !dirty;

  const { currency, depositAmount } = watch();
  const wallet =
    wallets.find((wallet: WalletData) => wallet.currency === currency) ||
    wallets[0];

  useEffect(() => {
    getRate({ from: followCurrency as CurrencyEnum, to: currency });
  }, [followCurrency, currency]);

  const onChangeCurrencyFrom = useCallback(
    ({ id, currency }: WalletItemType) => {
      reset({
        [CREATE_ACCOUNT_FORM_FIELDS.currency]: currency,
        [CREATE_ACCOUNT_FORM_FIELDS.depositWalletId]: id,
        [CREATE_ACCOUNT_FORM_FIELDS.depositAmount]: ""
      });
    },
    [wallets]
  );
  const setMaxAmount = useCallback(() => {
    setValue(
      CREATE_ACCOUNT_FORM_FIELDS.depositAmount,
      formatCurrencyValue(wallet.available, followCurrency),
      true
    );
  }, [followCurrency, wallet]);

  return (
    <HookForm form={form} onSubmit={onClick}>
      <DialogBottom>
        <DialogField>
          <WalletField
            wallets={wallets}
            name={CREATE_ACCOUNT_FORM_FIELDS.depositWalletId}
            label={t("follow-program.create-account.from")}
            onChange={onChangeCurrencyFrom}
          />
        </DialogField>
        <DialogField>
          <StatisticItem label={t("follow-program.create-account.available")}>
            <NumberFormat
              value={wallet.available}
              suffix={` ${currency}`}
              displayType="text"
            />
          </StatisticItem>
        </DialogField>
        <DialogField>
          <InputAmountField
            wide
            isAllowed={allowPositiveValuesNumberFormat(
              CURRENCY_FRACTIONS(currency)
            )}
            name={CREATE_ACCOUNT_FORM_FIELDS.depositAmount}
            label={t("follow-program.create-account.amount")}
            currency={currency}
            setMax={setMaxAmount}
          />
          {followCurrency !== currency && (
            <NumberFormat
              value={formatCurrencyValue(
                convertToCurrency(+depositAmount, rate),
                followCurrency
              )}
              prefix="≈ "
              suffix={` ${followCurrency}`}
              displayType="text"
            />
          )}
        </DialogField>
        <DialogButtons>
          <GVButton
            wide
            type="submit"
            className="invest-form__submit-button"
            disabled={disabled}
          >
            {t("follow-program.create-account.next")}
          </GVButton>
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

export interface CreateAccountFormProps {
  minDeposit: number;
  wallets: WalletData[];
  followCurrency: CurrencyEnum;
  onClick: (values: CreateAccountFormValues) => void;
}

export interface CreateAccountFormValues {
  [CREATE_ACCOUNT_FORM_FIELDS.depositWalletId]: string;
  [CREATE_ACCOUNT_FORM_FIELDS.currency]: CurrencyEnum;
  [CREATE_ACCOUNT_FORM_FIELDS.depositAmount]: number | string;
}

const FollowCreateAccount = React.memo(_FollowCreateAccount);
export default FollowCreateAccount;
