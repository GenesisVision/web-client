import "./active.scss";

import * as faker from "faker";
import { SocialLinkViewModelTypeEnum } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { CurrencyItem } from "shared/components/currency-item/currency-item";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

import SocialLinksBlock from "../social-links-block/social-links-block";
import TagItemList from "../tags/tag-item/tag-item-list";

const SocialLinksMock = {
  url: "",
  logo: "",
  name: "",
  value: "",
  type: "Undefined" as SocialLinkViewModelTypeEnum
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
  const [t] = useTranslation();
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
        <div className="active__title">{t("active.chart.title")}</div>
        <div className="active__chart-container">
          <TradingViewWidget symbol={name} autosize theme={Themes.DARK} />
        </div>
      </div>
      <div className="active__block">
        <div className="active__title">
          {t("active.about.title")} {name}
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
