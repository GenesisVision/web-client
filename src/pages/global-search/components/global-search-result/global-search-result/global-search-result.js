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

  renderLoading = () => (
    <div className="global-search-result__loading">Loading...</div>
  );

  renderTab = () => {
    const { data, title } = this.props;
    const { tab } = this.state;
    switch (tab) {
      case MANAGERS_TABLE_TAB:
        return data.managers ? (
          <ManagersTable title={title} data={data.managers} />
        ) : (
          this.renderLoading()
        );
      case FUNDS_TABLE_TAB:
        return data.funds ? (
          <FundsTable title={title} items={data.funds} />
        ) : (
          this.renderLoading()
        );
      case PROGRAMS_TABLE_TAB:
        return data.programs ? (
          <ProgramsTable title={title} items={data.programs} />
        ) : (
          this.renderLoading()
        );
      default:
        return null;
    }
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
        {this.renderTab()}
      </Surface>
    );
  }
}
export default translate()(GlobalSearchResult);
