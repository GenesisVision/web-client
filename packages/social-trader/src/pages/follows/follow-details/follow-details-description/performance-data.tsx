import * as React from "react";
import { useTranslation } from "react-i18next";
import Leverage from "shared/components/leverage/leverage";
import PieContainerSmall from "shared/components/pie-container/pie-container-small";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import filesService from "shared/services/file-service";

import { FollowDetailsDataType } from "../follow-details.types";

const _PerformanceData: React.FC<Props> = ({ description }) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList className="asset-details-description__performance-data">
      <StatisticItem label={t("program-details-page.description.broker")}>
        <img
          className={"asset-details-description__broker"}
          src={filesService.getFileUrl(description.brokerDetails.logo)}
        />
      </StatisticItem>
      <StatisticItem label={t("program-details-page.description.currency")}>
        {description.currency}
      </StatisticItem>
    </StatisticItemList>
  );
};

interface Props {
  description: FollowDetailsDataType;
}

const PerformanceData = React.memo(_PerformanceData);
export default PerformanceData;
