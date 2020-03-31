import DetailsBlock from "components/details/details-block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import DetailsBlockTitleBox from "components/details/details-block-title-box";
import GVTab from "components/gv-tabs/gv-tab";
import { Row } from "components/row/row";
import { withBlurLoader } from "decorators/with-blur-loader";
import { CommonPublicAssetsViewModel } from "gv-api-web";
import useTab from "hooks/tab.hook";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { FollowsTable } from "./follows-table";
import FundsTable from "./funds-table";
import ManagersTable from "./managers-table";
import ProgramsTable from "./programs-table";
import SearchResultTable from "./search-result-table";

export enum SEARCH_TABS {
  FOLLOWS = "follows",
  PROGRAMS = "programs",
  FUNDS = "funds",
  MANAGERS = "manages"
}

const _GlobalSearchResult: React.FC<Props> = ({ data }) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<SEARCH_TABS>(SEARCH_TABS.PROGRAMS);
  return (
    <DetailsBlock table>
      <DetailsBlockTitleBox>
        <h3>{t("global-search-page.heading")}</h3>
      </DetailsBlockTitleBox>
      <Row>
        <DetailsBlockTabs value={tab} onChange={setTab}>
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
        </DetailsBlockTabs>
      </Row>
      <Tab data={data} tab={tab} />
    </DetailsBlock>
  );
};

interface ITabProps {
  data: CommonPublicAssetsViewModel;
  tab: SEARCH_TABS;
}

const Tab: React.FC<ITabProps> = React.memo(({ data, tab }) => {
  switch (tab) {
    case SEARCH_TABS.MANAGERS:
      return (
        <SearchResultTable data={Boolean(data.managers)}>
          <ManagersTable data={data.managers} />
        </SearchResultTable>
      );
    case SEARCH_TABS.FUNDS:
      return (
        <SearchResultTable data={Boolean(data.funds)}>
          <FundsTable data={data.funds} />
        </SearchResultTable>
      );
    case SEARCH_TABS.PROGRAMS:
      return (
        <SearchResultTable data={Boolean(data.programs)}>
          <ProgramsTable data={data.programs} />
        </SearchResultTable>
      );
    case SEARCH_TABS.FOLLOWS:
      return (
        <SearchResultTable data={Boolean(data.follows)}>
          <FollowsTable data={data.follows} />
        </SearchResultTable>
      );
    default:
      return null;
  }
});

export interface SearchTableProps<T> {
  data: T;
}

interface Props {
  data: CommonPublicAssetsViewModel;
}

const GlobalSearchResult = withBlurLoader(React.memo(_GlobalSearchResult));
export default GlobalSearchResult;
