import "./dashboard-portfolio-chart-section.scss";

import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { compose } from "redux";
import Surface from "shared/components/surface/surface";

import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardGetStarted from "./dashboard-get-started";
import DashboardInRequestsContainer from "./dashboard-in-requests/dashboard-in-requests-container";

class DashboardPortfolioChartSection extends Component {
  renderSectionBody = () => {
    const { isNewUser } = this.props;
    if (!isNewUser)
      return (
        <Fragment>
          <h3 className="dashboard-portfolio-chart-section__heading">
            Chart
          </h3>
          <DashboardInRequestsContainer />
          <DashboardPortfolioChartContainer />
        </Fragment>
      );
    return <DashboardGetStarted />;
  };
  render() {
    return (
      <Surface className="dashboard-portfolio-chart-section">
        {this.renderSectionBody()}
      </Surface>
    );
  }
}
const mapStateToProps = state => {
  const { info } = state.profileHeader;
  let isNewUser = null;
  if (info.data) {
    isNewUser = info.data.isNewUser;
  }
  return { isNewUser };
};

export default compose(
  translate(),
  connect(mapStateToProps)
)(DashboardPortfolioChartSection);
