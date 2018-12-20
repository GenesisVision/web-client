import "./dashboard-portfolio-events-all-table.scss";
import "./dashboard-portfolio-events-all.scss";

import React, { Component } from "react";
import Surface from "shared/components/surface/surface";

import PortfolioEventsTableComponent from "./dashboard-portfolio-events-all-table";

class PortfolioEventsTableContainerComponent extends Component {
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
        <PortfolioEventsTableComponent
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

export default PortfolioEventsTableContainerComponent;
