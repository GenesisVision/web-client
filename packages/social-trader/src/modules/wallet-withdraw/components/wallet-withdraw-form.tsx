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
import { CommonWalletType } from "components/wallet-select/wallet-select";
import { WalletSelectContainer } from "components/wallet-select/wallet-select.container";
import { Blockchain, WalletData } from "gv-api-web";
import {
  getWalletWithdrawValidationSchema,
  WALLET_WITHDRAW_FIELDS
} from "modules/wallet-withdraw/components/wallet-withdraw-form.helpers";
import BlockchainSelectContainer from "pages/wallet/components/blockchain-select/blockchain-select-container";
import * as React from "react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { formatCurrencyValue, validateFraction } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";
import { twoFactorRules } from "utils/validators/validators";

export interface IWalletWithdrawFormValues {
  [WALLET_WITHDRAW_FIELDS.currency]: CurrencyEnum;
  [WALLET_WITHDRAW_FIELDS.id]: string;
  [WALLET_WITHDRAW_FIELDS.amount]: string;
  [WALLET_WITHDRAW_FIELDS.address]: string;
  [WALLET_WITHDRAW_FIELDS.blockchain]: Blockchain;
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

  const {
    withdrawalCommissions,
    available,
    currency,
    depositAddresses
  } = selected;

  const [t] = useTranslation();
  const form = useForm<IWalletWithdrawFormValues>({
    defaultValues: {
      [WALLET_WITHDRAW_FIELDS.id]: selected.id,
      [WALLET_WITHDRAW_FIELDS.currency]: selected.currency,
      [WALLET_WITHDRAW_FIELDS.blockchain]: depositAddresses[0].blockchain
    },
    mode: "onChange"
  });
  const { reset, watch, setValue } = form;

  const { amount, blockchain } = watch();

  const onChangeCurrency = useCallback(
    (wallet: CommonWalletType) => {
      reset({
        [WALLET_WITHDRAW_FIELDS.currency]: wallet.currency,
        [WALLET_WITHDRAW_FIELDS.id]: wallet.id,
        [WALLET_WITHDRAW_FIELDS.amount]: "",
        [WALLET_WITHDRAW_FIELDS.blockchain]: (wallet.depositAddresses![0]
          .blockchain as unknown) as Blockchain
      });
      setSelected(wallet as WalletData);
    },
    [setValue, setSelected]
  );

  const withdrawalCommission = safeGetElemFromArray(
    withdrawalCommissions,
    withdrawalCommission => withdrawalCommission.blockchain === blockchain
  ).value;

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
        <Row size={"large"}>
          <BlockchainSelectContainer
            name={WALLET_WITHDRAW_FIELDS.blockchain}
            values={depositAddresses.map(item => item)}
          />
        </Row>
        <Row hide>
          <GVHookFormField
            wide
            name={WALLET_WITHDRAW_FIELDS.currency}
            label={t("wallet-withdraw:address")}
            component={SimpleTextField}
            autoComplete="off"
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
            triggerRules={blockchain}
            rules={getWalletWithdrawValidationSchema({
              t,
              watch
            })}
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
