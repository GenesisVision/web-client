import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import Link, { ToType } from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import {
  SocialSearchContext,
  SocialSearchInitialState
} from "pages/social/social/social-page.context";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

import styles from "./social-page-traders.module.scss";

interface Props {
  color: string;
  id: string;
  investorsCount: number;
  profit: number;
  url: string | ToType;
  logoUrl: string;
  title: string;
}

const _SocialPageTradersItem: React.FC<Props> = ({
  color,
  id,
  investorsCount,
  profit,
  url,
  logoUrl,
  title
}) => {
  const [t] = useTranslation();
  const { setSearchValue } = useContext(SocialSearchContext);

  const handleClick = useCallback(() => {
    setSearchValue({
      ...SocialSearchInitialState,
      tagContent: [{ id, name: title }]
    });
  }, [url]);
  return (
    <div className={styles["social-page-traders__item"]}>
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
        <RowItem
          onClick={handleClick}
          className={styles["social-page-traders__avatar-name"]}
        >
          {title}
        </RowItem>
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
