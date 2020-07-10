import { DefaultBlock } from "components/default.block/default.block";
import { useToLink } from "components/link/link.helper";
import { Row } from "components/row/row";
import { Separator } from "components/separator/separator";
import { SocialSummaryStrategy } from "gv-api-web";
import { getAssetFolderRoute } from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import { SocialPageTradersItem } from "pages/social/social/social-page-traders/social-page-traders-item";
import React from "react";
import { useTranslation } from "react-i18next";
import { composeAssetDetailsUrl } from "utils/compose-url";

import styles from "./social-page-traders.module.scss";

interface Props {
  assets: SocialSummaryStrategy[];
}

const _SocialPageTradersBlock: React.FC<Props> = ({ assets }) => {
  const [t] = useTranslation();
  const { linkCreator } = useToLink();
  return (
    <DefaultBlock wide solid>
      <Row>
        <h3>{t("Top strategies")}</h3>
      </Row>
      <Row size={"large"} onlyOffset className={styles["social-page-traders"]}>
        {assets.map(
          (
            {
              assetType,
              color,
              id,
              investorsCount,
              profitPercent,
              url,
              logoUrl,
              title
            },
            index
          ) => {
            const detailsLink = linkCreator(
              composeAssetDetailsUrl(assetType, url),
              getAssetFolderRoute(assetType)
            );
            return (
              <>
                <Row>
                  <SocialPageTradersItem
                    color={color}
                    id={id}
                    investorsCount={investorsCount}
                    profit={profitPercent}
                    url={detailsLink}
                    logoUrl={logoUrl}
                    title={title}
                  />
                </Row>
                {index !== assets.length - 1 && (
                  <Row>
                    <Separator />
                  </Row>
                )}
              </>
            );
          }
        )}
      </Row>
    </DefaultBlock>
  );
};

export const SocialPageTradersBlock = React.memo(_SocialPageTradersBlock);
