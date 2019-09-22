import "shared/components/details/details.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import DetailsChartLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import GVButton from "shared/components/gv-button";
import Page from "shared/components/page/page";
import { PerformanceDataTextLoader } from "shared/components/programs/program-details/program-details-description/performance-data";

import StatisticItemTextLoader from "../statistic-item/statistic-item.txt-loader";
import DetailsBlock, { DETAILS_BLOCK_TYPE } from "./details-block";
import DetailsDescriptionTextLoader from "./details-description-section/details-description/details-description.txt-loader";
import DetailsStatisticsTextLoader from "./details-description-section/details-statistic-section/details-loader/details-statistic.txt-loader";

const _DetailsContainerTextLoader: React.FC<{ assets?: boolean }> = ({
  assets
}) => {
  const [t] = useTranslation();
  return (
    <Page title={""}>
      <div className="details__section asset-details-description">
        <DetailsDescriptionTextLoader assets={assets} />
        <PerformanceDataTextLoader />
        <ProgramControlsTextLoader />
      </div>
      <div className="details__divider" />
      <div className="details-statistic-section">
        <DetailsBlock horizontalPaddings className="details-statistics">
          <h3>{t("program-details-page.statistics.heading")}</h3>
          <DetailsStatisticsTextLoader />
        </DetailsBlock>
        <DetailsBlock horizontalPaddings className="details-chart">
          <h3>{t("program-details-page.chart.heading")}</h3>
          <DetailsChartLoader />
        </DetailsBlock>
      </div>
      <DetailsBlock table />
    </Page>
  );
};

export const ProgramControlsTextLoader = React.memo(() => (
  <div className="asset-details-description__controls">
    <DetailsBlock
      type={DETAILS_BLOCK_TYPE.BORDERED}
      className="asset-details-description__col"
    >
      <div className="asset-details-description__statistic-container">
        <StatisticItemTextLoader className="asset-details-description__short-statistic-item" />
        <StatisticItemTextLoader className="asset-details-description__short-statistic-item" />
      </div>
      <div className="asset-details-description__statistic-container">
        <StatisticItemTextLoader className="asset-details-description__short-statistic-item" />
        <StatisticItemTextLoader className="asset-details-description__short-statistic-item" />
      </div>
      <div className="asset-details-description__button-container">
        <GVButton className="asset-details-description__invest-btn">
          Invest
        </GVButton>
      </div>
    </DetailsBlock>
  </div>
));

const DetailsContainerTextLoader = React.memo(_DetailsContainerTextLoader);
export default DetailsContainerTextLoader;
