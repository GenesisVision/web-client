import { HorizontalShadowList } from "components/horizontal-list-shadow-container/horizontal-shadow-list";
import React from "react";

import styles from "./dashboard-block.module.scss";

const _DashboardHorizontalList: React.FC<Props> = ({
  children,
  darkShadow
}) => {
  return (
    <div className={styles["dashboard-horizontal-list__shadow-wrapper"]}>
      <HorizontalShadowList darkShadow={darkShadow}>
        {children}
      </HorizontalShadowList>
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  darkShadow?: boolean;
}

const DashboardHorizontalList = React.memo(_DashboardHorizontalList);
export default DashboardHorizontalList;
