import clsx from "clsx";
import { DefaultTableBlock } from "components/default.block/default-table.block";
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
    <DefaultTableBlock
      table
      className={clsx(styles["dashboard-block"], className, {
        [styles["dashboard-block--tablet"]]: tablet,
        [styles["dashboard-block--landscape-tablet"]]: landscapeTablet
      })}
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
    </DefaultTableBlock>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  landscapeTablet?: boolean;
  tablet?: boolean;
  label?: string;
  all?: string;
}

export default DashboardBlock;
