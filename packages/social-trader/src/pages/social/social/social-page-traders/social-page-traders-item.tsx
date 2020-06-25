import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
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
  url: string;
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
        <AvatarWithName
          className={styles["social-page-traders__avatar-name"]}
          onClick={handleClick}
          avatar={
            <AssetAvatar
              color={color}
              size={"xsmall"}
              url={logoUrl}
              alt={title}
            />
          }
          name={title}
        />
      </Row>
      <Row>
        <RowItem wide>
          <LabeledValue label={t("Profit")}>{profit} %</LabeledValue>
        </RowItem>
        <RowItem wide>
          <LabeledValue label={t("Investors")}>{investorsCount}</LabeledValue>
        </RowItem>
      </Row>
    </div>
  );
};

export const SocialPageTradersItem = React.memo(_SocialPageTradersItem);
