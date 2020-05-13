import ImageBaseElement from "components/avatar/image-base.element";
import {
  DetailsBroker,
  DetailsPerformanceData
} from "components/details/details-description-section/details-description/details-structure-blocks";
import StatisticItem from "components/statistic-item/statistic-item";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { FollowDetailsDataType } from "../follow-details.types";

const _PerformanceData: React.FC<Props> = ({ description }) => {
  const [t] = useTranslation();
  return (
    <DetailsPerformanceData>
      <StatisticItem label={t("program-details-page.description.broker")}>
        <DetailsBroker
          name={"broker"}
          logoUrl={description.brokerDetails.logoUrl}
        />
      </StatisticItem>
      <StatisticItem label={t("program-details-page.description.currency")}>
        {description.currency}
      </StatisticItem>
    </DetailsPerformanceData>
  );
};

interface Props {
  description: FollowDetailsDataType;
}

const PerformanceData = React.memo(_PerformanceData);
export default PerformanceData;
