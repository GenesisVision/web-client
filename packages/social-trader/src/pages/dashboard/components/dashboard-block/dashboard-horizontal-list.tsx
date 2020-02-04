import "./dashboard-block.scss";

import { HorizontalListShadowContainer } from "components/horizontal-list-shadow-container/horizontal-list-shadow-container";
import { useShadow } from "components/horizontal-list-shadow-container/shadow.hook";
import React from "react";

const _DashboardHorizontalList: React.FC<Props> = ({
  children,
  darkShadow
}) => {
  const { scrollData, ref, handleScroll } = useShadow();

  return (
    <div className="dashboard-horizontal-list__shadow-wrapper">
      <HorizontalListShadowContainer
        scrollData={scrollData}
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
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  darkShadow?: boolean;
}

const DashboardHorizontalList = React.memo(_DashboardHorizontalList);
export default DashboardHorizontalList;
