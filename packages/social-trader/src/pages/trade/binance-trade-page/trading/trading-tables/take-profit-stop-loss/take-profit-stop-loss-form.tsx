import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogList } from "components/dialog/dialog-list";
import { DialogListItem } from "components/dialog/dialog-list-item";
import { DialogTop } from "components/dialog/dialog-top";
import HookFormAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Separator } from "components/separator/separator";
import { SubmitButton } from "components/submit-button/submit-button";
import { Text } from "components/text/text";
import { BinancePositionSide, BinanceWorkingType } from "gv-api-web";
import { API_REQUEST_STATUS } from "hooks/api-request.hook";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { noRequiredMinMaxNumberRules } from "utils/validators/validators";

import { terminalMoneyFormat } from "../../components/terminal-money-format/terminal-money-format";
import { FilterValues } from "../../place-order/place-order.types";
import { getDecimalScale, getTextColor } from "../../terminal.helpers";
import { FuturesOrder } from "../../terminal.types";
import {
  calculateRealizedPNL,
  USDTtickSize
} from "../positions/positions.helpers";
import TakeProfitStopLossOrderRow from "./take-profit-stop-loss-order-row";
import { WORKING_MARK_VALUE, WorkingTypeSelect } from "./working-type-select";

export enum TAKE_PROFIT_STOP_LOSS_FORM_FIELDS {
  takeProfit = "takeProfit",
  stopLoss = "stopLoss"
}

interface ITakeProfitStopLossDefaultFormValues {
  [TAKE_PROFIT_STOP_LOSS_FORM_FIELDS.takeProfit]?: string;
  [TAKE_PROFIT_STOP_LOSS_FORM_FIELDS.stopLoss]?: string;
}

export interface ITakeProfitStopLossFormValues
  extends ITakeProfitStopLossDefaultFormValues {
  tpWorkingType: BinanceWorkingType;
  slWorkingType: BinanceWorkingType;
  dirtyFields: Set<TAKE_PROFIT_STOP_LOSS_FORM_FIELDS>;
}

interface Props {
  entryPrice: number;
  markPrice: number;
  symbol: string;
  leverage: number;
  quantity: number;
  filterValues: FilterValues;
  onSubmit: (values: ITakeProfitStopLossFormValues) => any;
  status: API_REQUEST_STATUS;
  positionSide: BinancePositionSide;
  takeProfitOrder?: FuturesOrder;
  stopLossOrder?: FuturesOrder;
}

