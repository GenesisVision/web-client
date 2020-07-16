import clsx from "clsx";
import React, { useEffect, useState } from "react";

import styles from "./horizontal-list-shadow-container.module.scss";

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
      className={clsx(styles["horizontal-list-shadow-container"], {
        [styles["horizontal-list-shadow-container--right"]]: rightShadow,
        [styles["horizontal-list-shadow-container--left"]]: leftShadow,
        [styles["horizontal-list-shadow-container--dark-shadow"]]: darkShadow
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
