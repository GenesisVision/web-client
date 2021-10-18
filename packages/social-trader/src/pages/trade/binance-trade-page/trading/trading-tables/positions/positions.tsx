import { Text } from "components/text/text";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { BinanceWorkingType } from "gv-api-web";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import {
  getMarginInfo,
  MARGIN_INFO_ASSET
} from "pages/trade/binance-trade-page/trading/margin-ratio/margin-ratio.helpers";
import { FullPosition } from "pages/trade/binance-trade-page/trading/terminal.types";
import { StyledTh } from "pages/trade/binance-trade-page/trading/trading-tables/positions/positions.styles";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { PositionPNLPopover } from "./position-pnl-popover";
import { POSITIONS_TABLE_COLUMNS } from "./positions.helpers";
import { PositionsRow } from "./positions-row";

interface Props {
  items?: FullPosition[];
}

export const Positions: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();
  const { accountInfo, exchangeInfo } = useContext(TerminalInfoContext);

  const [workingType, setWorkingType] = useState<BinanceWorkingType>("Mark");

  if (!accountInfo?.balances && !exchangeInfo) return null;

  // const { maintMargin, marginBalance } = getMarginInfo(
  //   accountInfo.balances,
  //   MARGIN_INFO_ASSET
  // );

  // const marginRatio =
  //   +marginBalance > 0 ? (+maintMargin / +marginBalance) * 100 : 0;
  return (
    <TradeTable
      columns={POSITIONS_TABLE_COLUMNS}
      items={items}
      renderHeaderCell={({ name, tooltip }) =>
        name === "pnl" ? (
          <PositionPNLPopover
            workingType={workingType}
            setWorkingType={setWorkingType}
          />
        ) : tooltip ? (
          <StyledTh>
            <Tooltip
              render={() => (
                <TooltipContent>
                  {t(`trade:positions.table.tooltip.${name}`)}
                </TooltipContent>
              )}
            >
              <Text muted style={{ cursor: "help" }}>
                {t(`trade:positions.table.${name}`)}
              </Text>
            </Tooltip>
          </StyledTh>
        ) : (
          <StyledTh>
            <Text muted>{t(`trade:positions.table.${name}`)}</Text>
          </StyledTh>
        )
      }
      renderRow={(position: FullPosition) => (
        <PositionsRow position={position} workingType={workingType} />
        // <PositionsRow marginRatio={marginRatio} position={position} />
      )}
    />
  );
};
