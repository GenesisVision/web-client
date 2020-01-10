import "./dashboard-block.scss";

import { HorizontalListShadowContainer } from "pages/dashboard/components/dashboard-block/horizontal-list-shadow-container";
import React, { useCallback, useEffect, useRef, useState } from "react";

const _DashboardHorizontalList: React.FC<Props> = ({
  children,
  darkShadow
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [endOfList, setEndOfList] = useState(0);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    setEndOfList(ref.current.scrollWidth - ref.current.offsetWidth);
  }, [ref.current, setEndOfList]);
  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    setScroll(ref.current.scrollLeft);
  }, [ref.current]);

  return (
    <HorizontalListShadowContainer
      scroll={scroll}
      endOfList={endOfList}
      darkShadow={darkShadow}
    >
      <div
        ref={ref}
        onScroll={handleScroll}
        className="dashboard-horizontal-list"
      >
        {children}
      </div>
    </HorizontalListShadowContainer>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  darkShadow?: boolean;
}

const DashboardHorizontalList = React.memo(_DashboardHorizontalList);
export default DashboardHorizontalList;
