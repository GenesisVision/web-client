import { SortingColumn } from "components/table/components/filtering/filter.type";
import React from "react";
import { useTranslation } from "react-i18next";

const _PortfolioEventsTableHeaderCell: React.FC<{ column: SortingColumn }> = ({
  column
}) => {
  const [t] = useTranslation();
  return (
    <span>
      {t(`dashboard-page:portfolio-events.table-header.${column.name}`)}
    </span>
  );
};

const PortfolioEventsTableHeaderCell = React.memo(
  _PortfolioEventsTableHeaderCell
);
export default PortfolioEventsTableHeaderCell;
