import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import { CREATE_PROGRAM_PAGE_ROUTE } from "pages/create-program/create-program.routes";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import { ManagerRootState } from "reducers";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import DashboardAssets from "shared/components/dashboard/dashboard-assets/dashboard-assets";
import dashboardFundsTableSelector from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds.selector";
import dashboardProgramsTableSelector from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.selector";
import GVButton from "shared/components/gv-button";
import { ChartIcon } from "shared/components/icon/chart-icon";
import Link from "shared/components/link/link";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

import { clearDashboardAssetsTableAction } from "../../actions/dashboard.actions";
import { getDashboardFunds } from "../../services/dashboard-funds.service";
import { getDashboardPrograms } from "../../services/dashboard-programs.service";
import { getAssetsCounts } from "../../services/dashboard.service";
import { DASHBOARD_PROGRAMS_COLUMNS } from "./dashboard-assets.constants";

const _DashboardAssetsContainer: React.FC<Props> = ({
  t,
  title,
  counts,
  service
}) => (
  <DashboardAssets
    programColumns={DASHBOARD_PROGRAMS_COLUMNS}
    clearAssets={service.clearDashboardAssetsTable}
    getDashboardPrograms={getDashboardPrograms}
    getDashboardFunds={getDashboardFunds}
    counts={counts}
    getAssetsCounts={service.getAssetsCounts}
    createProgramButtonToolbar={
      <CreateButtonToolbar
        text={t("buttons.create-program")}
        route={CREATE_PROGRAM_PAGE_ROUTE}
      />
    }
    createFundButtonToolbar={
      <CreateButtonToolbar
        text={t("buttons.create-fund")}
        route={CREATE_FUND_PAGE_ROUTE}
      />
    }
    createFund={<EmptyFunds />}
    createProgram={<EmptyPrograms />}
    title={title}
  />
);

const CreateButtonToolbar: React.FC<{ text: string; route: string }> = ({
  text,
  route
}) => (
  <Link to={route} className="dashboard__button">
    <GVButton color="primary" variant="text">
      {text}
    </GVButton>
  </Link>
);

const _EmptyFunds: React.FC<WithTranslation & WithRoleProps> = ({
  role,
  t
}) => (
  <div className="create-asset">
    <div className="create-asset__create-icon">
      <ChartIcon />
    </div>
    <div className="create-asset__text">
      {t(`${role}.dashboard-page.create-fund-text`)}
    </div>
    <div className="create-asset__button">
      <Link to={CREATE_FUND_PAGE_ROUTE} className="dashboard__body-button">
        <GVButton color="primary">{t("buttons.create-fund")}</GVButton>
      </Link>
    </div>
  </div>
);
const EmptyFunds = compose<React.ComponentType>(
  withRole,
  translate(),
  React.memo
)(_EmptyFunds);

const _EmptyPrograms: React.FC<WithTranslation & WithRoleProps> = ({
  role,
  t
}) => (
  <div className="create-asset">
    <div className="create-asset__create-icon">
      <ChartIcon />
    </div>
    <div className="create-asset__text">
      {t(`${role}.dashboard-page.create-program-text`)}
    </div>
    <div className="create-asset__button">
      <Link to={CREATE_PROGRAM_PAGE_ROUTE} className="dashboard__body-button">
        <GVButton color="primary">{t("buttons.create-program")}</GVButton>
      </Link>
    </div>
  </div>
);
const EmptyPrograms = compose<React.ComponentType>(
  withRole,
  translate(),
  React.memo
)(_EmptyPrograms);

const mapStateToProps = (state: ManagerRootState) => {
  const counts = {
    programsCount: dashboardProgramsTableSelector(state).itemsData.data.total,
    fundsCount: dashboardFundsTableSelector(state).itemsData.data.total
  };
  return { counts };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      clearDashboardAssetsTable: clearDashboardAssetsTableAction,
      getDashboardPrograms,
      getDashboardFunds,
      getAssetsCounts
    },
    dispatch
  )
});

interface Props extends StateProps, DispatchProps, OwnProps, WithTranslation {}

interface OwnProps {
  title: string;
}

interface StateProps {
  counts: {
    programsCount: number;
    fundsCount: number;
  };
}

interface ServiceThunks extends ActionCreatorsMapObject {
  clearDashboardAssetsTable: typeof clearDashboardAssetsTableAction;
  getDashboardPrograms: typeof getDashboardPrograms;
  getDashboardFunds: typeof getDashboardFunds;
  getAssetsCounts: typeof getAssetsCounts;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

const DashboardAssetsContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_DashboardAssetsContainer);
export default DashboardAssetsContainer;
