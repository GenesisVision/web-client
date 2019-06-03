import "./dashboard-assets.scss";

import { IDashboardAssetsCounts } from "investor-web-portal/src/pages/dashboard/services/dashboard.service";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import DashboardFunds from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds";
import DashboardPrograms from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import { GetItemsFuncActionType } from "shared/components/table/components/table.types";
import withRole, { WithRoleProps } from "shared/decorators/withRole";

class _DashboardAssets extends React.PureComponent<Props, State> {
  state = {
    tab: TABS.PROGRAMS,
    programsCount: undefined,
    fundsCount: undefined
  };

  componentDidMount() {
    this.props.fetchAssetsCount().then(({ programsCount, fundsCount }) => {
      this.setState({ programsCount, fundsCount });
    });
  }

  handleTabChange = (e: any, tab: string) => {
    if (tab === this.state.tab) return;

    if (this.props.clearAssets) {
      this.props.clearAssets();
    }
    this.setState({ tab: tab as TABS });
  };

  componentWillUnmount() {
    if (this.props.clearAssets) {
      this.props.clearAssets();
    }
  }

  render() {
    const { tab, programsCount, fundsCount } = this.state;
    const {
      role,
      t,
      title,
      getDashboardPrograms,
      getDashboardFunds,
      createProgramButtonToolbar,
      createFundButtonToolbar,
      createFund,
      createProgram,
      programColumns
    } = this.props;
    return (
      <Surface className="dashboard-assets">
        <div className="dashboard-assets__head">
          <h3>{t(`${role}.dashboard-page.assets.title`)}</h3>
          <div className="dashboard-assets__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab
                value={TABS.PROGRAMS}
                label={t(`${role}.dashboard-page.assets.programs`)}
                count={programsCount}
              />
              <GVTab
                value={TABS.FUNDS}
                label={t(`${role}.dashboard-page.assets.funds`)}
                count={fundsCount}
              />
            </GVTabs>
          </div>
        </div>
        <div className="dashboard-assets__table">
          {tab === TABS.PROGRAMS && (
            <DashboardPrograms
              columns={programColumns}
              getDashboardPrograms={getDashboardPrograms}
              createButtonToolbar={createProgramButtonToolbar}
              createProgram={createProgram}
              title={title}
            />
          )}
          {tab === TABS.FUNDS && (
            <DashboardFunds
              createButtonToolbar={createFundButtonToolbar}
              createFund={createFund}
              getDashboardFunds={getDashboardFunds}
              title={title}
            />
          )}
        </div>
      </Surface>
    );
  }
}

interface Props extends InjectedTranslateProps, WithRoleProps, OwnProps {}

interface OwnProps {
  clearAssets: any;
  fetchAssetsCount: () => Promise<IDashboardAssetsCounts>;
  title: string;
  getDashboardPrograms: GetItemsFuncActionType;
  getDashboardFunds: GetItemsFuncActionType;
  createProgramButtonToolbar: any;
  createFundButtonToolbar: any;
  createFund: any;
  createProgram: any;
  programColumns: SortingColumn[];
}

interface State {
  tab: TABS;
  programsCount?: number;
  fundsCount?: number;
}

enum TABS {
  PROGRAMS = "programs",
  FUNDS = "funds"
}

const DashboardAssets = withRole<OwnProps>(translate()(_DashboardAssets));
export default DashboardAssets;
