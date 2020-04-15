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
import "./active.scss";

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
      <Row large>
        <CurrencyItem logo={logoUrl} name={name} clickable={false} big />
      </Row>
      <Row large>{tags && <TagItemList tags={tags} />}</Row>
      <Row large onlyOffset>
        <Row>
          <h2 className="active__title">{t("active.chart")}</h2>
        </Row>
        <Row className="active__chart-container">
          {!isServer && isGoodNetwork && (
            <TradingViewWidget
              symbol={chartSymbol}
              autosize
              theme={Themes.DARK}
            />
          )}
        </Row>
      </Row>
      <Row large onlyOffset>
        <Row>
          <h2 className="active__title">
            {t("active.about")} {name}
          </h2>
        </Row>
        <Row className="active__description">{description}</Row>
      </Row>
      <Row large>
        {socialLinks && <SocialLinksBlock socialLinks={socialLinks} />}
      </Row>
    </div>
  );
};

interface Props {
  data: AssetInfo;
}

const Active = withBlurLoader(React.memo(_Active));
export default Active;
