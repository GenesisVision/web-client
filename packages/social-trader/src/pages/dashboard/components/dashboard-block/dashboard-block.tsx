import "./dashboard-block.scss";

import classNames from "classnames";
import DetailsBlock from "components/details/details-block";
import Link from "components/link/link";
import React from "react";

const _DashboardBlock: React.FC<Props> = ({
  seeAll = true,
  label,
  all,
  children,
  className
}) => {
  return (
    <DetailsBlock
      table
      className={classNames("dashboard-block__container", className)}
    >
      {(label || seeAll) && (
        <div className="dashboard-block__header">
          {label && <h3>{label}</h3>}
          {seeAll && (
            <div className="dashboard-block__see-all">
              <Link className="dashboard-block__link" to={all || "events"}>
                &rsaquo;
              </Link>
            </div>
          )}
        </div>
      )}
      {children}
    </DetailsBlock>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  seeAll?: boolean;
  label?: string;
  all?: string;
}

const DashboardBlock = React.memo(_DashboardBlock);
export default DashboardBlock;
