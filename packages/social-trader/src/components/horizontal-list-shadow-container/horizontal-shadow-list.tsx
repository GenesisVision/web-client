import clsx from "clsx";
import { HorizontalListShadowContainer } from "components/horizontal-list-shadow-container/horizontal-list-shadow-container";
import { useShadow } from "components/horizontal-list-shadow-container/shadow.hook";
import React from "react";

import styles from "./horizontal-list-shadow-container.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  withScroll?: boolean;
  darkShadow?: boolean;
}

const _HorizontalShadowList: React.FC<Props> = ({
  withScroll = true,
  darkShadow,
  children
}) => {
  const { scrollData, ref, handleScroll } = useShadow();
  return (
    <HorizontalListShadowContainer
      darkShadow={darkShadow}
      scrollData={scrollData}
    >
      <div
        ref={ref}
        onScroll={handleScroll}
        className={clsx(styles["horizontal-shadow-list"], {
          [styles["horizontal-shadow-list--with-scroll"]]: withScroll
        })}
      >
        {children}
      </div>
    </HorizontalListShadowContainer>
  );
};

export const HorizontalShadowList = React.memo(_HorizontalShadowList);
