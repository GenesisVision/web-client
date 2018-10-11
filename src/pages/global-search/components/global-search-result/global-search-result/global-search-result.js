import { GVTab, GVTabs } from "gv-react-components";
import React, { Fragment, PureComponent } from "react";
import { translate } from "react-i18next";

import ManagersTable from "./managers-table";
import ProgramsTable from "./programs-table";
import FundsTable from "./funds-table";

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
    const { data } = this.props;
    const { tab } = this.state;
    if (tab !== PROGRAMS_TABLE_TAB || !data.programs) return null;
    return <ProgramsTable items={data.programs} />;
  };

  renderFundsTab = () => {
    const { data } = this.props;
    const { tab } = this.state;
    if (tab !== FUNDS_TABLE_TAB || !data.funds) return null;
    return <FundsTable items={data.funds} />;
  };

  renderManagersTab = () => {
    const { data } = this.props;
    const { tab } = this.state;
    if (tab !== MANAGERS_TABLE_TAB || !data.managers) return null;
    return <ManagersTable data={data.managers} />;
  };

  render() {
    const { t } = this.props;
    const { tab } = this.state;
    return (
      <Fragment>
        <h2>{t("global-search-page.heading")}</h2>
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
        {this.renderProgramsTab()}
        {this.renderManagersTab()}
        {this.renderFundsTab()}
      </Fragment>
    );
  }
}
export default translate()(GlobalSearchResult);
