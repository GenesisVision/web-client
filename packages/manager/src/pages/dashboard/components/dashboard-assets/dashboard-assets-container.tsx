import { CREATE_FUND_PAGE_ROUTE } from "pages/create-fund/create-fund.constants";
import { CREATE_PROGRAM_PAGE_ROUTE } from "pages/create-program/create-program.routes";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import DashboardAssets from "shared/components/dashboard/dashboard-assets/dashboard-assets";
import GVButton from "shared/components/gv-button";
import { ChartIcon } from "shared/components/icon/chart-icon";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

import { clearDashboardAssetsTable } from "../../actions/dashboard.actions";
import { getDashboardFunds } from "../../services/dashboard-funds.service";
import { getDashboardPrograms } from "../../services/dashboard-programs.service";
import { fetchAssetsCount } from "../../services/dashboard.service";
import { DASHBOARD_PROGRAMS_COLUMNS } from "./dashboard-assets.constants";

class _DashboardAssetsContainer extends React.PureComponent<Props> {
  getAssets = () => {
    const { getDashboardFunds, getDashboardPrograms } = this.props.service;
    getDashboardFunds();
    getDashboardPrograms();
  };

  render() {
    const { t, title, service } = this.props;

    return (
      <DashboardAssets
        programColumns={DASHBOARD_PROGRAMS_COLUMNS}
        clearAssets={service.clearDashboardAssetsTable}
        getDashboardPrograms={getDashboardPrograms}
        getDashboardFunds={getDashboardFunds}
        fetchAssetsCount={fetchAssetsCount}
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
  }
}

const CreateButtonToolbar: React.FC<{ text: string; route: string }> = ({
  text,
  route
}) => (
  <div className="dashboard__button-container">
    <Link to={route} className="dashboard__button">
      <GVButton color="primary" variant="text">
        {text}
      </GVButton>
    </Link>
  </div>
);

const _EmptyFunds: React.FC<InjectedTranslateProps & WithRoleProps> = ({
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
const EmptyFunds = withRole(translate()(_EmptyFunds));

const _EmptyPrograms: React.FC<InjectedTranslateProps & WithRoleProps> = ({
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
const EmptyPrograms = withRole(translate()(_EmptyPrograms));

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { clearDashboardAssetsTable, getDashboardPrograms, getDashboardFunds },
    dispatch
  )
});

interface Props extends DispatchProps, OwnProps, InjectedTranslateProps {}

interface OwnProps {
  title: string;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  clearDashboardAssetsTable: typeof clearDashboardAssetsTable;
  getDashboardPrograms: typeof getDashboardPrograms;
  getDashboardFunds: typeof getDashboardFunds;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

const DashboardAssetsContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_DashboardAssetsContainer);
export default DashboardAssetsContainer;
