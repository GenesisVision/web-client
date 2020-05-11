import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import Page from "components/page/page";
import { Row } from "components/row/row";
import useTab from "hooks/tab.hook";
import { FEED_TYPE, NewsContainer } from "pages/news/news.container";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

enum TABS {
  ALL = "ALL",
  MY = "MY"
}

export const NewsPage: React.FC = () => {
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { tab, setTab } = useTab<TABS>(TABS.MY);
  const title = t(`news-page.title`);
  return (
    <Page title={title}>
      {isAuthenticated && (
        <Row>
          <GVTabs value={tab} onChange={setTab}>
            <GVTab value={TABS.MY} label={t("news-page.tabs.my")} />
            <GVTab value={TABS.ALL} label={t("news-page.tabs.all")} />
          </GVTabs>
        </Row>
      )}
      <Row onlyOffset wide>
        {tab === TABS.MY && isAuthenticated && (
          <NewsContainer feedType={FEED_TYPE.PERSONAL} />
        )}
        {(tab === TABS.ALL || !isAuthenticated) && (
          <NewsContainer feedType={FEED_TYPE.ALL} />
        )}
      </Row>
    </Page>
  );
};
