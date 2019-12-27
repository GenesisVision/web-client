import "./dashboard-block.scss";

import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

const _DashboardHorizontalList: React.FC<
  { darkShadow?: boolean; left?: boolean } & React.HTMLAttributes<
    HTMLDivElement
  >
> = ({ children, darkShadow, left }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [endOfList, setEndOfList] = useState(0);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    left && (ref.current.scrollLeft = 100000);
    setEndOfList(left ? 0 : ref.current.scrollWidth - ref.current.offsetWidth);
  }, [ref.current, left, setEndOfList]);
  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    setScroll(ref.current.scrollLeft);
  }, []);
  return (
    <div
      className={classNames("dashboard-horizontal-list__shadow-wrapper", {
        "dashboard-horizontal-list__shadow-wrapper--hided":
          scroll === endOfList,
        "dashboard-horizontal-list__shadow-wrapper--left": left,
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
