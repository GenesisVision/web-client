import "./dashboard-chart-assets.scss";

import { ManagerAssets } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import GVScroll from "shared/components/scroll/gvscroll";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

import { getAssetChart } from "../../../services/dashboard.service";
import DashboardChartAsset from "./dashboard-chart-asset";

class _DashboardChartAssetsContainer extends React.PureComponent<Props, State> {
  state = {
    anchor: undefined
  };

  handleOpenDropdown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: undefined });
  handleSelectAsset = (id: string, title: string, type: ASSETS_TYPES) => {
    this.props.service.getAssetChart(id, title, type);
    this.handleCloseDropdown();
  };

  render() {
    const { t, assets } = this.props;
    const { programs, funds } = assets;
    const hasPrograms = programs.length > 0;
    const hasFunds = funds.length > 0;

    return (
      <div className="dashboard-chart-assets">
        <div className="dashboard-chart-assets__title">
          {t("manager.dashboard-page.chart-section.my-assets")}{" "}
          <ActionsCircleIcon
            className="dashboard-chart-assets__icon"
            primary={this.state.anchor !== null}
            onClick={this.handleOpenDropdown}
          />
        </div>
        <Popover
          horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          anchorEl={this.state.anchor}
          noPadding
          onClose={this.handleCloseDropdown}
        >
          <GVScroll autoHeight autoHeightMax="260px">
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
                  type={ASSETS_TYPES.Program}
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
                  type={ASSETS_TYPES.Fund}
                  selectAsset={this.handleSelectAsset}
                />
              ))}
            </div>
          </GVScroll>
        </Popover>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
      { getAssetChart },
      dispatch
    )
  };
};

interface Props extends OwnProps, DispatchProps, InjectedTranslateProps {}

interface OwnProps {
  assets: ManagerAssets;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  getAssetChart: typeof getAssetChart;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface State {
  anchor?: EventTarget;
}

const DashboardChartAssetsContainer = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_DashboardChartAssetsContainer);
export default DashboardChartAssetsContainer;
