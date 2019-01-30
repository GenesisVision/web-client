import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import React from "react";
import { translate } from "react-i18next";
import DetailsStatisticsLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-statistic-loader";
import Surface from "shared/components/surface/surface";

import FundDetailsStatisticsElements from "./fund-details-statistics-elements";

const FundDetailsStatistics = ({ t, statistic, period }) => {
  return (
    <Surface className="surface--horizontal-paddings details-statistics">
      <h3>{t("fund-details-page.statistics.heading")}</h3>
      {!statistic ? (
        <DetailsStatisticsLoader />
      ) : (
        <FundDetailsStatisticsElements statistic={statistic} period={period} />
      )}
    </Surface>
  );
};

export default translate()(FundDetailsStatistics);
