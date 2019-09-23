import "shared/components/details/details.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import DetailsChartLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import DetailsStatisticsLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-statistic-loader";
import GVButton from "shared/components/gv-button";
import Page from "shared/components/page/page";
import { PerformanceDataLoader } from "shared/components/programs/program-details/program-details-description/performance-data";
import StatisticItemLoader from "shared/components/statistic-item/statistic-item.loader";

import DetailsBlock, { DETAILS_BLOCK_TYPE } from "./details-block";
import DetailsDescriptionLoader from "./details-description-section/details-description/details-description.loader";

const _DetailsContainerLoader: React.FC<
  { assets?: boolean } & WithTranslation
> = ({ t, assets }) => (
  <Page title={""}>
    <div className="details__section asset-details-description">
      <DetailsDescriptionLoader assets={assets} />
      <PerformanceDataLoader />
      <ProgramControlsLoader />
    </div>
    <div className="details__divider" />
    <div className="details-statistic-section">
      <DetailsBlock horizontalPaddings className="details-statistics">
        <h3>{t("program-details-page.statistics.heading")}</h3>
        <DetailsStatisticsLoader />
      </DetailsBlock>
      <DetailsBlock horizontalPaddings className="details-chart">
        <h3>{t("program-details-page.chart.heading")}</h3>
        <DetailsChartLoader />
      </DetailsBlock>
    </div>
    <DetailsBlock table />
  </Page>
);

export const ProgramControlsLoader = () => (
  <div className="asset-details-description__controls">
    <DetailsBlock
      type={DETAILS_BLOCK_TYPE.BORDERED}
      className="asset-details-description__col"
    >
      <div className="asset-details-description__statistic-container">
        <StatisticItemLoader className="asset-details-description__short-statistic-item" />
        <StatisticItemLoader className="asset-details-description__short-statistic-item" />
        <StatisticItemLoader className="asset-details-description__short-statistic-item" />
        <StatisticItemLoader className="asset-details-description__short-statistic-item" />
      </div>
      <div className="asset-details-description__button-container">
        <GVButton className="asset-details-description__invest-btn">
          ...
        </GVButton>
      </div>
    </DetailsBlock>
  </div>
);

const DetailsContainerLoader = translate()(React.memo(_DetailsContainerLoader));
export default DetailsContainerLoader;
