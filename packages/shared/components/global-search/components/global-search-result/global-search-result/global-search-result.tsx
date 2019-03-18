import { GVTab, GVTabs } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import FundsTable from "./funds-table";
import ManagersTable from "./managers-table";
import ProgramsTable from "./programs-table";
import { SyntheticEvent } from "react";

export enum SEARCH_TABS {
  PROGRAMS = "investors",
  FUNDS = "funds",
  MANAGERS = "manages"
}

export interface SearchTableProps {
  title: string;
  data: any;
}

interface Props {
  data: any;
  title: string;
}

interface State {
  tab: SEARCH_TABS;
}

class GlobalSearchResult extends React.Component<
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
          <SearchResultTable t={t} data={data.managers}>
            <ManagersTable title={title} data={data.managers} />
          </SearchResultTable>
        );
      case SEARCH_TABS.FUNDS:
        return (
          <SearchResultTable t={t} data={data.funds}>
            <FundsTable title={title} data={data.funds} />
          </SearchResultTable>
        );
      case SEARCH_TABS.PROGRAMS:
        return (
          <SearchResultTable t={t} data={data.programs}>
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

const SearchResultTable: React.FC<{ data: any } & InjectedTranslateProps> = ({
  data,
  children,
  t
}) => (
  <React.Fragment>
    {data ? (
      children
    ) : (
      <div className="global-search-result__loading">{t("table.loading")}</div>
    )}
  </React.Fragment>
);

export default translate()(GlobalSearchResult);
