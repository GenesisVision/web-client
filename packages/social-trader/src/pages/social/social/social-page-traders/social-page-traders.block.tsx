import { DefaultBlock } from "components/default.block/default.block";
import { Row } from "components/row/row";
import { Separator } from "components/separator/separator";
import { SocialSummaryStrategy } from "gv-api-web";
import { SocialPageTradersItem } from "pages/social/social/social-page-traders/social-page-traders-item";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./social-page-traders.module.scss";

interface Props {
  assets: SocialSummaryStrategy[];
}

const _SocialPageTradersBlock: React.FC<Props> = ({ assets }) => {
  const [t] = useTranslation();
  return (
    <DefaultBlock wide solid>
      <Row>
        <h2>{t("Top strategies")}</h2>
      </Row>
      <Row large onlyOffset className={styles["social-page-traders"]}>
        {assets.map(
          (
            { id, investorsCount, profitPercent, url, logoUrl, title },
            index
          ) => (
            <>
              <Row>
                <SocialPageTradersItem
                  id={id}
                  investorsCount={investorsCount}
                  profit={profitPercent}
                  url={url}
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
          )
        )}
      </Row>
    </DefaultBlock>
  );
};

export const SocialPageTradersBlock = React.memo(_SocialPageTradersBlock);
