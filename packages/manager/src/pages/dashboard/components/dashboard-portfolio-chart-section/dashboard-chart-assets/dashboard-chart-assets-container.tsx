import "./dashboard-chart-assets.scss";

import { ManagerSimpleFund, ManagerSimpleProgram } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useAnchor, { anchorNullValue } from "shared/hooks/anchor.hook";

import { getAssetChart } from "../../../services/dashboard.service";
import DashboardChartAsset from "./dashboard-chart-asset";

const _DashboardChartAssetsContainer: React.FC<Props> = ({
  t,
  assets,
  type,
  service
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleSelectAsset = useCallback(
    (id: string, title: string, type: ASSETS_TYPES) => {
      service.getAssetChart(id, title, type);
      clearAnchor();
    },
    [clearAnchor, service]
  );
  return (
    <div className="dashboard-chart-assets">
      <div className="dashboard-chart-assets__title">
        {t("manager.dashboard-page.chart-section.my-assets")}{" "}
        <ActionsCircleIcon
          className="dashboard-chart-assets__icon"
          primary={anchor !== anchorNullValue}
          onClick={setAnchor}
        />
      </div>
      <Popover
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        anchorEl={anchor}
        noPadding
        onClose={clearAnchor}
      >
        <div className="dashboard-chart-assets-popover">
          {assets.map(x => (
            <DashboardChartAsset
              key={x.id}
              chartAsset={x}
              type={type}
              selectAsset={handleSelectAsset}
            />
          ))}
        </div>
      </Popover>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getAssetChart },
    dispatch
  )
});

interface Props extends OwnProps, DispatchProps, WithTranslation {}

interface OwnProps {
  assets: Array<ManagerSimpleProgram | ManagerSimpleFund>;
  type: ASSETS_TYPES;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  getAssetChart: typeof getAssetChart;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

const DashboardChartAssetsContainer = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_DashboardChartAssetsContainer);
export default DashboardChartAssetsContainer;
