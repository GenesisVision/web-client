import { Center } from "components/center/center";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { BinanceFuturesMarginType, BinancePositionSide } from "gv-api-web";
import React from "react";

import { terminalMoneyFormat } from "../components/terminal-money-format/terminal-money-format";
import { USDTtickSize } from "../trading-tables/positions/positions.helpers";
import AdjustMargin from "./adjust-margin";

interface Props {
  tickSize: string;
  quoteAsset: string;
  marginType: BinanceFuturesMarginType;
  positionSide: BinancePositionSide;
  margin: number;
  entryPrice: number;
  markPrice: number;
  leverage: number;
  maintMargin: number;
  quantity: number;
  symbol: string;
  maintAmount?: number;
  maintMarginRate?: number;
}

const _MarginTableCell: React.FC<Props> = ({
  tickSize,
  quoteAsset,
  margin,
  leverage,
  maintAmount,
  maintMarginRate,
  entryPrice,
  maintMargin,
  quantity,
  markPrice,
  marginType,
  symbol,
  positionSide
}) => {
  return (
    <Center>
      <RowItem size={"xsmall"}>
        <Row>
          {`${terminalMoneyFormat({
            amount: margin,
            // fix hardcoded tickSize
            tickSize: USDTtickSize
          })} ${quoteAsset}`}
        </Row>
        <Row size={"xsmall"}>
          {marginType === "Isolated" ? "(Isolated)" : "(Cross)"}
        </Row>
      </RowItem>
      {marginType === "Isolated" && (
        <AdjustMargin
          tickSize={tickSize}
          quoteAsset={quoteAsset}
          maintAmount={maintAmount!}
          maintMarginRate={maintMarginRate!}
          entryPrice={entryPrice}
          leverage={leverage}
          maintMargin={maintMargin}
          markPrice={markPrice}
          quantity={quantity}
          symbol={symbol}
          positionSide={positionSide}
          margin={margin}
        />
      )}
    </Center>
  );
};

const MarginTableCell = React.memo(_MarginTableCell);
export default MarginTableCell;
