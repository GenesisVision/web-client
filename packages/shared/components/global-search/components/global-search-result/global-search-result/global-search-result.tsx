import { SearchViewModel } from "gv-api-web";
import * as React from "react";
import { SyntheticEvent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";

import FundsTable from "./funds-table";
import ManagersTable from "./managers-table";
import ProgramsTable from "./programs-table";
import SearchResultTable from "./search-result-table";

export enum SEARCH_TABS {
  PROGRAMS = "investors",
  FUNDS = "funds",
  MANAGERS = "manages"
}

export interface SearchTableProps<T> {
  title: string;
  data: T;
}

interface Props {
  data: SearchViewModel;
  title: string;
}

interface State {
  tab: SEARCH_TABS;
}

class GlobalSearchResult extends React.PureComponent<
  Props & InjectedTranslateProps,
  State
> {
  state = {
    tab: SEARCH_TABS.PROGRAMS
  };

  handleTabChange = (e: SyntheticEvent<EventTarget, Event>, tab: string) => {
    this.setState({ tab: tab as SEARCH_TABS });
  };

  renderTab = () => {
    const { data, title, t } = this.props;
    const { tab } = this.state;
    switch (tab) {
      case SEARCH_TABS.MANAGERS:
        return (
          <SearchResultTable data={Boolean(data.managers)}>
            <ManagersTable title={title} data={data.managers} />
          </SearchResultTable>
        );
      case SEARCH_TABS.FUNDS:
        return (
          <SearchResultTable data={Boolean(data.funds)}>
            <FundsTable title={title} data={data.funds} />
          </SearchResultTable>
        );
      case SEARCH_TABS.PROGRAMS:
        return (
          <SearchResultTable data={Boolean(data.programs)}>
            <ProgramsTable title={title} data={data.programs} />
          </SearchResultTable>
        );
      default:
        return null;
    }
  };

  render() {
    const { t, data } = this.props;
    const { tab } = this.state;
    return (
      <Surface className="global-search-result">
        <h3 className="global-search-result__heading">
          {t("global-search-page.heading")}
        </h3>
        <div className="global-search-result__tabs">
          <GVTabs value={tab} onChange={this.handleTabChange}>
            <GVTab
              value={SEARCH_TABS.PROGRAMS}
              label={t("global-search-page.programs")}
              count={data.programs && data.programs.total}
            />
            <GVTab
              value={SEARCH_TABS.FUNDS}
              label={t("global-search-page.funds")}
              count={data.funds && data.funds.total}
            />
            <GVTab
              value={SEARCH_TABS.MANAGERS}
              label={t("global-search-page.managers")}
              count={data.managers && data.managers.total}
            />
          </GVTabs>
        </div>
        {this.renderTab()}
      </Surface>
    );
  }
}

export default translate()(GlobalSearchResult);
