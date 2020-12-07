import GlobalSearchInput from "components/global-search/components/global-search-result/global-search-input/global-search-input";
import { Row } from "components/row/row";
import { MarketWatchColumn } from "pages/trade/binance-trade-page/trading/market-watch/market-watch-column";
import { MarketWatchCurrencies } from "pages/trade/binance-trade-page/trading/market-watch/market-watch-currencies";
import { MarketWatchTable } from "pages/trade/binance-trade-page/trading/market-watch/market-watch-table";
import {
  CHANGE_COLUMN,
  FilteringType,
  FilteringVariant,
  getFilteringFunction
} from "pages/trade/binance-trade-page/trading/market-watch/market-watch.helpers";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { MergedTickerSymbolType } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext, useMemo, useState } from "react";

interface Props {
  items: MergedTickerSymbolType[];
}

const _MarketWatch: React.FC<Props> = ({ items }) => {
  const { terminalType } = useContext(TerminalInfoContext);
  const [column, setColumn] = useState<string>(CHANGE_COLUMN);
  const [search, setSearch] = useState<string>("");
  const initFiltering = terminalType === "spot" ? "margin" : undefined;
  const [filteringType, setFilteringType] = useState<FilteringVariant>(
    initFiltering
  );
  const [filtering, setFiltering] = useState<FilteringType>({
    field: "symbol",
    value: "BTC"
  });

  const filteringFunction = useMemo(
    () => getFilteringFunction(filteringType, filtering),
    [filteringType, filtering]
  );

  return (
    <>
      <Row size={"small"}>
        <GlobalSearchInput
          autoFocus={false}
          size={"small"}
          query={search}
          onChange={setSearch}
          canClose={false}
        />
      </Row>
      <Row size={"small"}>
        <MarketWatchCurrencies
          filtering={filtering}
          setFiltering={setFiltering}
          filteringType={filteringType}
          setFilteringType={setFilteringType}
          initFiltering={initFiltering}
        />
      </Row>
      <Row size={"small"}>
        <MarketWatchColumn column={column} setColumn={setColumn} />
      </Row>
      <MarketWatchTable
        search={search}
        column={column}
        items={items}
        filteringFunction={filteringFunction}
      />
    </>
  );
};

export const MarketWatch = React.memo(_MarketWatch);
