import { IPostListContainerInitData } from "components/conversation/post-list/post-list.container";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { SearchIcon } from "components/icon/search-icon";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import useIsOpen from "hooks/is-open.hook";
import useTab from "hooks/tab.hook";
import { FEED_TYPE, FeedContainer } from "pages/feed/feed.container";
import { ShowEventsContainer } from "pages/feed/show-events-container/show-events-container";
import {
  FeedContext,
  SocialSearchInitialState
} from "pages/social/social/feed.context";
import { HashTagsBlock } from "pages/social/social/social-page-feed/hash-tags-block";
import {
  SocialPageSearchButton,
  SocialPageSearchContainer,
  SocialPageTabsContainer
} from "pages/social/social/social-page.styles";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

import SocialSearchInput from "./social-search-input";

enum TABS {
  SEARCH = "SEARCH",
  FEED = "FEED",
  HOT = "HOT",
  LIVE = "LIVE"
}

interface Props extends IPostListContainerInitData {}

const _SocialPageFeedBlock: React.FC<Props> = ({ initData }) => {
  const [t] = useTranslation();
  const { searchValue, setSearchValue } = useContext(FeedContext);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [openSearch, setSearchIsOpen, setSearchIsClose] = useIsOpen();
  const { tab, setTab } = useTab<TABS>(TABS.LIVE);

  const isSearch =
    !!searchValue.hashTags.length ||
    !!searchValue.mask ||
    !!searchValue.tagContent.length;

  useEffect(() => {
    if (searchValue.mask) setSearchIsOpen();
  }, [searchValue]);

  useEffect(() => {
    if (isSearch) setTab(null, TABS.SEARCH);
    else if (tab === TABS.SEARCH) setTab(null, TABS.LIVE);
  }, [isSearch]);

  useEffect(() => {
    if (tab !== TABS.SEARCH) setSearchValue(SocialSearchInitialState);
  }, [tab]);

  return (
    <>
      <Row>
        <SocialPageTabsContainer open={!openSearch}>
          <GVTabs value={tab} onChange={setTab}>
            <GVTab value={TABS.LIVE} label={t("Live")} />
            <GVTab value={TABS.HOT} label={t("Hot")} />
            <GVTab
              visible={isAuthenticated}
              value={TABS.FEED}
              label={t("Feed")}
            />
          </GVTabs>
        </SocialPageTabsContainer>
        <SocialPageSearchContainer open={openSearch} onClick={setSearchIsOpen}>
          {openSearch ? (
            <SocialSearchInput setSearchIsClose={setSearchIsClose} />
          ) : (
            <SocialPageSearchButton>
              <SearchIcon />
            </SocialPageSearchButton>
          )}
        </SocialPageSearchContainer>
      </Row>
      <Row>
        <RowItem wide>
          <HashTagsBlock />
        </RowItem>
        <RowItem>
          <ShowEventsContainer />
        </RowItem>
      </Row>
      <Row onlyOffset wide>
        {isSearch && <FeedContainer searchValue={searchValue} />}
        {tab === TABS.FEED && !isSearch && isAuthenticated && (
          <FeedContainer showInput feedType={FEED_TYPE.PERSONAL} />
        )}
        {tab === TABS.HOT && !isSearch && <FeedContainer showTop />}
        {tab === TABS.LIVE && !isSearch && (
          <FeedContainer
            showInput
            initData={initData}
            feedType={FEED_TYPE.ALL}
          />
        )}
      </Row>
    </>
  );
};

export const SocialPageFeedBlock = React.memo(_SocialPageFeedBlock);
