import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";

import { FollowDetailsDataType } from "../follow-details.types";

interface ISignalProgramInfoProps {
  description: FollowDetailsDataType;
}

const _SignalInfo: React.FC<ISignalProgramInfoProps> = ({ description }) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList>
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t(
              "program-details-page.tooltip.success-fee-signal"
            )}
            labelText={t("program-details-page.description.successFee")}
          />
        }
        className="asset-details-description__short-statistic-item"
        accent
      >
        <NumberFormat
          value={description.signalSuccessFee}
          displayType="text"
          suffix=" %"
        />
      </StatisticItem>
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t("program-details-page.tooltip.volume-fee")}
            labelText={t("program-details-page.description.volume-fee")}
          />
        }
        className="asset-details-description__short-statistic-item"
        accent
      >
        <NumberFormat
          value={description.signalVolumeFee}
          displayType="text"
          suffix=" %"
        />
      </StatisticItem>
    </StatisticItemList>
  );
};

const SignalInfo = React.memo(_SignalInfo);
export default SignalInfo; // TODO refactor
