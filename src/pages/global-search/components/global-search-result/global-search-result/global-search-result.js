import Surface from "components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";

import FundsTable from "./funds-table";
import ManagersTable from "./managers-table";
import ProgramsTable from "./programs-table";

const PROGRAMS_TABLE_TAB = "investors";
const FUNDS_TABLE_TAB = "funds";
const MANAGERS_TABLE_TAB = "manages";

class GlobalSearchResult extends PureComponent {
  state = {
    tab: PROGRAMS_TABLE_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  renderProgramsTab = () => {
    const { data, title } = this.props;
    const { tab } = this.state;
    if (tab !== PROGRAMS_TABLE_TAB || !data.programs) return null;
    return <ProgramsTable title={title} items={data.programs} />;
  };

  renderFundsTab = () => {
    const { data, title } = this.props;
    const { tab } = this.state;
    if (tab !== FUNDS_TABLE_TAB || !data.funds) return null;
    return <FundsTable title={title} items={data.funds} />;
  };

  renderManagersTab = () => {
    const { data, title } = this.props;
    const { tab } = this.state;
    if (tab !== MANAGERS_TABLE_TAB || !data.managers) return null;
    return <ManagersTable title={title} data={data.managers} />;
  };

  render() {
    const { t } = this.props;
    const { tab } = this.state;
    return (
      <Surface className="global-search-result">
        <div className="global-search-result__heading">
          {t("global-search-page.heading")}
        </div>
        <div className="global-search-result__tabs">
          <GVTabs value={tab} onChange={this.handleTabChange}>
            <GVTab
              value={PROGRAMS_TABLE_TAB}
              label={t("global-search-page.programs")}
            />
            <GVTab
              value={FUNDS_TABLE_TAB}
              label={t("global-search-page.funds")}
            />
            <GVTab
              value={MANAGERS_TABLE_TAB}
              label={t("global-search-page.managers")}
            />
          </GVTabs>
        </div>
        {this.renderProgramsTab()}
        {this.renderManagersTab()}
        {this.renderFundsTab()}
      </Surface>
    );
  }
}
export default translate()(GlobalSearchResult);
