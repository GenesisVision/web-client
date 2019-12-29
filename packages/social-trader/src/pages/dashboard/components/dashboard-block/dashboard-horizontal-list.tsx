import "./dashboard-block.scss";

import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

const _DashboardHorizontalList: React.FC<
  { darkShadow?: boolean } & React.HTMLAttributes<HTMLDivElement>
> = ({ children, darkShadow }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [endOfList, setEndOfList] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [leftShadow, setLeftShadow] = useState<boolean>(false);
  const [rightShadow, setRightShadow] = useState<boolean>(false);
  useEffect(() => {
    if (!ref.current) return;
    setEndOfList(ref.current.scrollWidth - ref.current.offsetWidth);
  }, [ref.current, setEndOfList]);
  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    setScroll(ref.current.scrollLeft);
  }, []);
  useEffect(() => {
    if (scroll > 0) setLeftShadow(true);
    if (scroll === 0) setLeftShadow(false);
    if (scroll < endOfList) setRightShadow(true);
    if (scroll === endOfList) setRightShadow(false);
  }, [scroll, endOfList]);

  return (
    <div
      className={classNames("dashboard-horizontal-list__shadow-wrapper", {
        "dashboard-horizontal-list__shadow-wrapper--right": rightShadow,
        "dashboard-horizontal-list__shadow-wrapper--left": leftShadow,
        "dashboard-horizontal-list__shadow-wrapper--dark-shadow": darkShadow
      })}
    >
      <div
        ref={ref}
        onScroll={handleScroll}
        className="dashboard-horizontal-list"
      >
        {children}
      </div>
    </div>
  );
};

const DashboardHorizontalList = React.memo(_DashboardHorizontalList);
export default DashboardHorizontalList;
