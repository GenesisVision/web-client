import clsx from "clsx";
import ImageBase from "components/avatar/image-base";
import { CurrencyItem } from "components/currency-item/currency-item";
import { GVHookFormField } from "components/gv-hook-form-field";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { Text } from "components/text/text";
import {
  BalancesForTransfer,
  TerminalCurrency
} from "pages/trade/binance-trade-page/trading/terminal.types";
import {
  ENABLE_TRANSFER_ACCOUNTS,
  getBalanceNameFromNumber,
  getMaxValueForFuturesTransfer,
  TRANSFER_FORM_FIELDS,
  TransferFormValues
} from "pages/trade/binance-trade-page/trading/transfer/transfer.helpers";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import {
  convertShapeToRules,
  minMaxNumberShape
} from "utils/validators/validators";

import styles from "./transfer.module.scss";

interface Props {
  asset: TerminalCurrency;
  isSuccessful?: boolean;
  data: BalancesForTransfer;
  onSubmit: (values: TransferFormValues) => Promise<void>;
}

const _TransferForm: React.FC<Props> = ({
  asset: assetProp,
  isSuccessful,
  data,
  onSubmit
}) => {
  const [t] = useTranslation();
  const form = useForm<TransferFormValues>({
    defaultValues: {
      [TRANSFER_FORM_FIELDS.type]: 1,
      [TRANSFER_FORM_FIELDS.asset]: assetProp
    },
    mode: "onChange"
  });
  const { watch, setValue, reset } = form;
  const { asset, type } = watch();

  useEffect(() => {
    reset({ asset, type });
  }, [asset, type]);

  const maxAmount = getMaxValueForFuturesTransfer({
    type,
    asset,
    balances: data
  });

  const setMax = useCallback(() => {
    setValue(TRANSFER_FORM_FIELDS.amount, maxAmount, true);
  }, [maxAmount, setValue]);

  const handleTurn = useCallback(() => {
    const newType = type === 1 ? 2 : 1;
    setValue(TRANSFER_FORM_FIELDS.type, newType, true);
  }, [type, setValue]);

  const fromSource = getBalanceNameFromNumber(type);
  const toSource = getBalanceNameFromNumber(type === 1 ? 2 : 1);

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <Row className={styles["transfer__type-block"]}>
        <div className={styles["transfer__type-item"]}>
          <Row>
            <LabeledValue label={t("From")}>
              <span className={styles["transfer__wallet-name"]}>
                {fromSource}
              </span>
              &nbsp; wallet
            </LabeledValue>
          </Row>
          <Row size={"small"}>
            <Text wrap={false} muted>
              {getMaxValueForFuturesTransfer({ type, asset, balances: data })}{" "}
              {asset}
            </Text>
          </Row>
        </div>
        <div
          className={clsx(
            styles["transfer__type-item"],
            styles["transfer__type-turn-block"]
          )}
        >
          <div className={styles["transfer__type-turn"]} onClick={handleTurn}>
            <ImageBase
              className={styles["transfer__type-turn-img"]}
              src={
                "https://toppng.com/public/uploads/thumbnail/ampersand-svg-png-icon-free-download-two-curved-arrows-ico-115632580090xnuxgjr2d.png"
              }
            />
          </div>
        </div>
        <RowItem hide>
          <GVHookFormField
            component={SimpleTextField}
            name={TRANSFER_FORM_FIELDS.type}
          />
        </RowItem>
        <div className={styles["transfer__type-item"]}>
          <Row>
            <LabeledValue label={t("To")}>
              <span className={styles["transfer__wallet-name"]}>
                {toSource}
              </span>
              &nbsp; wallet
            </LabeledValue>
          </Row>
          <Row size={"small"}>
            <Text wrap={false} muted>
              {" "}
              {getMaxValueForFuturesTransfer({
                type: type === 1 ? 2 : 1,
                asset,
                balances: data
              })}{" "}
              {asset}
            </Text>
          </Row>
        </div>
      </Row>
      <Row>
        <GVHookFormField
          wide
          name={TRANSFER_FORM_FIELDS.asset}
          component={SimpleTextField}
          label={t("Coin")}
          InputComponent={Select}
        >
          {ENABLE_TRANSFER_ACCOUNTS.map(({ asset, title }) => (
            <option value={asset} key={asset}>
              <CurrencyItem clickable={false} symbol={asset} name={asset} />
            </option>
          ))}
        </GVHookFormField>
      </Row>
      <Row>
        <HookFormAmountField
          setMax={setMax}
          autoFocus={false}
          label={t("Amount")}
          currency={asset}
          name={TRANSFER_FORM_FIELDS.amount}
          rules={convertShapeToRules(
            minMaxNumberShape({
              min: 0,
              max: maxAmount,
              t
            })
          )}
        />
      </Row>
      <Row>
        <SubmitButton isSuccessful={isSuccessful} wide>
          {t("Confirm transfer")}
        </SubmitButton>
      </Row>
    </HookForm>
  );
};

export const TransferForm = React.memo(_TransferForm);
