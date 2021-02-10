import {
  DEPOSIT_FORM_FIELDS,
  getMinDepositFromAmounts,
  IDepositFormValues,
  isAllow
} from "components/deposit/components/deposit.helpers";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogInfo } from "components/dialog/dialog-info";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import { CommonWalletType } from "components/wallet-select/wallet-select";
import { WalletSelectContainer } from "components/wallet-select/wallet-select.container";
import { ASSET } from "constants/constants";
import { WalletBaseData } from "gv-api-web";
import { useGetRate } from "hooks/get-rate.hook";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import { MinDepositType, TFees } from "./deposit.types";
import { depositValidationSchema } from "./deposit-form-validation-schema";
import { ConvertCurrency } from "./form-fields/convert-currency";
import { InvestorFees } from "./form-fields/investor-fees";

export interface Props {
  infoMessage?: string;
  minDeposit: MinDepositType;
  ownAsset?: boolean;
  fees: TFees;
  availableToInvest?: number;
  initWallet: WalletBaseData;
  asset: ASSET;
  hasEntryFee: boolean;
  currency: CurrencyEnum;
  errorMessage: string;
  onSubmit: (values: IDepositFormValues) => void;
}

const _DepositForm: React.FC<Props> = ({
  infoMessage,
  onSubmit,
  minDeposit,
  fees,
  availableToInvest: availableToInvestInAsset = Number.MAX_SAFE_INTEGER,
  initWallet,
  asset,
  hasEntryFee,
  currency,
  errorMessage,
  ownAsset
}) => {
  const [t] = useTranslation();
  const [wallet, setWallet] = useState<CommonWalletType>(initWallet);
  const { rate, getRate } = useGetRate();

  const form = useForm<IDepositFormValues>({
    defaultValues: {
      [DEPOSIT_FORM_FIELDS.availableInWallet]: wallet.available,
      [DEPOSIT_FORM_FIELDS.walletId]: wallet.id
    },
    validationSchema: depositValidationSchema({
      rate,
      walletCurrency: wallet.currency,
      availableToInvestInAsset,
      minDeposit,
      t
    }),
    mode: "onChange"
  });
  const { reset, watch, setValue, triggerValidation } = form;
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
  }, [
    availableToInvestInAsset,
    wallet.available,
    wallet.currency,
    setValue,
    rate
  ]);

  const setMinAmount = useCallback((): void => {
    const min = getMinDepositFromAmounts(minDeposit, wallet.currency);
    setValue(DEPOSIT_FORM_FIELDS.amount, min, true);
  }, [minDeposit, rate, wallet, setValue]);

  const onWalletChange = useCallback(
    (newWallet: CommonWalletType) => {
      if (wallet.id !== newWallet.id)
        reset({
          [DEPOSIT_FORM_FIELDS.availableInWallet]: newWallet.available,
          [DEPOSIT_FORM_FIELDS.walletId]: newWallet.id,
          [DEPOSIT_FORM_FIELDS.amount]: ""
        });
      else
        setValue(
          DEPOSIT_FORM_FIELDS.availableInWallet,
          newWallet.available,
          true
        );
      setWallet(newWallet);
    },
    [amount, reset, triggerValidation, setValue]
  );
  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <Row>
        <WalletSelectContainer
          currentId={wallet.id}
          name={DEPOSIT_FORM_FIELDS.walletId}
          onChange={onWalletChange}
        />
      </Row>
      <InputAmountField
        currency={currency}
        hide
        name={DEPOSIT_FORM_FIELDS.availableInWallet}
      />
      <InputAmountField
        setMin={setMinAmount}
        name={DEPOSIT_FORM_FIELDS.amount}
        label={t("deposit-asset.amount")}
        currency={wallet.currency}
        isAllowed={isAllow(wallet.currency)}
        setMax={setMaxAmount}
      />
      {currency !== wallet.currency && (
        <Row>
          <ConvertCurrency amount={+amount} rate={rate} currency={currency} />
        </Row>
      )}
      {!ownAsset && (
        <InvestorFees
          asset={asset}
          fees={fees}
          hasEntryFee={hasEntryFee}
          amount={+amount}
          rate={rate}
          currency={currency}
          walletCurrency={wallet.currency}
        />
      )}
      {errorMessage && <DialogError error={errorMessage} />}
      <DialogButtons>
        <SubmitButton checkDirty={false} isSuccessful={!errorMessage} wide>
          {t("deposit-asset.confirm")}
        </SubmitButton>
      </DialogButtons>
      {infoMessage && <DialogInfo>{infoMessage}</DialogInfo>}
    </HookForm>
  );
};

const DepositForm = React.memo(_DepositForm);
export default DepositForm;
