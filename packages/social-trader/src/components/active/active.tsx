import "./active.scss";

import { ChartWidget } from "components/active/chart-widget";
import { CurrencyItem } from "components/currency-item/currency-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import { AssetInfo } from "gv-api-web";
import { useAmp } from "next/amp";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";

import SocialLinksBlock from "../social-links-block/social-links-block";
import TagItemList from "../tags/tag-item/tag-item-list";

const _Active: React.FC<Props> = ({
  data: { name, description, tags, chartSymbol, logo, socialLinks }
}) => {
  const [t] = useTranslation();
  const isAmp = useAmp();
  return (
    <>
      {isAmp && (
        <Head>
          <style amp-custom={true}>
            {`
            .active__block {
              padding-bottom: 30px;
            }
            .active__title {
              padding-bottom: 10px;
            }
          `}
          </style>
        </Head>
      )}
      <div>
        <div className="active__block">
          <CurrencyItem
            ampProps={{ width: 50, height: 50 }}
            logo={logo}
            name={name}
            clickable={false}
            big
          />
        </div>
        {tags && !isAmp && (
          <div className="active__block active__tags">
            <TagItemList tags={tags} />
          </div>
        )}
        {!isAmp && (
          <div className="active__block">
            <h2 className="active__title">{t("active.chart")}</h2>
            <div className="active__chart-container">
              <ChartWidget chartSymbol={chartSymbol} />
            </div>
          </div>
        )}
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
    </>
  );
};

interface Props {
  data: AssetInfo;
}

const Active = withBlurLoader(React.memo(_Active));
export default Active;
