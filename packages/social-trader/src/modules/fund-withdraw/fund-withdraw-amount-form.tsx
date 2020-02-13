import { HookFormWalletField as WalletSelect } from "components/deposit/components/form-fields/wallet-field";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import GVButton from "components/gv-button";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { WalletBaseData } from "gv-api-web";
import {
  fundWithdrawAmountFormValidationSchema,
  MIN_FUND_WITHDRAW_VALUE
} from "modules/fund-withdraw/fund-withdraw-amount-form-validation-schema";
import {
  FUND_WITHDRAW_FIELDS,
  FundWithDrawFormValues
} from "modules/fund-withdraw/fund-withdraw.types";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { useSelector } from "react-redux";
import { fundMinWithdrawAmountSelector } from "reducers/platform-reducer";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import { FundWithdrawResult } from "./fund-withdraw-result";

const getMinPercent = (value: number, total: number) =>
  Math.max((value / total) * 100, MIN_FUND_WITHDRAW_VALUE);

const _FundWithdrawAmountForm: React.FC<Props> = ({
  onSubmit,
  isPending,
  currency,
  setCurrency,
  wallets,
  availableToWithdraw,
  exitFee
}) => {
  const [t] = useTranslation();

  const [minPercent, setMinPercent] = useState(0);
  const fundMinWithdrawAmount = useSelector(fundMinWithdrawAmountSelector);
  const fundMinWithdrawAmountInCur = safeGetElemFromArray(
    fundMinWithdrawAmount,
    amount => amount.currency === currency
  ).amount;

  const form = useForm<FundWithDrawFormValues>({
    defaultValues: {
      [FUND_WITHDRAW_FIELDS.walletId]: wallets[0].id,
      [FUND_WITHDRAW_FIELDS.percent]: minPercent
    },
    validationSchema: fundWithdrawAmountFormValidationSchema(t, minPercent),
    mode: "onChange"
  });
  const {
    watch,
    setValue,
    formState: { isValid }
  } = form;
  const { percent } = watch();

  useEffect(() => {
    const min = getMinPercent(fundMinWithdrawAmountInCur, availableToWithdraw);
    setMinPercent(min);
    setValue(FUND_WITHDRAW_FIELDS.percent, min, true);
  }, [availableToWithdraw, fundMinWithdrawAmountInCur]);

  const isAllow = useCallback(
    (values: NumberFormatValues) =>
      !values.floatValue ||
      (values.floatValue >= MIN_FUND_WITHDRAW_VALUE &&
        values.floatValue <= 100 &&
        values.value !== "."),
    []
  );

  const setMax = useCallback(
    () => setValue(FUND_WITHDRAW_FIELDS.percent, 100, true),
    [setValue]
  );

  const setMin = useCallback(
    () => setValue(FUND_WITHDRAW_FIELDS.percent, minPercent, true),
    [setValue, minPercent]
  );

  const changeWalletCallback = useCallback(
    ({ id }: WalletItemType) => {
      setValue(FUND_WITHDRAW_FIELDS.walletId, id, true);
      const currency = safeGetElemFromArray(wallets, wallet => id === wallet.id)
        .currency;
      setCurrency(currency);
    },
    [wallets, setValue, setCurrency]
  );

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <DialogField>
        <WalletSelect
          name={FUND_WITHDRAW_FIELDS.walletId}
          wallets={wallets}
          onChange={changeWalletCallback}
        />
      </DialogField>
      <InputAmountField
        name={FUND_WITHDRAW_FIELDS.percent}
        label={t("withdraw-fund.amount-to-withdraw")}
        placeholder="%"
        currency="%"
        isAllow={isAllow}
        setMax={setMax}
        setMin={setMin}
      />
      <FundWithdrawResult
        isPending={isPending}
        availableToWithdraw={availableToWithdraw}
        currency={currency}
        percent={percent || 0}
        exitFee={exitFee}
      />
      <DialogButtons>
        <GVButton
          disabled={!isValid}
          wide
          type="submit"
          id="fundWithdrawAmountFormSubmit"
        >
          {t("buttons.next")}
        </GVButton>
      </DialogButtons>
    </HookForm>
  );
};

interface Props {
  isPending: boolean;
  currency: CurrencyEnum;
  setCurrency: (id: CurrencyEnum) => void;
  wallets: WalletBaseData[];
  onSubmit: (values: FundWithDrawFormValues) => void;
  exitFee: number;
  availableToWithdraw: number;
}

const FundWithdrawAmountForm = React.memo(_FundWithdrawAmountForm);
export default FundWithdrawAmountForm;
