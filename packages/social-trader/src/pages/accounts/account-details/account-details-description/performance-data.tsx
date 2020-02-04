import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
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
    <StatisticItemList className="asset-details-description__performance-data">
      <StatisticItem
        condition={!!leverage}
        label={t("program-details-page.description.leverage")}
      >
        {leverage}
      </StatisticItem>
      <StatisticItem
        condition={!!currency}
        label={t("program-details-page.description.currency")}
      >
        {currency}
      </StatisticItem>
      <StatisticItem
        label={t("program-details-page.description.creation-date")}
      >
        {formatDate(creationDate)}
      </StatisticItem>
    </StatisticItemList>
  );
};

interface Props {
  description: AccountDetailsDataType;
}

const PerformanceData = React.memo(_PerformanceData);
export default PerformanceData;
