import "./dashboard-assets.scss";

import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators, compose } from "redux";

import { getDashboardFunds } from "../../services/dashboard-funds.service";
import { getDashboardPrograms } from "../../services/dashboard-programs.service";
import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import { CREATE_PROGRAM_PAGE_ROUTE } from "pages/create-program/create-program.constants";

import DashboardAssets from "shared/components/dashboard/dashboard-assets/dashboard-assets";

class DashboardAssetsContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getDashboardFunds();
    service.getDashboardPrograms();
  }

  render() {
    const { t, title } = this.props;
    return (
      <DashboardAssets
        getDashboardPrograms={getDashboardPrograms}
        getDashboardFunds={getDashboardFunds}
        createProgramButtonToolbar={createButtonToolbar(
          t("buttons.create-program"),
          CREATE_PROGRAM_PAGE_ROUTE
        )}
        createProgramButtonBody={createButtonBody(
          t("buttons.create-program"),
          CREATE_PROGRAM_PAGE_ROUTE
        )}
        createProgramText={t("dashboard.create-program-text")}
        createFundButtonToolbar={createButtonToolbar(
          t("buttons.create-fund"),
          CREATE_FUND_PAGE_ROUTE
        )}
        createFundButtonBody={createButtonBody(
          t("buttons.create-fund"),
          CREATE_FUND_PAGE_ROUTE
        )}
        createFundText={t("dashboard.create-fund-text")}
        title={title}
      />
    );
  }
}

const createButtonToolbar = (text, route) => (
  <div className="dashboard__button-container">
    <Link to={route} className="dashboard__button">
      <GVButton color="primary" variant="text">
        {text}
      </GVButton>
    </Link>
  </div>
);

const createButtonBody = (text, route) => (
  <Link to={route} className="dashboard__body-button">
    <GVButton color="primary">{text}</GVButton>
  </Link>
);

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { getDashboardFunds, getDashboardPrograms },
    dispatch
  )
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(DashboardAssetsContainer);
