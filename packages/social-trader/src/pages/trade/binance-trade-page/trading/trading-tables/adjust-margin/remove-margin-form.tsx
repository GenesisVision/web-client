import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogList } from "components/dialog/dialog-list";
import { DialogListItem } from "components/dialog/dialog-list-item";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import { BinancePositionSide } from "gv-api-web";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import React, { useCallback, useMemo } from "react";
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
  calculateMaxRemovableAmount,
  IAdjustMarginDefaultFormValues
} from "./adjust-margin.helpers";

interface Props {
  quoteAsset: string;
  tickSize: string;
  entryPrice: number;
  markPrice: number;
  symbol: string;
  leverage: number;
  maintAmount: number;
  maintMarginRate: number;
  margin: number;
  maintMargin: number;
  quantity: number;
  positionSide: BinancePositionSide;
  onSubmit: (values: IAdjustMarginDefaultFormValues) => any;
  status: API_REQUEST_STATUS;
}

const _RemoveMarginForm: React.FC<Props> = ({
  quoteAsset,
  tickSize,
  entryPrice,
  maintMargin,
  positionSide,
  maintAmount,
  maintMarginRate,
  symbol,
  margin,
  leverage,
  markPrice,
  quantity,
  status,
  onSubmit
}) => {
  const [t] = useTranslation();

  // fix hardcoded tickSize
  const truncatedMargin = truncated(margin, getDecimalScale(USDTtickSize));

  const form = useForm<IAdjustMarginDefaultFormValues>({
    defaultValues: {
      [ADJUST_MARGIN_FORM_FIELDS.amount]: undefined
    },
    mode: "onChange"
  });

  const { watch, setValue } = form;
  let { amount } = watch();

  amount = amount ? amount : 0;

  const liquidationPrice = calculateIsolatedLiqPrice({
    entryPrice,
    isolatedWallet: truncatedMargin - +amount,
    maintAmount,
    maintMarginRate,
    positionSide,
    quantity
  });

  const maxRemovable = useMemo(
    () =>
      calculateMaxRemovableAmount({
        entryPrice,
        markPrice,
        leverage,
        quantity,
        isolatedWallet: truncatedMargin,
        isolatedMaintMargin: maintMargin
      }),
    [entryPrice, markPrice, leverage, quantity, truncatedMargin, maintMargin]
  );

  const setMax = useCallback(() => {
    setValue(ADJUST_MARGIN_FORM_FIELDS.amount, maxRemovable, true);
  }, [maxRemovable]);

  return (
    <HookForm form={form} onSubmit={onSubmit} resetOnSuccess>
      <Row>
        <HookFormAmountField
          label={`Amount(${quoteAsset})`}
          currency={quoteAsset}
          // fix hardcoded tickSize
          decimalScale={getDecimalScale(USDTtickSize)}
          setMax={setMax}
          name={ADJUST_MARGIN_FORM_FIELDS.amount}
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
        <DialogListItem label={"Max removable"} size={"small"}>
          {terminalMoneyFormat({
            amount: maxRemovable,
            // fix hardcoded tickSize
            tickSize: USDTtickSize
          })}{" "}
          {quoteAsset}
        </DialogListItem>
        <DialogListItem label={"Liq. Price after reduction"} size={"small"}>
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

const RemoveMarginForm = React.memo(_RemoveMarginForm);
export default RemoveMarginForm;
