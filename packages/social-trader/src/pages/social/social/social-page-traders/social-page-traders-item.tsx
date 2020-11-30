import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { LabeledValue } from "components/labeled-value/labeled-value";
import Link, { ToType } from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { AssetType } from "gv-api-web";
import {
  FeedContext,
  SocialSearchInitialState
} from "pages/social/social/feed.context";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  assetType: AssetType;
  color: string;
  id: string;
  subscribersCount: number;
  investorsCount: number;
  profit: number;
  url: string | ToType;
  logoUrl: string;
  title: string;
}

const Container = styled.div`
  width: 100%;
`;

const _SocialPageTradersItem: React.FC<Props> = ({
  subscribersCount,
  assetType,
  color,
  id,
  investorsCount,
  profit,
  url,
  logoUrl,
  title
}) => {
  const [t] = useTranslation();
  const { setSearchValue } = useContext(FeedContext);

  const handleClick = useCallback(() => {
    setSearchValue({
      ...SocialSearchInitialState,
      tagContent: [{ id, name: title }]
    });
  }, [url]);
  return (
    <Container>
      <Row>
        <RowItem>
          <Link to={url}>
            <AssetAvatar
              color={color}
              size={"xsmall"}
              url={logoUrl}
              alt={title}
            />
          </Link>
        </RowItem>
        <RowItem onClick={handleClick}>
          <Text>{title}</Text>
        </RowItem>
      </Row>
      <Row>
        <RowItem wide>
          <LabeledValue label={t("Profit")}>
            <Text wrap={false}>{profit} %</Text>
          </LabeledValue>
        </RowItem>
        <RowItem wide>
          {assetType === "Follow" ? (
            <LabeledValue label={t("Subscribers")}>
              {subscribersCount}
            </LabeledValue>
          ) : (
            <LabeledValue label={t("Investors")}>{investorsCount}</LabeledValue>
          )}
        </RowItem>
      </Row>
    </Container>
  );
};

export const SocialPageTradersItem = React.memo(_SocialPageTradersItem);
