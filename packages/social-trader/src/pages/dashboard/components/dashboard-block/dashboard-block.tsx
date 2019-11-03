import "./dashboard-block.scss";

import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import DetailsBlock from "shared/components/details/details-block";
import Link from "shared/components/link/link";

const _DashboardBlock: React.FC<Props> = ({
  label,
  all,
  children,
  className
}) => {
  const [t] = useTranslation();
  return (
    <DetailsBlock
      table
      className={classNames("dashboard-block__container", className)}
    >
      <div className="dashboard-block__header">
        <h3>{label}</h3>
        <div className="dashboard-block__see-all">
          <Link to={all}>{t("dashboard-page.see-more")}</Link>
        </div>
      </div>
      {children}
    </DetailsBlock>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  all: string;
}

const DashboardBlock = React.memo(_DashboardBlock);
export default DashboardBlock;
