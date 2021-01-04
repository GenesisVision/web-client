import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogList } from "components/dialog/dialog-list";
import { DialogListItem } from "components/dialog/dialog-list-item";
import { DialogTop } from "components/dialog/dialog-top";
import { GVHookFormField } from "components/gv-hook-form-field";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { WalletSelectContainer } from "components/wallet-select/wallet-select.container";
import { WalletData } from "gv-api-web";
import {
  WALLET_WITHDRAW_FIELDS,
  walletWithdrawValidationSchema
} from "modules/wallet-withdraw/components/wallet-withdraw-form.helpers";
import * as React from "react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";
import { twoFactorRules } from "utils/validators/validators";

export interface IWalletWithdrawFormValues {
  [WALLET_WITHDRAW_FIELDS.currency]: CurrencyEnum;
  [WALLET_WITHDRAW_FIELDS.id]: string;
  [WALLET_WITHDRAW_FIELDS.amount]: string;
  [WALLET_WITHDRAW_FIELDS.address]: string;
  [WALLET_WITHDRAW_FIELDS.twoFactorCode]: string;
}

interface Props {
  twoFactorEnabled: boolean;
  currentWallet: WalletData;
  onSubmit: (data: IWalletWithdrawFormValues) => void;
  errorMessage?: string;
}

const _WalletWithdrawForm: React.FC<Props> = ({
  onSubmit,
  twoFactorEnabled,
  errorMessage,
  currentWallet
}) => {
  const [selected, setSelected] = useState<WalletData>(currentWallet);
  const { withdrawalCommission, available, currency } = selected;

  const [t] = useTranslation();
  const form = useForm<IWalletWithdrawFormValues>({
    defaultValues: {
      [WALLET_WITHDRAW_FIELDS.id]: selected.id,
      [WALLET_WITHDRAW_FIELDS.currency]: selected.currency
    },
    validationSchema: walletWithdrawValidationSchema({
      t,
      twoFactorEnabled,
      currency
    }),
    mode: "onChange"
  });
  const { reset, watch, setValue } = form;

  const { amount } = watch();

  const onChangeCurrency = useCallback(
    (wallet: WalletItemType) => {
      reset({
        [WALLET_WITHDRAW_FIELDS.currency]: wallet.currency,
        [WALLET_WITHDRAW_FIELDS.id]: wallet.id,
        [WALLET_WITHDRAW_FIELDS.amount]: ""
      });
      setSelected(wallet as WalletData);
    },
    [setValue, setSelected]
  );
  const willGet = Math.max(parseFloat(amount) - withdrawalCommission, 0);
  const isAllow = useCallback(
    (inputValues: NumberFormatValues) => {
      const { floatValue, formattedValue, value } = inputValues;
      return (
        formattedValue === "" ||
        (validateFraction(value, currency) && floatValue <= available)
      );
    },
    [currency, available]
  );
  const setMaxAmount = useCallback(() => {
    setValue(
      WALLET_WITHDRAW_FIELDS.amount,
      formatCurrencyValue(available, currency),
      true
    );
  }, [setValue, available, currency]);

  const handleSubmit = useCallback(
    (values: IWalletWithdrawFormValues) => {
      return onSubmit({ ...values, currency });
    },
    [currency]
  );

  return (
    <HookForm form={form} onSubmit={handleSubmit}>
      <DialogTop title={t("wallet-withdraw:title")}>
        <Row size={"large"}>
          <WalletSelectContainer
            filterFunc={(wallet: WalletData) => wallet.isWithdrawalEnabled}
            name={WALLET_WITHDRAW_FIELDS.id}
            label={t("wallet-withdraw:select-currency")}
            onChange={onChangeCurrency}
          />
        </Row>
      </DialogTop>
      <DialogBottom>
        <Row>
          <GVHookFormField
            wide
            name={WALLET_WITHDRAW_FIELDS.address}
            label={t("wallet-withdraw:address")}
            component={SimpleTextField}
            autoComplete="off"
          />
        </Row>
        <InputAmountField
          name={WALLET_WITHDRAW_FIELDS.amount}
          label={t("wallet-withdraw:amount")}
          currency={currency}
          isAllowed={isAllow}
          setMax={setMaxAmount}
        />
        {twoFactorEnabled && (
          <Row>
            <GVHookFormField
              wide
              type="text"
              name={WALLET_WITHDRAW_FIELDS.twoFactorCode}
              label={t("labels.two-factor-code-label")}
              autoComplete="off"
              component={SimpleTextField}
              rules={twoFactorRules(t)}
            />
          </Row>
        )}
        <DialogList>
          <DialogListItem label={t("wallet-withdraw:will-get")}>
            <NumberFormat
              value={formatCurrencyValue(willGet, currency)}
              suffix={` ${currency}`}
              displayType="text"
            />
          </DialogListItem>
          <DialogListItem label={t("wallet-withdraw:fee")}>
            <NumberFormat
              value={formatCurrencyValue(withdrawalCommission, currency)}
              suffix={` ${currency}`}
              displayType="text"
            />
          </DialogListItem>
        </DialogList>
        {errorMessage && <DialogError error={errorMessage} />}
        <DialogButtons>
          <SubmitButton wide isSuccessful={!errorMessage}>
            {t("buttons.confirm")}
          </SubmitButton>
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

const WalletWithdrawForm = React.memo(_WalletWithdrawForm);
export default WalletWithdrawForm;
