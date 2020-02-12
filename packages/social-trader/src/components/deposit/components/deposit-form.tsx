import {
  DEPOSIT_FORM_FIELDS,
  IDepositFormValues,
  INIT_WALLET_CURRENCY,
  isAllow
} from "components/deposit/components/deposit.helpers";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogField } from "components/dialog/dialog-field";
import { DialogInfo } from "components/dialog/dialog-info";
import GVButton from "components/gv-button";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import StatisticItem from "components/statistic-item/statistic-item";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { ASSET } from "constants/constants";
import { WalletBaseData } from "gv-api-web";
import { useGetRate } from "hooks/get-rate.hook";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import { depositValidationSchema } from "./deposit-form-validation-schema";
import { TFees } from "./deposit.types";
import { ConvertCurrency } from "./form-fields/convert-currency";
import { InvestorFees } from "./form-fields/investor-fees";
import { HookFormWalletField as WalletField } from "./form-fields/wallet-field";

const _DepositForm: React.FC<Props> = ({
  onSubmit,
  minDeposit,
  fees,
  availableToInvest: availableToInvestInAsset = Number.MAX_SAFE_INTEGER,
  wallets,
  asset,
  hasEntryFee,
  currency,
  errorMessage,
  ownAsset
}) => {
  const [t] = useTranslation();
  const [wallet, setWallet] = useState<WalletBaseData>(
    safeGetElemFromArray(
      wallets,
      ({ currency }) => currency === INIT_WALLET_CURRENCY
    )
  );
  const { rate, getRate } = useGetRate();

  const form = useForm<IDepositFormValues>({
    defaultValues: {
      [DEPOSIT_FORM_FIELDS.walletId]: wallet.id
    },
    validationSchema: depositValidationSchema({
      rate,
      wallets,
      availableToInvestInAsset,
      minDeposit,
      t,
      currency
    }),
    mode: "onChange"
  });
  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid, isSubmitted }
  } = form;
  const { amount = 0 } = watch();

  useEffect(() => {
    getRate({ from: wallet.currency, to: currency });
  }, [currency, wallet]);

  const setMaxAmount = useCallback((): void => {
    const max = formatCurrencyValue(
      Math.min(
        wallet.available,
        convertToCurrency(availableToInvestInAsset, rate)
      ),
      wallet.currency
    );
    setValue(DEPOSIT_FORM_FIELDS.amount, max, true);
  }, [availableToInvestInAsset, wallet]);

  const setMinAmount = useCallback((): void => {
    const min = convertToCurrency(minDeposit, rate);
    setValue(DEPOSIT_FORM_FIELDS.amount, min, true);
  }, [minDeposit, rate]);

  const onWalletChange = useCallback(
    ({ id }: WalletItemType) => {
      reset({
        [DEPOSIT_FORM_FIELDS.walletId]: id,
        [DEPOSIT_FORM_FIELDS.amount]: ""
      });
      setWallet(safeGetElemFromArray(wallets, wallet => id === wallet.id));
    },
    [wallets]
  );

  const isSuccessful = isSubmitted && !errorMessage;

  return (
    <HookForm form={form} onSubmit={handleSubmit(onSubmit)}>
      <DialogBottom>
        <DialogField>
          <WalletField
            wallets={wallets}
            name={DEPOSIT_FORM_FIELDS.walletId}
            onChange={onWalletChange}
          />
        </DialogField>
        <DialogField>
          <StatisticItem label={t("deposit-asset.available-in-wallet")} big>
            {formatCurrencyValue(wallet.available, wallet.currency)}{" "}
            {wallet.currency}
          </StatisticItem>
        </DialogField>
        <InputAmountField
          setMin={setMinAmount}
          name={DEPOSIT_FORM_FIELDS.amount}
          label={t("deposit-asset.amount")}
          currency={wallet.currency}
          isAllow={isAllow(wallet.currency)}
          setMax={setMaxAmount}
        />
        <ConvertCurrency
          condition={currency !== wallet.currency}
          amount={+amount}
          rate={rate}
          currency={currency}
        />
        {!ownAsset && (
          <InvestorFees
            fees={fees}
            hasEntryFee={hasEntryFee}
            amount={+amount}
            rate={rate}
            currency={currency}
            walletCurrency={wallet.currency}
          />
        )}
        <DialogError error={errorMessage} />
        <DialogButtons>
          <GVButton
            isSuccessful={isSuccessful}
            isPending={isSubmitting}
            wide
            type="submit"
            className="invest-form__submit-button"
            disabled={isSubmitting || !isValid || isSuccessful}
          >
            {t("deposit-asset.confirm")}
          </GVButton>
        </DialogButtons>
        {asset === ASSET.FUND && (
          <DialogInfo>{t("deposit-asset.fund.disclaimer")}</DialogInfo>
        )}
      </DialogBottom>
    </HookForm>
  );
};

const DepositForm = React.memo(_DepositForm);
export default DepositForm;

export interface Props {
  minDeposit: number;
  ownAsset?: boolean;
  fees: TFees;
  availableToInvest?: number;
  wallets: WalletBaseData[];
  asset: ASSET;
  hasEntryFee: boolean;
  currency: CurrencyEnum;
  errorMessage: string;
  onSubmit: (values: IDepositFormValues) => void;
}
