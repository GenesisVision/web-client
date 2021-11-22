import { Text } from "components/text/text";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { BinanceWorkingType } from "gv-api-web";
import { TradeTable } from "pages/trade/binance-trade-page/trading/components/trade-table/trade-table";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { Position } from "pages/trade/binance-trade-page/trading/terminal.types";
import { StyledTh } from "pages/trade/binance-trade-page/trading/trading-tables/positions/positions.styles";
import React, { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { PositionPNLPopover } from "./position-pnl-popover";
import { POSITIONS_TABLE_COLUMNS } from "./positions.helpers";
import { PositionsRowContainer } from "./positions-row.container";

interface Props {
  items: Position[];
}

export const Positions: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();

  const { exchangeInfo } = useContext(TerminalInfoContext);
  const [workingType, setWorkingType] = useState<BinanceWorkingType>("Mark");

  if (!exchangeInfo) {
    return null;
  }

  return (
    <TradeTable
      columns={POSITIONS_TABLE_COLUMNS}
      items={items}
      renderHeaderCell={({ name, tooltip }) => {
        return (
          <Fragment key={name}>
            {name === "pnl" ? (
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
            )}
          </Fragment>
        );
      }}
      renderRow={(position: Position) => (
        <PositionsRowContainer
          key={position.symbol + position.positionSide}
          position={position}
          workingType={workingType}
        />
      )}
    />
  );
};
