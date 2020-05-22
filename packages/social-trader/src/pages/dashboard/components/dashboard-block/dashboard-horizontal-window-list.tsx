import { HorizontalListShadowContainer } from "components/horizontal-list-shadow-container/horizontal-list-shadow-container";
import React, { useCallback, useRef, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";

import styles from "./dashboard-block.module.scss";

const DashboardHorizontalWindowList: React.FC<Props> = ({
  itemWidth,
  renderItem,
  height,
  width,
  items,
  darkShadow
}) => {
  const ref = useRef<any>(null);
  const endOfList = itemWidth * items.length - width;
  const [scroll, setScroll] = useState(0);

  const handleScroll = useCallback(({ scrollOffset }) => {
    setScroll(scrollOffset);
  }, []);

  return (
    <div className={styles["dashboard-horizontal-list__shadow-wrapper"]}>
      <HorizontalListShadowContainer
        scrollData={{
          endOfList,
          scroll
        }}
        darkShadow={darkShadow}
      >
        <FixedSizeList
          ref={ref}
          onScroll={handleScroll}
          className={styles["dashboard-horizontal-window-list"]}
          itemData={items}
          height={height}
          itemCount={items.length}
          itemSize={itemWidth}
          layout="horizontal"
          width={width}
        >
          {renderItem}
        </FixedSizeList>
      </HorizontalListShadowContainer>
    </div>
  );
};

interface Props {
  height: number;
  itemWidth: number;
  width: number;
  items: any[];
  darkShadow?: boolean;
  renderItem: React.FC<ListChildComponentProps>;
}
export default DashboardHorizontalWindowList;
