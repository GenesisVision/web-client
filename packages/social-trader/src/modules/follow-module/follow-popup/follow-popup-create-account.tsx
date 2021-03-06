import { DialogButtons } from "components/dialog/dialog-buttons";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import {
  CommonWalletType,
  WalletItemType
} from "components/wallet-select/wallet-select";
import { WalletSelectContainer } from "components/wallet-select/wallet-select.container";
import { useGetRate } from "hooks/get-rate.hook";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import {
  convertToCurrency,
  CURRENCY_FRACTIONS
} from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { allowPositiveValuesNumberFormat } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import {
  CREATE_ACCOUNT_FORM_FIELDS,
  depositAmountRules
} from "./follow-popup-create-account.validators";

export interface CreateAccountFormProps {
  wallet: CommonWalletType;
  minDeposit: number;
  followCurrency: CurrencyEnum;
  onClick: (values: CreateAccountFormValues) => void;
}

export interface CreateAccountFormValues {
  [CREATE_ACCOUNT_FORM_FIELDS.depositWalletId]: string;
  [CREATE_ACCOUNT_FORM_FIELDS.depositAmount]: number | string;
}

const _FollowCreateAccount: React.FC<CreateAccountFormProps> = ({
  wallet: externalWallet,
  minDeposit,
  onClick,
  followCurrency
}) => {
  const [wallet, setWallet] = useState(externalWallet);

  const { rate, getRate } = useGetRate();

  const [t] = useTranslation();

  const form = useForm<CreateAccountFormValues>({
    defaultValues: {
      [CREATE_ACCOUNT_FORM_FIELDS.depositWalletId]: externalWallet.id
    },
    mode: "onChange"
  });
  const { reset, watch, setValue } = form;

  const { depositAmount } = watch();

  useEffect(() => {
    followCurrency &&
      wallet.currency &&
      getRate({ from: followCurrency as CurrencyEnum, to: wallet.currency });
  }, [followCurrency, wallet.currency]);

  const onChangeCurrencyFrom = useCallback((wallet: WalletItemType) => {
    setWallet(wallet);
    reset({
      [CREATE_ACCOUNT_FORM_FIELDS.depositWalletId]: wallet.id,
      [CREATE_ACCOUNT_FORM_FIELDS.depositAmount]: ""
    });
  }, []);
  const setMaxAmount = useCallback(() => {
    setValue(
      CREATE_ACCOUNT_FORM_FIELDS.depositAmount,
      formatCurrencyValue(wallet.available, followCurrency),
      true
    );
  }, [followCurrency, wallet.available]);

  return (
    <HookForm form={form} onSubmit={onClick}>
      <Row>
        <WalletSelectContainer
          name={CREATE_ACCOUNT_FORM_FIELDS.depositWalletId}
          label={t("follow-program.create-account.from")}
          onChange={onChangeCurrencyFrom}
        />
      </Row>
      <InputAmountField
        wide
        isAllowed={allowPositiveValuesNumberFormat(
          CURRENCY_FRACTIONS(wallet.currency)
        )}
        name={CREATE_ACCOUNT_FORM_FIELDS.depositAmount}
        label={t("follow-program.create-account.amount")}
        currency={wallet.currency}
        setMax={setMaxAmount}
        rules={depositAmountRules({
          wallet,
          rate,
          minDeposit,
          t
        })}
      />
      {followCurrency !== wallet.currency && (
        <Row>
          <NumberFormat
            value={formatCurrencyValue(
              convertToCurrency(+depositAmount, rate),
              followCurrency
            )}
            prefix="≈ "
            suffix={` ${followCurrency}`}
            displayType="text"
          />
        </Row>
      )}
      <DialogButtons>
        <SubmitButton wide>
          {t("follow-program.create-account.next")}
        </SubmitButton>
      </DialogButtons>
    </HookForm>
  );
};

const FollowCreateAccount = React.memo(_FollowCreateAccount);
export default FollowCreateAccount;
