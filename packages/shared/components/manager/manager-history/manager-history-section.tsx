import "./manager-history.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";

import { MANAGER_HISTORY_TAB } from "../manager.constants";
import { fetchManagerAssetsCount } from "../services/manager.service";
import ManagerFunds from "./manager-funds-table";
import ManagerPrograms from "./manager-programs-table";

interface Props {
  managerId: string;
  title: string;
  isAuthenticated: boolean;
}

interface State {
  tab: MANAGER_HISTORY_TAB;
  programsCount: number;
  fundsCount: number;
}

class _ManagerHistorySection extends React.PureComponent<
  Props & InjectedTranslateProps,
  State
> {
  state = {
    tab: MANAGER_HISTORY_TAB.PROGRAMS,
    programsCount: 0,
    fundsCount: 0
  };

  componentDidMount() {
    fetchManagerAssetsCount(this.props.managerId).then(assetsCounts => {
      this.setState({ ...assetsCounts });
    });
  }

  handleTabChange = (e: React.SyntheticEvent<EventTarget>, tab: string) => {
    this.setState({ tab: tab as MANAGER_HISTORY_TAB });
  };

  render() {
    const { tab, programsCount, fundsCount } = this.state;
    const { t, managerId, title, isAuthenticated } = this.props;

    return (
      <Surface className="manager-history">
        <div className="manager-history__heading">
          <h3>{t("manager-page.assets")}</h3>
        </div>
        <div className="manager-history__tabs">
          <GVTabs value={tab} onChange={this.handleTabChange}>
            <GVTab
              value={MANAGER_HISTORY_TAB.PROGRAMS}
              label={t("manager-page.history.tabs.programs")}
              count={programsCount}
            />
            <GVTab
              value={MANAGER_HISTORY_TAB.FUNDS}
              label={t("manager-page.history.tabs.funds")}
              count={fundsCount}
            />
          </GVTabs>
        </div>

        <div>
          {tab === MANAGER_HISTORY_TAB.PROGRAMS && (
            <ManagerPrograms
              title={title}
              managerId={managerId}
              isAuthenticated={isAuthenticated}
            />
          )}
          {tab === MANAGER_HISTORY_TAB.FUNDS && (
            <ManagerFunds
              title={title}
              managerId={managerId}
              isAuthenticated={isAuthenticated}
            />
          )}
        </div>
      </Surface>
    );
  }
}

const ManagerHistorySection = translate()(_ManagerHistorySection);
export default ManagerHistorySection;
