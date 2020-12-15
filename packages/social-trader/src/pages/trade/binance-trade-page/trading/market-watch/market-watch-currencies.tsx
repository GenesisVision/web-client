import { Button } from "components/button/button";
import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import { RowItem } from "components/row-item/row-item";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import {
  FILTERING_CURRENCIES,
  FilteringType,
  FilteringVariant
} from "pages/trade/binance-trade-page/trading/market-watch/market-watch.helpers";
import React, { useContext } from "react";

import styles from "./market-watch.module.scss";

interface Props {
  filtering: FilteringType;
  setFiltering: (filtering: FilteringType) => void;
  initFiltering: FilteringVariant;
  filteringType: FilteringVariant;
  setFilteringType: (filteringType: FilteringVariant) => void;
}

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  onClick,
  children
}) => (
  <div onClick={onClick} className={styles["market-watch-favorite-button"]}>
    {children}
  </div>
);

const _MarketWatchCurrencies: React.FC<Props> = ({
  filtering,
  setFiltering,
  filteringType,
  setFilteringType,
  initFiltering
}) => {
  const { terminalType } = useContext(TerminalInfoContext);

  return (
    <>
      <RowItem>
        <Container
          onClick={() => {
            filteringType === "favorites"
              ? setFilteringType(initFiltering)
              : setFilteringType("favorites");
          }}
        >
          <FavoriteIcon selected={filteringType === "favorites"} />
        </Container>
      </RowItem>
      {terminalType === "spot" && (
        <>
          {FILTERING_CURRENCIES.map(currency => (
            <RowItem>
              <Button
                noPadding
                disabled={
                  filteringType === "symbol" && filtering.value === currency
                }
                variant={"text"}
                size={"small"}
                onClick={() => {
                  setFilteringType("symbol");
                  setFiltering({ value: currency });
                }}
              >
                {currency}
              </Button>
            </RowItem>
          ))}
          <RowItem>
            <Button
              noPadding
              disabled={filteringType === "ALTS"}
              variant={"text"}
              size={"small"}
              onClick={() => {
                setFilteringType("ALTS");
              }}
            >
              ALTS
            </Button>
          </RowItem>
          <RowItem>
            <Button
              noPadding
              disabled={filteringType === "FIATS"}
              variant={"text"}
              size={"small"}
              onClick={() => {
                setFilteringType("FIATS");
              }}
            >
              FIATS
            </Button>
          </RowItem>
        </>
      )}
    </>
  );
};

export const MarketWatchCurrencies = React.memo(_MarketWatchCurrencies);
