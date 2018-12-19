import "./dashboard-chart-assets.scss";

import React, { PureComponent } from "react";
import Scrollbars from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover from "shared/components/popover/popover";

import { getAssetChart } from "../../../services/dashboard.service";
import DashboardChartAsset from "./dashboard-chart-asset";
import { DashboardChartAssetsLoader } from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";

class DashboardChartAssetsContainer extends PureComponent {
  state = {
    anchor: null
  };

  handleOpenDropdown = event => this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });
  handleSelectAsset = (id, title, type) => {
    this.props.service.getAssetChart(id, title, type);
    this.handleCloseDropdown();
  };
  renderActionsIcon = () => {
    return (
      <ActionsCircleIcon
        className="dashboard-chart-assets__icon"
        primary={this.state.anchor !== null}
        onClick={this.handleOpenDropdown}
      />
    );
  };

  render() {
    const { t, assets } = this.props;
    if (!assets) return <DashboardChartAssetsLoader />;
    const programs = assets.programs;
    const funds = assets.funds;
    const hasPrograms = programs.length > 0;
    const hasFunds = funds.length > 0;

    return (
      <div className="dashboard-chart-assets">
        <div className="dashboard-chart-assets__title">
          {t("manager.dashboard-page.chart-section.my-assets")}{" "}
          {this.renderActionsIcon()}
        </div>
        <Popover
          horizontal="right"
          vertical="bottom"
          anchorEl={this.state.anchor}
          noPadding
          onClose={this.handleCloseDropdown}
        >
          <Scrollbars autoHeight autoHeightMax="260px">
            <div className="dashboard-chart-assets-popover">
              {hasPrograms && (
                <div className="dashboard-chart-assets-popover__header">
                  {t("manager.dashboard-page.chart-section.programs")}
                </div>
              )}
              {programs.map(x => (
                <DashboardChartAsset
                  key={x.id}
                  chartAsset={x}
                  type="Program"
                  selectAsset={this.handleSelectAsset}
                />
              ))}
              {hasFunds && (
                <div className="dashboard-chart-assets-popover__header">
                  {t("manager.dashboard-page.chart-section.funds")}
                </div>
              )}
              {funds.map(x => (
                <DashboardChartAsset
                  key={x.id}
                  chartAsset={x}
                  type="Fund"
                  selectAsset={this.handleSelectAsset}
                />
              ))}
            </div>
          </Scrollbars>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { assets } = state.dashboard;
  return {
    assets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ getAssetChart }, dispatch)
  };
};

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardChartAssetsContainer);
