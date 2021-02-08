import React, { useContext } from "react";
import {
  ClosePositionForm,
  IClosePositionFormProps
} from "pages/trade/binance-trade-page/trading/trading-tables/positions/close-position/close-position.form";
import { BinancePositionSide } from "gv-api-web";
import {
  CLOSE_POSITION_FIELDS,
  ClosePositionSubmitValues
} from "pages/trade/binance-trade-page/trading/trading-tables/positions/close-position/close-position.helpers";
import { formatValueWithTick, getDecimalScale } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { TerminalMethodsContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-methods.context";
import useApiRequest from "hooks/api-request.hook";
import { mapPlaceOrderErrors } from "pages/trade/binance-trade-page/trading/place-order/place-order.helpers";
import { truncated } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { formatValue } from "utils/formatter";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";

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
  tickSize,
  ...rest
}) => {
  const { tradeRequest } = useContext(TerminalMethodsContext);
  const { exchangeAccountId } = useContext(TerminalInfoContext);

  const { sendRequest } = useApiRequest({
    isUseLocalizationOnError: false,
    errorAlertHandler: mapPlaceOrderErrors,
    request: tradeRequest
  });

  const handleSubmit = (values: ClosePositionSubmitValues) => {
    const quantity = Math.abs(
      +formatValueWithTick(values[CLOSE_POSITION_FIELDS.amount], stepSize)
    );
    const requestPrice = truncated(
      +values[CLOSE_POSITION_FIELDS.price],
      getDecimalScale(formatValue(tickSize))
    );
    const side = values[CLOSE_POSITION_FIELDS.amount] > 0 ? "Sell" : "Buy";
    return sendRequest({
      timeInForce: "GoodTillCancel",
      positionSide,
      price: requestPrice,
      quantity,
      accountId: exchangeAccountId,
      side,
      type: values.type,
      symbol
    });
  };

  return <ClosePositionForm onSubmit={handleSubmit} {...rest} price={price} />;
};

export const ClosePosition = React.memo(_ClosePosition);
