import "./dashboard-block.scss";

import classNames from "classnames";
import React, { useEffect, useState } from "react";

const _HorizontalListShadowContainer: React.FC<Props> = ({
  scroll,
  darkShadow,
  children,
  endOfList
}) => {
  const [leftShadow, setLeftShadow] = useState<boolean>(false);
  const [rightShadow, setRightShadow] = useState<boolean>(false);
  useEffect(() => {
    if (scroll > 0) setLeftShadow(true);
    if (scroll === 0) setLeftShadow(false);
    if (scroll < endOfList) setRightShadow(true);
    if (scroll >= endOfList) setRightShadow(false);
  }, [scroll, endOfList]);
  return (
    <div
      className={classNames("dashboard-horizontal-list__shadow-wrapper", {
        "dashboard-horizontal-list__shadow-wrapper--right": rightShadow,
        "dashboard-horizontal-list__shadow-wrapper--left": leftShadow,
        "dashboard-horizontal-list__shadow-wrapper--dark-shadow": darkShadow
      })}
    >
      {children}
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  scroll: number;
  endOfList: number;
  darkShadow?: boolean;
}

export const HorizontalListShadowContainer = React.memo(
  _HorizontalListShadowContainer
);
