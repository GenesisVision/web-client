import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import {
  FeedContext,
  SocialSearchInitialState
} from "pages/social/social/feed.context";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  hashTag: string;
  impressionsCount: number;
  discussCount: number;
}

const Container = styled.div`
  width: 100%;
`;

const _SocialPageTopicsItem: React.FC<Props> = ({
  hashTag,
  impressionsCount,
  discussCount
}) => {
  const [t] = useTranslation();
  const { setSearchValue } = useContext(FeedContext);

  const handleClick = useCallback(() => {
    const hashTags = [hashTag];
    setSearchValue({
      ...SocialSearchInitialState,
      hashTags
    });
  }, [hashTag]);
  return (
    <Container>
      <Row onClick={handleClick}>{hashTag}</Row>
      <Row size={"small"}>
        <RowItem wide>
          <LabeledValue label={t("View")}>{impressionsCount}</LabeledValue>
        </RowItem>
        <RowItem wide>
          <LabeledValue label={t("Discuss")}>{discussCount}</LabeledValue>
        </RowItem>
      </Row>
    </Container>
  );
};

export const SocialPageTopicsItem = React.memo(_SocialPageTopicsItem);
