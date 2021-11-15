import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogList } from "components/dialog/dialog-list";
import { DialogListItem } from "components/dialog/dialog-list-item";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import { BinancePositionSide } from "gv-api-web";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { minMaxNumberRules } from "utils/validators/validators";

import {
  terminalMoneyFormat,
  truncated
} from "../../components/terminal-money-format/terminal-money-format";
import { getDecimalScale } from "../../terminal.helpers";
import {
  calculateIsolatedLiqPrice,
  USDTtickSize
} from "../positions/positions.helpers";
import {
  ADJUST_MARGIN_FORM_FIELDS,
  IAdjustMarginDefaultFormValues
} from "./adjust-margin.helpers";

interface Props {
  tickSize: string;
  entryPrice: number;
  quoteAsset: string;
  symbol: string;
  margin: number;
  maintAmount: number;
  maintMarginRate: number;
  availableBalance: number;
  quantity: number;
  onSubmit: (values: IAdjustMarginDefaultFormValues) => any;
  status: API_REQUEST_STATUS;
  positionSide: BinancePositionSide;
}

const _AddMarginForm: React.FC<Props> = ({
  tickSize,
  quoteAsset,
  entryPrice,
  symbol,
  margin,
  availableBalance,
  maintAmount,
  maintMarginRate,
  positionSide,
  quantity,
  status,
  onSubmit
}) => {
  const [t] = useTranslation();

  // fix hardcoded tickSize
  const truncatedBalance = truncated(
    availableBalance,
    getDecimalScale(USDTtickSize)
  );
  const truncatedMargin = truncated(margin, getDecimalScale(USDTtickSize));

  const form = useForm<IAdjustMarginDefaultFormValues>({
    defaultValues: {
      [ADJUST_MARGIN_FORM_FIELDS.amount]: undefined
    },
    mode: "onChange"
  });

  const { watch, setValue } = form;
  let { amount } = watch();

  amount ??= 0;

  const liquidationPrice = calculateIsolatedLiqPrice({
    entryPrice,
    isolatedWallet: truncatedMargin + +amount,
    maintAmount,
    maintMarginRate,
    positionSide,
    quantity
  });

  const setMax = useCallback(() => {
    setValue(ADJUST_MARGIN_FORM_FIELDS.amount, truncatedBalance, true);
  }, [truncatedBalance]);

  return (
    <HookForm form={form} onSubmit={onSubmit} resetOnSuccess>
      <Row>
        <HookFormAmountField
          label={`Amount(${quoteAsset})`}
          currency={quoteAsset}
          // fix hardcoded tickSize
          decimalScale={getDecimalScale(USDTtickSize)}
          name={ADJUST_MARGIN_FORM_FIELDS.amount}
          setMax={setMax}
          rules={minMaxNumberRules({
            t,
            min: 0,
            max: Number.MAX_SAFE_INTEGER
          })}
        />
      </Row>
      <DialogList>
        <DialogListItem label={`Currently Margin for ${symbol}`} size={"small"}>
          {terminalMoneyFormat({
            amount: truncatedMargin,
            // fix hardcoded tickSize
            tickSize: USDTtickSize
          })}{" "}
          {quoteAsset}
        </DialogListItem>
        <DialogListItem label={"Max addable"} size={"small"}>
          {terminalMoneyFormat({
            amount: truncatedBalance,
            // fix hardcoded tickSize
            tickSize: USDTtickSize
          })}{" "}
          {quoteAsset}
        </DialogListItem>
        <DialogListItem label={"Liq. Price after increase"} size={"small"}>
          {liquidationPrice <= 0
            ? "-"
            : terminalMoneyFormat({
                amount: liquidationPrice,
                tickSize
              })}{" "}
          {quoteAsset}
        </DialogListItem>
      </DialogList>
      <DialogButtons>
        <SubmitButton wide isSuccessful={status === "SUCCESS"}>
          {t("buttons.confirm")}
        </SubmitButton>
      </DialogButtons>
    </HookForm>
  );
};

const AddMarginForm = React.memo(_AddMarginForm);
export default AddMarginForm;
