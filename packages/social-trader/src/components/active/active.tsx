import { CurrencyItem } from "components/currency-item/currency-item";
import { Row } from "components/row/row";
import TradingViewWidget, {
  Themes
} from "components/trading-view/trading-view";
import { withBlurLoader } from "decorators/with-blur-loader";
import { AssetInfo } from "gv-api-web";
import { useNetworkStatusInWindow } from "hooks/network-status";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import SocialLinksBlock from "../social-links-block/social-links-block";
import TagItemList from "../tags/tag-item/tag-item-list";
import styles from "./active.module.scss";

interface Props {
  data: AssetInfo;
}

const _Active: React.FC<Props> = ({
  data: { name, description, tags, chartSymbol, logoUrl, socialLinks }
}) => {
  const { effectiveConnectionType } = useNetworkStatusInWindow();
  const [isServer, setIsServer] = useState(true);
  const [t] = useTranslation();
  useEffect(() => {
    setIsServer(false);
  }, []);
  const isGoodNetwork = effectiveConnectionType === "4g";
  return (
    <div>
      <Row size={"large"}>
        <CurrencyItem logo={logoUrl} name={name} clickable={false} big />
      </Row>
      <Row size={"large"}>{tags && <TagItemList tags={tags} />}</Row>
      <Row size={"large"} onlyOffset>
        <Row>
          <h2 className={styles.active__title}>{t("active.chart")}</h2>
        </Row>
        <Row className={styles.active__chart_container}>
          {!isServer && isGoodNetwork && (
            <TradingViewWidget
              symbol={chartSymbol}
              autosize
              theme={Themes.DARK}
            />
          )}
        </Row>
      </Row>
      <Row size={"large"} onlyOffset>
        <Row>
          <h2 className={styles.active__title}>
            {t("active.about")} {name}
          </h2>
        </Row>
        <Row className={styles.active__description}>{description}</Row>
      </Row>
      <Row size={"large"}>
        {socialLinks && <SocialLinksBlock socialLinks={socialLinks} />}
      </Row>
    </div>
  );
};

const Active = withBlurLoader(React.memo(_Active));
export default Active;
