import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import { SocialSearchContext } from "pages/social/social/social-page.context";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

import styles from "./social-page-traders.module.scss";

interface Props {
  id: string;
  investorsCount: number;
  profit: number;
  url: string;
  logoUrl: string;
  title: string;
}

const _SocialPageTradersItem: React.FC<Props> = ({
  id,
  investorsCount,
  profit,
  url,
  logoUrl,
  title
}) => {
  const [t] = useTranslation();
  const { searchValue, setSearchValue } = useContext(SocialSearchContext);

  const handleClick = useCallback(() => {
    setSearchValue({
      ...searchValue,
      tagContent: [...searchValue.tagContent, { id, name: title }]
    });
  }, [searchValue, url]);
  return (
    <div className={styles["social-page-traders__item"]}>
      <Row>
        <AvatarWithName
          className={styles["social-page-traders__avatar-name"]}
          onClick={handleClick}
          avatar={<AssetAvatar size={"xsmall"} url={logoUrl} alt={title} />}
          name={title}
        />
      </Row>
      <Row>
        <RowItem wide>
          <StatisticItemInner label={t("Profit")}>
            {profit} %
          </StatisticItemInner>
        </RowItem>
        <RowItem wide>
          <StatisticItemInner label={t("Investors")}>
            {investorsCount}
          </StatisticItemInner>
        </RowItem>
      </Row>
    </div>
  );
};

export const SocialPageTradersItem = React.memo(_SocialPageTradersItem);
