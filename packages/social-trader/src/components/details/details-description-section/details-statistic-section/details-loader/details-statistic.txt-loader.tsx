import StatisticItemTextLoader from "components/statistic-item/statistic-item.txt-loader";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _DetailsStatisticsTextLoader: React.FC = () => {
  const [t] = useTranslation();
  return (
    <>
      <div className="details-statistics__subheading">
        {t("fund-details-page.statistics.current")}
      </div>
      <div className="details-statistics__particular-information details-statistics__particular-information--current">
        <div className="details-statistics__vertical-info-block">
          <StatisticItemTextLoader />
          <StatisticItemTextLoader />
        </div>
        <div className="details-statistics__vertical-info-block">
          <StatisticItemTextLoader />
        </div>
      </div>
      <div className="details-statistics__subheading">
        {t("fund-details-page.statistics.for")} {t(`chart-period.month`)}
      </div>
      <div className="details-statistics__particular-information">
        <div className="details-statistics__column">
          <StatisticItemTextLoader />
          <StatisticItemTextLoader />
          <StatisticItemTextLoader />
        </div>
        <div className="details-statistics__column">
          <StatisticItemTextLoader />
          <StatisticItemTextLoader />
        </div>
      </div>
    </>
  );
};

const DetailsStatisticsTextLoader = React.memo(_DetailsStatisticsTextLoader);
export default DetailsStatisticsTextLoader;
