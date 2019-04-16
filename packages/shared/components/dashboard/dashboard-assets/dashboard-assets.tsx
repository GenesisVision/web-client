import "./dashboard-assets.scss";

import { GVTab, GVTabs } from "gv-react-components";
import { IDashboardAssetsCounts } from "investor-web-portal/src/pages/dashboard/services/dashboard.service";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import DashboardFunds from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds";
import DashboardPrograms from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs";
import Surface from "shared/components/surface/surface";

class DashboardAssets extends React.PureComponent<
  Props & InjectedTranslateProps,
  State
> {
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
      t,
      title,
      getDashboardPrograms,
      getDashboardFunds,
      createProgramButtonToolbar,
      createFundButtonToolbar,
      createFund,
      createProgram
    } = this.props;
    const role = process.env.REACT_APP_PLATFORM;
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

interface Props {
  clearAssets: any;
  fetchAssetsCount: () => Promise<IDashboardAssetsCounts>;
  title: any;
  getDashboardPrograms: any;
  getDashboardFunds: any;
  createProgramButtonToolbar: any;
  createFundButtonToolbar: any;
  createFund: any;
  createProgram: any;
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

export default translate()(DashboardAssets);
