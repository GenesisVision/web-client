import { Button } from "components/button/button";
import { Center } from "components/center/center";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  ORIENTATION_POPOVER,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { RowItem } from "components/row-item/row-item";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import useAnchor from "hooks/anchor.hook";
import { MarketWatchContainer } from "pages/trade/binance-trade-page/trading/market-watch/market-watch.container";
import React from "react";

import styles from "./market-watch.module.scss";

export const _MarketWatchTooltipButton: React.FC = ({ children }) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <>
      <Button variant={"text"} noPadding onClick={setAnchor}>
        <Center>
          <RowItem size={"small"}>{children}</RowItem>
          <RowItem>
            <Center>
              <FilterArrowIcon isOpen={anchor !== undefined} />
            </Center>
          </RowItem>
        </Center>
      </Button>
      <Popover
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        fixedVertical
        fixedHorizontal
        anchorEl={anchor}
        onClose={clearAnchor}
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        orientation={ORIENTATION_POPOVER.RIGHT}
        noPadding
      >
        <PopoverContentCardBlock className={styles["market-watch__tooltip"]}>
          <div className={styles["market-watch__tooltip-data"]}>
            <MarketWatchContainer />
          </div>
        </PopoverContentCardBlock>
      </Popover>
    </>
  );
};

export const MarketWatchTooltipButton = React.memo<React.FC>(
  _MarketWatchTooltipButton
);
