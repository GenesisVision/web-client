import { Center } from "components/center/center";
import { PencilIcon } from "components/icon/pencil-icon";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { BinancePositionSide } from "gv-api-web";
import useFlag from "hooks/flag.hook";
import React, { useContext, useEffect, useState } from "react";

import { terminalMoneyFormat } from "../../components/terminal-money-format/terminal-money-format";
import { TerminalOpenOrdersContext } from "../../contexts/terminal-open-orders.context";
import { FuturesOrder } from "../../terminal.types";
import TakeProfitStopLossPopupContainer from "./take-profit-stop-loss-popup-container";

interface Props {
  entryPrice: number;
  markPrice: number;
  symbol: string;
  leverage: number;
  tickSize: string;
  quantity: number;
  positionSide: BinancePositionSide;
}

const _TakeProfitStopLossTableCell: React.FC<Props> = ({
  entryPrice,
  markPrice,
  symbol,
  leverage,
  tickSize,
  positionSide,
  quantity
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useFlag();
  const { openOrders } = useContext(TerminalOpenOrdersContext);
  const [takeProfitOrder, setTakeProfitOrder] = useState<
    FuturesOrder | undefined
  >(undefined);
  const [stopLossOrder, setStopLossOrder] = useState<FuturesOrder | undefined>(
    undefined
  );

  useEffect(() => {
    if (openOrders.length) {
      // @ts-ignore
      const tpOrder = openOrders.find(
        (order: FuturesOrder) =>
          order.symbol === symbol &&
          order.positionSide === positionSide &&
          order.type === "TakeProfitMarket" &&
          order.closePosition
      );
      // @ts-ignore
      const slOrder = openOrders.find(
        (order: FuturesOrder) =>
          order.symbol === symbol &&
          order.positionSide === positionSide &&
          order.type === "StopMarket" &&
          order.closePosition
      );
      setTakeProfitOrder(tpOrder);
      setStopLossOrder(slOrder);
    }
  }, [openOrders]);

  return (
    <>
      <Center>
        <RowItem size={"xsmall"}>
          <Row>
            {takeProfitOrder
              ? terminalMoneyFormat({
                  amount: takeProfitOrder.stopPrice,
                  tickSize
                })
              : "--"}{" "}
            /
          </Row>
          <Row size={"xsmall"}>
            {stopLossOrder
              ? terminalMoneyFormat({
                  amount: stopLossOrder.stopPrice,
                  tickSize
                })
              : "--"}
          </Row>
        </RowItem>
        <PencilIcon onClick={setOpenPopup} />
      </Center>
      <TakeProfitStopLossPopupContainer
        open={isOpenPopup}
        onClose={setClosePopup}
        entryPrice={entryPrice}
        markPrice={markPrice}
        symbol={symbol}
        leverage={leverage}
        tickSize={tickSize}
        quantity={quantity}
        positionSide={positionSide}
        takeProfitOrder={takeProfitOrder}
        stopLossOrder={stopLossOrder}
      />
    </>
  );
};

const TakeProfitStopLossTableCell = React.memo(_TakeProfitStopLossTableCell);
export default TakeProfitStopLossTableCell;
