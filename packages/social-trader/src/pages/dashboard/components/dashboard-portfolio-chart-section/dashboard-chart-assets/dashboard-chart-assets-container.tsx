import "./dashboard-chart-assets.scss";

import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import useAnchor, { anchorNullValue } from "shared/hooks/anchor.hook";
import { AuthRootState } from "shared/utils/types";

import { getAssetChart } from "../../../services/dashboard.service";
import DashboardChartAsset from "./dashboard-chart-asset";

const _DashboardChartAssetsContainer: React.FC<Props> = ({
  data: assets,
  type
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const period = useSelector((state: AuthRootState) => state.dashboard.period);
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleSelectAsset = useCallback(
    (id: string, title: string, type: ASSETS_TYPES) => {
      dispatch(getAssetChart(id, title, type, period));
      clearAnchor();
    },
    []
  );
  return (
    <div className="dashboard-chart-assets">
      <div className="dashboard-chart-assets__title">
        {t("dashboard-page.chart-section.my-assets")}{" "}
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

interface Props {
  data: Array<any>; //ManagerSimpleProgram | ManagerSimpleFund
  type: ASSETS_TYPES;
}

const DashboardChartAssetsContainer = withBlurLoader(
  React.memo(_DashboardChartAssetsContainer)
);
export default DashboardChartAssetsContainer;
