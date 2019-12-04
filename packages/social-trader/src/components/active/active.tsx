import "./active.scss";

import { CurrencyItem } from "components/currency-item/currency-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import * as faker from "faker";
import { SocialLinkType } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// @ts-ignore
import TradingViewWidget, { Themes } from "react-tradingview-widget";

import SocialLinksBlock from "../social-links-block/social-links-block";
import TagItemList from "../tags/tag-item/tag-item-list";

const SocialLinksMock = {
  url: "",
  logo: "",
  name: "",
  value: "",
  type: "Undefined" as SocialLinkType
};
const SocialLinksMocks = Array(5)
  .fill("")
  .map(() => SocialLinksMock);

const getTagMock = () => ({
  name: faker.lorem.word(),
  color: "#f0f0f0"
});
const tagMocks = Array(5)
  .fill("")
  .map(getTagMock);

const _Active: React.FC<Props> = ({ data: { name, rate, about, tags } }) => {
  const [isServer, setIsServer] = useState(typeof window === "undefined");
  const [t] = useTranslation();
  useEffect(() => {
    if (typeof window === "undefined") setIsServer(true);
    else setIsServer(false);
  }, [window]);
  return (
    <div>
      <div className="active__block">
        <CurrencyItem
          logo={""}
          name={name}
          rate={10245}
          clickable={false}
          big
        />
      </div>
      <div className="active__block active__tags">
        <TagItemList tags={tagMocks} />
      </div>
      <div className="active__block">
        <div className="active__title">{t("active.chart")}</div>
        <div className="active__chart-container">
          {!isServer && (
            <TradingViewWidget
              symbol={`${name}USD`}
              autosize
              theme={Themes.DARK}
            />
          )}
        </div>
      </div>
      <div className="active__block">
        <div className="active__title">
          {t("active.about")} {name}
        </div>
        <div>{about}</div>
      </div>
      <div className="active__block">
        <SocialLinksBlock socialLinks={SocialLinksMocks} />
      </div>
    </div>
  );
};

interface Props {
  data: any;
}

const Active = withBlurLoader(React.memo(_Active));
export default Active;
