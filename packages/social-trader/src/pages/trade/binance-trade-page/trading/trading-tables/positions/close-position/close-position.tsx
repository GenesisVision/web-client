import { BinancePositionSide } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import {
  getFilterValues,
  mapPlaceOrderErrors
} from "pages/trade/binance-trade-page/trading/place-order/place-order.helpers";
import {
  ClosePositionForm,
  ClosePositionSubmitValues,
  IClosePositionFormProps
} from "pages/trade/binance-trade-page/trading/trading-tables/positions/close-position/close-position.form";
import React, { useContext } from "react";

export interface IClosePositionProps extends IClosePositionFormProps {
  symbol: string;
  positionSide: BinancePositionSide;
}

interface Props extends IClosePositionProps {
  stepSize: string;
  tickSize: string;
}

const _ClosePosition: React.FC<Props> = ({
  positionSide,
  symbol,
  price,
  stepSize,
  quantity,
  tickSize,
  ...rest
}) => {
  const { tradeRequest } = useContext(TerminalMethodsContext);
  const { exchangeAccountId, exchangeInfo } = useContext(TerminalInfoContext);

  const filterValues = getFilterValues(exchangeInfo!, symbol);

  const { sendRequest } = useApiRequest({
    isUseLocalizationOnError: false,
    errorAlertHandler: mapPlaceOrderErrors,
    request: tradeRequest
  });

  const handleSubmit = (values: ClosePositionSubmitValues) => {
    const side = quantity > 0 ? "Sell" : "Buy";
    return sendRequest({
      timeInForce: values.type === "Limit" ? "GoodTillCancel" : undefined,
      positionSide,
      reduceOnly: positionSide === "Both" ? true : undefined,
      price: values.price,
      quantity: values.quantity,
      accountId: exchangeAccountId,
      side,
      type: values.type,
      symbol
    });
  };

  return (
    <ClosePositionForm
      {...rest}
      quantity={quantity}
      onSubmit={handleSubmit}
      price={price}
      filterValues={filterValues}
    />
  );
};

export const ClosePosition = React.memo(_ClosePosition);
