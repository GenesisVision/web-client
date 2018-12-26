import React, { Component } from "react";
import Surface from "shared/components/surface/surface";

import PortfolioEventsTable from "./portfolio-events-table";

class PortfolioEventsTableContainer extends Component {
  render() {
    const {
      pageTitle,
      tableTitle,
      className,
      fetchPortfolioEvents,
      dateRangeStartLabel
    } = this.props;
    return (
      <Surface className="dashboard-portfolio-events-all">
        <PortfolioEventsTable
          fetchPortfolioEvents={fetchPortfolioEvents}
          pageTitle={pageTitle}
          tableTitle={tableTitle}
          className={className}
          dateRangeStartLabel={dateRangeStartLabel}
        />
      </Surface>
    );
  }
}

export default PortfolioEventsTableContainer;
