import { BinancePositionSide } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useContext } from "react";
import { postponeCallback } from "utils/hook-form.helpers";

import { TerminalInfoContext } from "../../contexts/terminal-info.context";
import { TerminalMethodsContext } from "../../contexts/terminal-methods.context";
import {
  getFilterValues,
  mapPlaceOrderErrors
} from "../../place-order/place-order.helpers";
import { FuturesOrder } from "../../terminal.types";
import TakeProfitStopLossForm, {
  ITakeProfitStopLossFormValues,
  TAKE_PROFIT_STOP_LOSS_FORM_FIELDS
} from "./take-profit-stop-loss-form";

interface Props {
  entryPrice: number;
  markPrice: number;
  symbol: string;
  leverage: number;
  tickSize: string;
  quantity: number;
  positionSide: BinancePositionSide;
  takeProfitOrder?: FuturesOrder;
  stopLossOrder?: FuturesOrder;
  onClose: () => void;
}

const _TakeProfitStopLossPopup: React.FC<Props> = ({
  onClose,
  entryPrice,
  markPrice,
  symbol,
  leverage,
  quantity,
  positionSide,
  takeProfitOrder,
  stopLossOrder
}) => {
  const { tradeRequest } = useContext(TerminalMethodsContext);
  const { exchangeAccountId, exchangeInfo } = useContext(TerminalInfoContext);

  const filterValues = getFilterValues(exchangeInfo!, symbol);

  const { sendRequest, status } = useApiRequest({
    isUseLocalizationOnError: false,
    errorAlertHandler: mapPlaceOrderErrors,
    request: tradeRequest,
    middleware: [postponeCallback(onClose)]
  });

  const handleSubmit = (values: ITakeProfitStopLossFormValues) => {
    const {
      stopLoss,
      takeProfit,
      slWorkingType,
      tkWorkingType,
      dirtyFields
    } = values;

    const commonValues = {
      closePosition: true,
      symbol,
      accountId: exchangeAccountId
    };

    const isTKDirty = dirtyFields.has(
      TAKE_PROFIT_STOP_LOSS_FORM_FIELDS.takeProfit
    );

    const isSLDirty = dirtyFields.has(
      TAKE_PROFIT_STOP_LOSS_FORM_FIELDS.stopLoss
    );

    const side = quantity > 0 ? "Sell" : "Buy";

    const takeProfitValues = {
      ...commonValues,
      side,
      type: "TakeProfitMarket",
      positionSide,
      stopPrice: takeProfit,
      workingType: tkWorkingType
    };

    const stopLossValues = {
      ...commonValues,
      side,
      type: "StopMarket",
      positionSide,
      stopPrice: stopLoss,
      workingType: slWorkingType
    };

    const requestsArray: Promise<any>[] = [];

    if (!takeProfitOrder && (isTKDirty || takeProfit !== undefined)) {
      requestsArray.push(sendRequest(takeProfitValues));
    }

    if (!stopLossOrder && (isSLDirty || stopLoss !== undefined)) {
      requestsArray.push(sendRequest(stopLossValues));
    }

    return Promise.all(requestsArray);
  };

  return (
    <TakeProfitStopLossForm
      status={status}
      entryPrice={entryPrice}
      markPrice={markPrice}
      symbol={symbol}
      leverage={leverage}
      quantity={quantity}
      filterValues={filterValues}
      onSubmit={handleSubmit}
      takeProfitOrder={takeProfitOrder}
      stopLossOrder={stopLossOrder}
      positionSide={positionSide}
    />
  );
};

const TakeProfitStopLossPopup = React.memo(_TakeProfitStopLossPopup);
export default TakeProfitStopLossPopup;
