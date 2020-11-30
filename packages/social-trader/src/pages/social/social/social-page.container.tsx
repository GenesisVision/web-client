import { ResponsiveContainer } from "components/responsive-container/responsive-container";
import { Row } from "components/row/row";
import { UpperBlock } from "components/upper-block/upper-block";
import { UpperButtonContainer } from "components/upper-button/upper-button";
import { PostItemsViewModel, SocialSummary } from "gv-api-web";
import { SocialPageDownloadsBlock } from "pages/social/social/social-page-downloads/social-page-downloads.block";
import { SocialPageFeedBlock } from "pages/social/social/social-page-feed/social-page-feed.block";
import { SocialPageGainersBlock } from "pages/social/social/social-page-gainers/social-page-gainers.block";
import { SocialPageTopicsBlock } from "pages/social/social/social-page-topics/social-page-topics.block";
import { SocialPageTradersBlock } from "pages/social/social/social-page-traders/social-page-traders.block";
import {
  SocialPageFeedContainer,
  SocialPageLeftBlock,
  SocialPageRightBlock,
  SocialPageStyledContainer
} from "pages/social/social/social-page.styles";
import React from "react";

interface Props {
  initFeedData?: PostItemsViewModel;
  data: SocialSummary;
}

export const SocialPageContainer: React.FC<Props> = ({
  data,
  initFeedData
}) => {
  return (
    <>
      <SocialPageStyledContainer center={false}>
        <ResponsiveContainer
          enabledScreens={["landscape-tablet", "desktop", "large-desktop"]}
        >
          <SocialPageLeftBlock>
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
          </SocialPageLeftBlock>
        </ResponsiveContainer>
        <SocialPageFeedContainer>
          <SocialPageFeedBlock initData={initFeedData} />
        </SocialPageFeedContainer>
        <ResponsiveContainer enabledScreens={["large-desktop", "desktop"]}>
          <SocialPageRightBlock>
            <Row>
              <SocialPageTopicsBlock topics={data?.hotTopics} />
            </Row>
            <Row>
              <SocialPageDownloadsBlock />
            </Row>
          </SocialPageRightBlock>
        </ResponsiveContainer>
      </SocialPageStyledContainer>
      <ResponsiveContainer
        enabledScreens={["phone", "landscape-phone", "tablet"]}
      >
        <UpperButtonContainer />
      </ResponsiveContainer>
    </>
  );
};
