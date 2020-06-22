import { DetailsPerformanceData } from "components/details/details-description-section/details-description/details-structure-blocks";
import StatisticItem from "components/statistic-item/statistic-item";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/dates";

import { AccountDetailsDataType } from "../account-details.types";

const _PerformanceData: React.FC<Props> = ({
  description: {
    publicInfo: { creationDate },
    tradingAccountInfo: { leverage, currency }
  }
}) => {
  const [t] = useTranslation();
  return (
    <DetailsPerformanceData>
      <StatisticItem
        condition={!!leverage}
        label={t("asset-details.description.leverage")}
      >
        {leverage}
      </StatisticItem>
      <StatisticItem
        condition={!!currency}
        label={t("asset-details.description.currency")}
      >
        {currency}
      </StatisticItem>
      <StatisticItem label={t("asset-details.description.creation-date")}>
        {formatDate(creationDate)}
      </StatisticItem>
    </DetailsPerformanceData>
  );
};

interface Props {
  description: AccountDetailsDataType;
}

const PerformanceData = React.memo(_PerformanceData);
export default PerformanceData;
