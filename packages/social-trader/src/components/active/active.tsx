import "./active.scss";

import { CurrencyItem } from "components/currency-item/currency-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import { AssetInfo } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// @ts-ignore
import TradingViewWidget, { Themes } from "react-tradingview-widget";

import SocialLinksBlock from "../social-links-block/social-links-block";
import TagItemList from "../tags/tag-item/tag-item-list";

const _Active: React.FC<Props> = ({
  data: { name, description, tags, chartSymbol, logo, socialLinks }
}) => {
  const [isServer, setIsServer] = useState(typeof window === "undefined");
  const [t] = useTranslation();
  useEffect(() => {
    if (typeof window === "undefined") setIsServer(true);
    else setIsServer(false);
  }, [window]);
  return (
    <div>
      <div className="active__block">
        <CurrencyItem logo={logo} name={name} clickable={false} big />
      </div>
      <div className="active__block active__tags">
        {tags && <TagItemList tags={tags} />}
      </div>
      <div className="active__block">
        <h2 className="active__title">{t("active.chart")}</h2>
        <div className="active__chart-container">
          {!isServer && (
            <TradingViewWidget
              symbol={chartSymbol}
              autosize
              theme={Themes.DARK}
            />
          )}
        </div>
      </div>
      <div className="active__block">
        <h2 className="active__title">
          {t("active.about")} {name}
        </h2>
        <div className="active__description">{description}</div>
      </div>
      <div className="active__block">
        {socialLinks && <SocialLinksBlock socialLinks={socialLinks} />}
      </div>
    </div>
  );
};

interface Props {
  data: AssetInfo;
}

const Active = withBlurLoader(React.memo(_Active));
export default Active;
