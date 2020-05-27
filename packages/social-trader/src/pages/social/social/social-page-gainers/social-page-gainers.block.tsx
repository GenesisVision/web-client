import { DefaultBlock } from "components/default.block/default.block";
import { Row } from "components/row/row";
import { Separator } from "components/separator/separator";
import { PlatformAsset, SocialPostPlatformAsset } from "gv-api-web";
import { SocialPageGainersItem } from "pages/social/social/social-page-gainers/social-page-gainers-item";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./social-page-gainers.module.scss";

interface Props {
  assets: SocialPostPlatformAsset[];
}

const _SocialPageGainersBlock: React.FC<Props> = ({ assets }) => {
  const [t] = useTranslation();
  return (
    <DefaultBlock wide solid>
      <Row>
        <h2>{t("Gainers")}</h2>
      </Row>
      <Row large onlyOffset className={styles["social-page-gainers"]}>
        {assets.map(({ asset, price, change24Percent }) => (
          <>
            <Row>
              <SocialPageGainersItem
                title={asset}
                price={price}
                change={change24Percent}
              />
            </Row>
            <Row>
              <Separator />
            </Row>
          </>
        ))}
      </Row>
    </DefaultBlock>
  );
};

export const SocialPageGainersBlock = React.memo(_SocialPageGainersBlock);
