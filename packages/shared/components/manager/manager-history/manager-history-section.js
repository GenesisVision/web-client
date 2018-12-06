import "./manager-history.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import ManagerFunds from "./manager-funds-table";
import ManagerPrograms from "./manager-programs-table";

const PROGRAMS_TAB = "programs";
const FUNDS_TAB = "funds";

class ManagerHistorySection extends PureComponent {
  state = {
    tab: PROGRAMS_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    const { t, managerId, title } = this.props;
    const { handleTabChange } = this;
    return (
      <Surface className="manager-history">
        <div className="manager-history__tabs">
          <GVTabs value={tab} onChange={handleTabChange}>
            <GVTab
              value={"programs"}
              label={t("manager.history.tabs.programs")}
            />
            <GVTab value={"funds"} label={t("manager.history.tabs.funds")} />
          </GVTabs>
        </div>

        <div>
          {tab === PROGRAMS_TAB && (
            <ManagerPrograms title={title} managerId={managerId} />
          )}
          {tab === FUNDS_TAB && (
            <ManagerFunds title={title} managerId={managerId} />
          )}
        </div>
      </Surface>
    );
  }
}

export default translate()(ManagerHistorySection);
