import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { UpperBlock } from "components/upper-block/upper-block";
import useApiRequest from "hooks/api-request.hook";
import { getSocialPageData } from "pages/social/social/services/social-page.service";
import { SocialPageDownloadsBlock } from "pages/social/social/social-page-downloads/social-page-downloads.block";
import { SocialPageFeedBlock } from "pages/social/social/social-page-feed/social-page-feed.block";
import { SocialPageGainersBlock } from "pages/social/social/social-page-gainers/social-page-gainers.block";
import { SocialPageTopicsBlock } from "pages/social/social/social-page-topics/social-page-topics.block";
import { SocialPageTradersBlock } from "pages/social/social/social-page-traders/social-page-traders.block";
import React from "react";

import styles from "./social-page.module.scss";

export const SocialPageContainer = () => {
  const { data } = useApiRequest({
    request: getSocialPageData,
    fetchOnMount: true
  });

  if (!data) return null;
  return (
    <>
      <Row center={false} className={styles["social-page__main-container"]}>
        <ResponsiveContainer
          enabledScreens={["landscape-tablet", "desktop", "large-desktop"]}
        >
          <RowItem className={styles["social-page__side-block"]}>
            <Row>
              <SocialPageTradersBlock assets={data?.topStrategies} />
            </Row>
            <Row>
              <SocialPageGainersBlock assets={data?.topAssets} />
            </Row>
            <ResponsiveContainer enabledScreens={["landscape-tablet"]}>
              <Row>
                <SocialPageTopicsBlock topics={data?.hotTopics} />
              </Row>
              <Row>
                <SocialPageDownloadsBlock />
              </Row>
            </ResponsiveContainer>
            <UpperBlock />
          </RowItem>
        </ResponsiveContainer>
        <RowItem className={styles["social-page__feed-container"]}>
          <SocialPageFeedBlock />
        </RowItem>
        <ResponsiveContainer enabledScreens={["large-desktop", "desktop"]}>
          <RowItem className={styles["social-page__side-block"]}>
            <Row>
              <SocialPageTopicsBlock topics={data?.hotTopics} />
            </Row>
            <Row>
              <SocialPageDownloadsBlock />
            </Row>
          </RowItem>
        </ResponsiveContainer>
      </Row>
    </>
  );
};
