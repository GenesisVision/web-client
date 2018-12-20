import "./manager-history.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import { fetchManagerAssetsCount } from "../services/manager.service";
import ManagerFunds from "./manager-funds-table";
import ManagerPrograms from "./manager-programs-table";

const PROGRAMS_TAB = "programs";
const FUNDS_TAB = "funds";

class ManagerHistorySection extends PureComponent {
  state = {
    tab: PROGRAMS_TAB,
    programsCount: undefined,
    fundsCount: undefined
  };

  componentDidMount() {
    const { managerId } = this.props;
    fetchManagerAssetsCount(managerId).then(assetsCounts => {
      this.setState({ ...assetsCounts });
    });
  }

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab, programsCount, fundsCount } = this.state;
    const { t, managerId, title, isAuthenticated } = this.props;

    return (
      <Surface className="manager-history">
        <div className="manager-history__tabs">
          <GVTabs value={tab} onChange={this.handleTabChange}>
            <GVTab
              value={"programs"}
              label={t("manager-page.history.tabs.programs")}
              count={programsCount}
            />
            <GVTab
              value={"funds"}
              label={t("manager-page.history.tabs.funds")}
              count={fundsCount}
            />
          </GVTabs>
        </div>

        <div>
          {tab === PROGRAMS_TAB && (
            <ManagerPrograms
              title={title}
              managerId={managerId}
              isAuthenticated={isAuthenticated}
            />
          )}
          {tab === FUNDS_TAB && (
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

export default translate()(ManagerHistorySection);
