import { DefaultTableBlock } from "components/default.block/default-table.block";
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

export enum SEARCH_TABS {
  FOLLOWS = "follows",
  PROGRAMS = "programs",
  FUNDS = "funds",
  MANAGERS = "manages"
}

const _GlobalSearchResult: React.FC<Props> = ({ data }) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<SEARCH_TABS>(SEARCH_TABS.MANAGERS);
  return (
    <DefaultTableBlock>
      <DetailsBlockTitleBox>
        <h3>{t("global-search-page.heading")}</h3>
      </DetailsBlockTitleBox>
      <Row>
        <DetailsBlockTabs value={tab} onChange={setTab}>
          <GVTab
            value={SEARCH_TABS.MANAGERS}
            label={t("global-search-page.managers")}
            count={data.managers && data.managers.total}
          />
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
        </DetailsBlockTabs>
      </Row>
      <Tab data={data} tab={tab} />
    </DefaultTableBlock>
  );
};

interface ITabProps {
  data: CommonPublicAssetsViewModel;
  tab: SEARCH_TABS;
}

const Tab: React.FC<ITabProps> = React.memo(({ data, tab }) => {
  switch (tab) {
    case SEARCH_TABS.MANAGERS:
      return <ManagersTable data={data.managers} />;
    case SEARCH_TABS.FUNDS:
      return <FundsTable data={data.funds} />;
    case SEARCH_TABS.PROGRAMS:
      return <ProgramsTable data={data.programs} />;
    case SEARCH_TABS.FOLLOWS:
      return <FollowsTable data={data.follows} />;
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
