import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Surface from "components/surface/surface";
import { CommonPublicAssetsViewModel } from "gv-api-web";
import useTab from "hooks/tab.hook";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import { FollowsTable } from "./follows-table";
import FundsTable from "./funds-table";
import ManagersTable from "./managers-table";
import ProgramsTable from "./programs-table";
import SearchResultTable from "./search-result-table";

const _GlobalSearchResult: React.FC<Props> = ({ t, data, title }) => {
  const { tab, setTab } = useTab<SEARCH_TABS>(SEARCH_TABS.PROGRAMS);
  return (
    <Surface className="global-search-result">
      <h3 className="global-search-result__heading">
        {t("global-search-page.heading")}
      </h3>
      <div className="global-search-result__tabs">
        <GVTabs value={tab} onChange={setTab}>
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
            value={SEARCH_TABS.FOLLOWS}
            label={t("global-search-page.follows")}
            count={data.follows && data.follows.total}
          />
          <GVTab
            value={SEARCH_TABS.MANAGERS}
            label={t("global-search-page.managers")}
            count={data.managers && data.managers.total}
          />
        </GVTabs>
      </div>
      <Tab title={title} data={data} tab={tab} />
    </Surface>
  );
};

interface ITabProps {
  data: CommonPublicAssetsViewModel;
  title: string;
  tab: SEARCH_TABS;
}

const Tab: React.FC<ITabProps> = React.memo(({ data, title, tab }) => {
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
    case SEARCH_TABS.FOLLOWS:
      return (
        <SearchResultTable data={Boolean(data.follows)}>
          <FollowsTable title={title} data={data.follows} />
        </SearchResultTable>
      );
    default:
      return null;
  }
});

export enum SEARCH_TABS {
  FOLLOWS = "follows",
  PROGRAMS = "programs",
  FUNDS = "funds",
  MANAGERS = "manages"
}

export interface SearchTableProps<T> {
  title: string;
  data: T;
}

interface Props extends WithTranslation {
  data: CommonPublicAssetsViewModel;
  title: string;
}

const GlobalSearchResult = translate()(React.memo(_GlobalSearchResult));
export default GlobalSearchResult;
