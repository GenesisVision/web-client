import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import {
  FeedContext,
  SocialSearchInitialState
} from "pages/social/social/feed.context";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

import styles from "./social-page-topics.module.scss";

interface Props {
  hashTag: string;
  impressionsCount: number;
  discussCount: number;
}

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
    <div className={styles["social-page-topics__item"]}>
      <Row onClick={handleClick}>{hashTag}</Row>
      <Row size={"small"}>
        <RowItem wide>
          <LabeledValue label={t("View")}>{impressionsCount}</LabeledValue>
        </RowItem>
        <RowItem wide>
          <LabeledValue label={t("Discuss")}>{discussCount}</LabeledValue>
        </RowItem>
      </Row>
    </div>
  );
};

export const SocialPageTopicsItem = React.memo(_SocialPageTopicsItem);
