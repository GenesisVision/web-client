import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import { CREATE_PROGRAM_PAGE_ROUTE } from "pages/create-program/create-program.constants";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators, compose } from "redux";

import { getDashboardPrograms } from "../../services/dashboard-programs.service";
import { fetchAssetsCount } from "../../services/dashboard.service";
import React, { Component } from "react";
import { GVButton } from "gv-react-components";
import { getDashboardFunds } from "../../services/dashboard-funds.service";
import { MANAGER } from "shared/constants/constants";
import DashboardAssets from "shared/components/dashboard/dashboard-assets/dashboard-assets";
import { ChartIcon } from "shared/components/icon/chart-icon";
class DashboardAssetsContainer extends Component {
  getAssets = () => {
    const { service } = this.props;
    service.getDashboardFunds();
    service.getDashboardPrograms();
  };

  onChangeStatus = () => this.getAssets();

  render() {
    const { t, title } = this.props;

    const createFund = () => {
      return (
        <div className="create-asset">
          <div className="create-asset__create-icon">
            <ChartIcon />
          </div>
          <div className="create-asset__text">
            {t(
              `${
                process.env.REACT_APP_PLATFORM
              }.dashboard-page.create-fund-text`
            )}
          </div>
          <div className="create-asset__button">
            <Link
              to={CREATE_FUND_PAGE_ROUTE}
              className="dashboard__body-button"
            >
              <GVButton color="primary">{t("buttons.create-fund")}</GVButton>
            </Link>
          </div>
        </div>
      );
    };
    const createProgram = () => {
      return (
        <div className="create-asset">
          <div className="create-asset__create-icon">
            <ChartIcon />
          </div>
          <div className="create-asset__text">
            {t(
              `${
                process.env.REACT_APP_PLATFORM
              }.dashboard-page.create-program-text`
            )}
          </div>
          <div className="create-asset__button">
            <Link
              to={CREATE_PROGRAM_PAGE_ROUTE}
              className="dashboard__body-button"
            >
              <GVButton color="primary">{t("buttons.create-program")}</GVButton>
            </Link>
          </div>
        </div>
      );
    };

    return (
      <DashboardAssets
        getDashboardPrograms={getDashboardPrograms}
        getDashboardFunds={getDashboardFunds}
        fetchAssetsCount={fetchAssetsCount}
        createProgramButtonToolbar={createButtonToolbar(
          t("buttons.create-program"),
          CREATE_PROGRAM_PAGE_ROUTE
        )}
        createFundButtonToolbar={createButtonToolbar(
          t("buttons.create-fund"),
          CREATE_FUND_PAGE_ROUTE
        )}
        createFund={createFund()}
        createProgram={createProgram()}
        title={title}
        role={MANAGER}
        onChangeStatus={this.onChangeStatus}
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
