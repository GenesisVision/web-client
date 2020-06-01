import classNames from "classnames";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { SearchIcon } from "components/icon/search-icon";
import { Row } from "components/row/row";
import useIsOpen from "hooks/is-open.hook";
import useTab from "hooks/tab.hook";
import { FEED_TYPE, FeedContainer } from "pages/feed/feed.container";
import { HashTagsBlock } from "pages/social/social/social-page-feed/hash-tags-block";
import { SocialSearchContext } from "pages/social/social/social-page.context";
import styles from "pages/social/social/social-page.module.scss";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

import SocialSearchInput from "./social-search-input";

enum TABS {
  FEED = "FEED",
  HOT = "HOT",
  LIVE = "LIVE"
}

interface Props {}

const _SocialPageFeedBlock: React.FC<Props> = () => {
  const [t] = useTranslation();
  const { searchValue } = useContext(SocialSearchContext);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [openSearch, setSearchIsOpen, setSearchIsClose] = useIsOpen();

  useEffect(() => {
    if (searchValue.mask) setSearchIsOpen();
  }, [searchValue]);
  const { tab, setTab } = useTab<TABS>(TABS.LIVE);

  const isSearch =
    !!searchValue.hashTags.length ||
    !!searchValue.mask ||
    !!searchValue.tagContent.length;
  return (
    <>
      <Row>
        <div
          className={classNames(styles["social-page__tabs-container"], {
            [styles["social-page__tabs-container--search"]]: openSearch
          })}
        >
          <GVTabs value={tab} onChange={setTab}>
            <GVTab value={TABS.LIVE} label={t("Live")} />
            <GVTab value={TABS.HOT} label={t("Hot")} />
            <GVTab
              visible={isAuthenticated}
              value={TABS.FEED}
              label={t("Feed")}
            />
          </GVTabs>
        </div>
        <div
          onClick={setSearchIsOpen}
          className={classNames(styles["social-page__search-container"], {
            [styles["social-page__search-container--search"]]: openSearch
          })}
        >
          {openSearch ? (
            <SocialSearchInput setSearchIsClose={setSearchIsClose} />
          ) : (
            <div className={styles["social-page__search-button"]}>
              <SearchIcon />
            </div>
          )}
        </div>
      </Row>
      <Row>
        <HashTagsBlock />
      </Row>
      <Row onlyOffset wide>
        {isSearch && <FeedContainer searchValue={searchValue} />}
        {tab === TABS.FEED && !isSearch && isAuthenticated && (
          <FeedContainer feedType={FEED_TYPE.PERSONAL} />
        )}
        {(tab === TABS.HOT || !isAuthenticated) && !isSearch && (
          <FeedContainer showTop />
        )}
        {(tab === TABS.LIVE || !isAuthenticated) && !isSearch && (
          <FeedContainer feedType={FEED_TYPE.ALL} />
        )}
      </Row>
    </>
  );
};

export const SocialPageFeedBlock = React.memo(_SocialPageFeedBlock);
