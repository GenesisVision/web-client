import classNames from "classnames";
import DetailsBlock from "components/details/details-block";
import DetailsBlockTitleBox from "components/details/details-block-title-box";
import Link from "components/link/link";
import React from "react";

import styles from "./dashboard-block.module.scss";

const DashboardBlock: React.FC<Props> = ({
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
      className={classNames(styles["dashboard-block__container"], className)}
    >
      {(label || all) && (
        <DetailsBlockTitleBox>
          <div className={styles["dashboard-block__header"]}>
            {label && <h3>{label}</h3>}
            {all && (
              <div className={styles["dashboard-block__see-all"]}>
                <Link className={styles["dashboard-block__link"]} to={all}>
                  &rsaquo;
                </Link>
              </div>
            )}
          </div>
        </DetailsBlockTitleBox>
      )}
      {children}
    </DetailsBlock>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  landscapeTablet?: boolean;
  tablet?: boolean;
  label?: string;
  all?: string;
}

export default DashboardBlock;
