import "shared/components/details/details.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import DetailsFavorite from "shared/components/details/details-description-section/details-description/controls/details-favorite";
import DetailsNotification from "shared/components/details/details-description-section/details-description/controls/details-notification";
import DetailsChartLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import DetailsStatisticsLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-statistic-loader";
import GVButton from "shared/components/gv-button";
import Page from "shared/components/page/page";
import StatisticItemLoader from "shared/components/statistic-item/statistic-item.loader";
import Surface from "shared/components/surface/surface";
import SvgLoader from "shared/components/svg-loader/svg-loader";

import SocialLinksBlockLoader from "../social-links-block/social-links-block.loader";

const _DetailsContainerLoader: React.FC<
  { assets?: boolean } & WithTranslation
> = ({ t, assets }) => (
  <Page title={""}>
    <div className="details">
      <div className="details__section">
        <div className="program-details-description">
          <div className="program-details-description__main">
            <div className="program-details-description__avatar">
              <div style={{ width: 120 }}>
                <SvgLoader height={120} width={120}>
                  <rect x="0" y="0" rx="8" ry="8" width="120" height="120" />
                </SvgLoader>
              </div>
            </div>
            <div className="program-details-description__info">
              <h1 className="title-small-padding">
                <div style={{ width: 100 }}>
                  <SvgLoader height={32} width={100}>
                    <rect x="0" y="0" rx="10" ry="10" width="100" height="32" />
                  </SvgLoader>
                </div>
              </h1>
              <GVButton
                variant="text"
                className="program-details-description__author-btn"
              >
                <div style={{ width: 150 }}>
                  <SvgLoader height={13} width={150}>
                    <rect x="0" y="0" rx="5" ry="5" width="150" height="13" />
                  </SvgLoader>
                </div>
              </GVButton>
              <SocialLinksBlockLoader />
              {assets && (
                <div className="details-description__info-block">
                  <h4 className="details-description__subheading">
                    {t("fund-details-page.description.assets")}
                  </h4>
                  <div style={{ width: 470 }}>
                    <SvgLoader height={40} width={470}>
                      <rect x="0" y="0" rx="8" ry="8" width="150" height="40" />
                      <rect
                        x="160"
                        y="0"
                        rx="8"
                        ry="8"
                        width="150"
                        height="40"
                      />
                      <rect
                        x="320"
                        y="0"
                        rx="8"
                        ry="8"
                        width="150"
                        height="40"
                      />
                    </SvgLoader>
                  </div>
                </div>
              )}
              <h4 className="program-details-description__subheading">
                {t("fund-details-page.description.strategy")}
              </h4>
              <div
                className="program-details-description__text"
                style={{ width: 250 }}
              >
                <SvgLoader height={65} width={250}>
                  <rect x="0" y="0" rx="5" ry="5" width="80" height="13" />
                  <rect x="90" y="0" rx="5" ry="5" width="100" height="13" />
                  <rect x="200" y="0" rx="5" ry="5" width="50" height="13" />

                  <rect x="0" y="26" rx="5" ry="5" width="50" height="13" />
                  <rect x="60" y="26" rx="5" ry="5" width="80" height="13" />
                  <rect x="150" y="26" rx="5" ry="5" width="100" height="13" />

                  <rect x="0" y="52" rx="5" ry="5" width="100" height="13" />
                  <rect x="110" y="52" rx="5" ry="5" width="50" height="13" />
                  <rect x="170" y="52" rx="5" ry="5" width="80" height="13" />
                </SvgLoader>
              </div>
            </div>
            <div className="program-details-description__settings">
              <DetailsFavorite id={""} isFavorite={false} />
              <DetailsNotification
                title={""}
                url={""}
                hasNotifications={false}
              />
            </div>
          </div>
          <ProgramControlsLoader />
        </div>
      </div>
      <div className="details__section">
        <div className="details-statistic-section">
          <div className="details-statistic-section__statistic">
            <Surface className="surface--horizontal-paddings details-statistics">
              <h3>{t("program-details-page.statistics.heading")}</h3>
              <DetailsStatisticsLoader />
            </Surface>
          </div>
          <div className="details-statistic-section__chart">
            <Surface className="surface--horizontal-paddings details-chart">
              <h3>{t("program-details-page.chart.heading")}</h3>
              <DetailsChartLoader />
            </Surface>
          </div>
        </div>
      </div>
      <div className="details__history" />
    </div>
  </Page>
);

export const ProgramControlsLoader = () => (
  <div className="program-details-description__controls">
    <div className="program-details-description__col">
      <div className="program-details-description__statistic-container">
        <StatisticItemLoader className="program-details-description__short-statistic-item" />
        <StatisticItemLoader className="program-details-description__short-statistic-item" />
        <StatisticItemLoader className="program-details-description__short-statistic-item" />
        <StatisticItemLoader className="program-details-description__short-statistic-item" />
      </div>
      <div className="program-details-description__button-container">
        <GVButton className="program-details-description__invest-btn">
          ...
        </GVButton>
      </div>
    </div>
  </div>
);

const DetailsContainerLoader = translate()(React.memo(_DetailsContainerLoader));
export default DetailsContainerLoader;