const _TakeProfitStopLossForm: React.FC<Props> = ({
  entryPrice,
  symbol,
  filterValues,
  leverage,
  positionSide,
  markPrice,
  quantity,
  status,
  takeProfitOrder,
  stopLossOrder,
  onSubmit
}) => {
  const [t] = useTranslation();

  const { maxPrice, minPrice, tickSize } = filterValues;

  const [tpWorkingType, setTPWorkingType] = useState<string>(
    takeProfitOrder ? takeProfitOrder.workingType : WORKING_MARK_VALUE
  );
  const [slWorkingType, setSLWorkingType] = useState<string>(
    stopLossOrder ? stopLossOrder.workingType : WORKING_MARK_VALUE
  );

  const direction = quantity > 0 ? "Long" : "Short";

  const form = useForm<ITakeProfitStopLossFormValues>({
    defaultValues: {
      [TAKE_PROFIT_STOP_LOSS_FORM_FIELDS.stopLoss]: stopLossOrder
        ? String(stopLossOrder.stopPrice)
        : undefined,
      [TAKE_PROFIT_STOP_LOSS_FORM_FIELDS.takeProfit]: takeProfitOrder
        ? String(takeProfitOrder.stopPrice)
        : undefined
    },
    mode: "onChange"
  });

  const {
    watch,
    formState: { dirtyFields }
  } = form;
  const { stopLoss, takeProfit } = watch();

  const tpPNL = useMemo(
    () =>
      calculateRealizedPNL({
        entryPrice,
        exitPrice: takeProfit ? +takeProfit : 0,
        direction,
        quantity
      }),
    [entryPrice, quantity, takeProfit, direction]
  );

  const slPNL = useMemo(
    () =>
      calculateRealizedPNL({
        entryPrice,
        exitPrice: stopLoss ? +stopLoss : 0,
        direction,
        quantity
      }),
    [entryPrice, quantity, stopLoss, direction]
  );

  return (
    <HookForm
      form={form}
      onSubmit={values =>
        onSubmit({ ...values, tpWorkingType, slWorkingType, dirtyFields })
      }
    >
      <DialogTop title={"TP/SL for entire position"} />
      <DialogBottom>
        <DialogList>
          <DialogListItem label={"Symbol"} size={"small"}>
            <Text color={direction === "Long" ? "green" : "red"}>
              {symbol} {positionSide !== "Both" && positionSide} {leverage}x
            </Text>
          </DialogListItem>
          <DialogListItem label={"Entry Price"} size={"small"}>
            {terminalMoneyFormat({
              amount: entryPrice,
              tickSize
            })}{" "}
            USDT
          </DialogListItem>
          <DialogListItem label={"Mark Price"} size={"small"}>
            {terminalMoneyFormat({
              amount: markPrice,
              tickSize
            })}{" "}
            USDT
          </DialogListItem>
        </DialogList>
        {takeProfitOrder && (
          <Row>
            <TakeProfitStopLossOrderRow
              label={"Take Profit"}
              order={takeProfitOrder}
              symbol={symbol}
              tickSize={tickSize}
            />
          </Row>
        )}
        <Row hide={!!takeProfitOrder}>
          <RowItem>
            <HookFormAmountField
              autoFocus={false}
              label={"Take Profit"}
              currency={"USDT"}
              decimalScale={getDecimalScale(tickSize)}
              name={TAKE_PROFIT_STOP_LOSS_FORM_FIELDS.takeProfit}
              rules={noRequiredMinMaxNumberRules({
                t,
                min: minPrice,
                max: maxPrice
              })}
            />
          </RowItem>
          <RowItem>
            <WorkingTypeSelect
              workingType={tpWorkingType}
              setWorkingType={setTPWorkingType}
            />
          </RowItem>
        </Row>
        <Row>
          <Text muted>
            When{" "}
            <Text color={"white"}>
              {tpWorkingType === "Mark" ? "Mark Price" : "Last Price"}
            </Text>{" "}
            reaches{" "}
            <Text color={"white"}>
              {terminalMoneyFormat({
                amount: takeProfit ? +takeProfit : 0,
                tickSize
              })}
            </Text>
            , it will trigger Take Profit Market order to close this position.
            Estimated PNL will be{" "}
            <Text
              color={takeProfit === undefined ? undefined : getTextColor(tpPNL)}
            >
              {takeProfit === undefined
                ? "--"
                : terminalMoneyFormat({
                    amount: tpPNL,
                    // fix hardcoded tickSize
                    tickSize: USDTtickSize
                  })}
            </Text>{" "}
            USDT
          </Text>
        </Row>
        <Row>
          <Separator />
        </Row>
        {stopLossOrder && (
          <Row>
            <TakeProfitStopLossOrderRow
              label={"Stop Loss"}
              order={stopLossOrder}
              symbol={symbol}
              tickSize={tickSize}
            />
          </Row>
        )}
        <Row hide={!!stopLossOrder}>
          <RowItem>
            <HookFormAmountField
              autoFocus={false}
              label={"Stop Loss"}
              currency={"USDT"}
              decimalScale={getDecimalScale(tickSize)}
              name={TAKE_PROFIT_STOP_LOSS_FORM_FIELDS.stopLoss}
              rules={noRequiredMinMaxNumberRules({
                t,
                min: minPrice,
                max: maxPrice
              })}
            />
          </RowItem>
          <RowItem>
            <WorkingTypeSelect
              workingType={slWorkingType}
              setWorkingType={setSLWorkingType}
            />
          </RowItem>
        </Row>
        <Row>
          <Text muted>
            When{" "}
            <Text color={"white"}>
              {slWorkingType === "Mark" ? "Mark Price" : "Last Price"}
            </Text>{" "}
            reaches{" "}
            <Text color={"white"}>
              {" "}
              {terminalMoneyFormat({
                amount: stopLoss ? +stopLoss : 0,
                tickSize
              })}
            </Text>
            , it will trigger Stop Market order to close this position.
            Estimated PNL will be{" "}
            <Text
              color={stopLoss === undefined ? undefined : getTextColor(slPNL)}
            >
              {stopLoss === undefined
                ? "--"
                : terminalMoneyFormat({
                    amount: slPNL,
                    // fix hardcoded tickSize
                    tickSize: USDTtickSize
                  })}
            </Text>{" "}
            USDT
          </Text>
        </Row>
        <Row>
          <Text>
            * This setting applies to the entire position. Take-profit and
            stop-loss automatically cancel after closing the position. A market
            order is triggered when the stop price is reached. The order will be
            rejected if the position size exceeds the Max Market Order Qty
            limit.
          </Text>
        </Row>
        <DialogButtons>
          <SubmitButton wide isSuccessful={status === "SUCCESS"}>
            {t("buttons.confirm")}
          </SubmitButton>
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

const TakeProfitStopLossForm = React.memo(_TakeProfitStopLossForm);
export default TakeProfitStopLossForm;
