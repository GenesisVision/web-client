import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import { SocialSearchContext } from "pages/social/social/social-page.context";
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
  const { searchValue, setSearchValue } = useContext(SocialSearchContext);

  const handleClick = useCallback(() => {
    const hashTags = searchValue.hashTags.includes(hashTag)
      ? searchValue.hashTags
      : [...searchValue.hashTags, hashTag];
    setSearchValue({
      ...searchValue,
      hashTags
    });
  }, [searchValue, hashTag]);
  return (
    <div className={styles["social-page-topics__item"]}>
      <Row onClick={handleClick}>{hashTag}</Row>
      <Row small>
        <RowItem wide>
          <StatisticItemInner label={t("View")}>
            {impressionsCount}
          </StatisticItemInner>
        </RowItem>
        <RowItem wide>
          <StatisticItemInner label={t("Discuss")}>
            {discussCount}
          </StatisticItemInner>
        </RowItem>
      </Row>
    </div>
  );
};

export const SocialPageTopicsItem = React.memo(_SocialPageTopicsItem);
