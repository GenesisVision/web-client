import clsx from "clsx";
import DetailsBlock from "components/details/details-block";
import DetailsBlockTitleBox from "components/details/details-block-title-box";
import Link from "components/link/link";
import React, { ReactNode } from "react";

import styles from "./dashboard-block.module.scss";

const DashboardBlock: React.FC<Props> = ({
  headerButton,
  landscapeTablet,
  tablet,
  label,
  all,
  children,
  className
}) => {
  return (
    <DetailsBlock
      landscapeTablet={landscapeTablet}
      tablet={tablet}
      table
      className={clsx(styles["dashboard-block__container"], className)}
    >
      {(label || all) && (
        <DetailsBlockTitleBox>
          <Link to={all}>
            <div className={styles["dashboard-block__header"]}>
              {label && <h3>{label}</h3>}
              {all && (
                <div className={styles["dashboard-block__see-all"]}>
                  <div className={styles["dashboard-block__link"]}>
                    &rsaquo;
                  </div>
                </div>
              )}
              {headerButton}
            </div>
          </Link>
        </DetailsBlockTitleBox>
      )}
      {children}
    </DetailsBlock>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  headerButton?: ReactNode;
  landscapeTablet?: boolean;
  tablet?: boolean;
  label?: string;
  all?: string;
}

export default DashboardBlock;
