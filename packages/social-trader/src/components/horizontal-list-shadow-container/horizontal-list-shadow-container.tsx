import "./horizontal-list-shadow-container.scss";

import classNames from "classnames";
import React, { useEffect, useState } from "react";

export const HorizontalListShadowContainer: React.FC<Props> = ({
  scrollData: { scroll, endOfList },
  darkShadow,
  children
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
      className={classNames("horizontal-list-shadow-container", {
        "horizontal-list-shadow-container--right": rightShadow,
        "horizontal-list-shadow-container--left": leftShadow,
        "horizontal-list-shadow-container--dark-shadow": darkShadow
      })}
    >
      {children}
    </div>
  );
};

export type ScrollDataType = {
  scroll: number;
  endOfList: number;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  scrollData: ScrollDataType;
  darkShadow?: boolean;
}
