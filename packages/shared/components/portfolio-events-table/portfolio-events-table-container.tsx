import React from "react";
import Surface from "shared/components/surface/surface";

import PortfolioEventsTable, {
  IPortfolioEventsTableProps
} from "./portfolio-events-table";

const PortfolioEventsTableContainer: React.FC<Props> = ({
  pageTitle,
  tableTitle,
  className,
  fetchPortfolioEvents,
  dateRangeStartLabel,
  eventTypeFilterValues
}) => {
  return (
    <Surface className="dashboard-portfolio-events-all">
      <PortfolioEventsTable
        fetchPortfolioEvents={fetchPortfolioEvents}
        tableTitle={tableTitle}
        className={className}
        dateRangeStartLabel={dateRangeStartLabel}
        eventTypeFilterValues={eventTypeFilterValues}
      />
    </Surface>
  );
};

interface Props extends IPortfolioEventsTableProps {
  pageTitle: string;
}

export default React.memo(PortfolioEventsTableContainer);
