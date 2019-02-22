import React, { FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";

interface ISignalProgramInfoProps {
  programDescription: any;
}

const SignalProgramInfo: FunctionComponent<
  InjectedTranslateProps & ISignalProgramInfoProps
> = ({ t, programDescription }) => {
  return (
    <div className="program-details-description__statistic-container">
      <StatisticItem
        label={t("program-details-page.description.successFee")}
        className="program-details-description__short-statistic-item"
        accent
      >
        <NumberFormat
          value={formatValue(programDescription.signalSuccessFee, 2)}
          displayType="text"
          suffix=" %"
        />
      </StatisticItem>
      <StatisticItem
        label={t("program-details-page.description.subscriptionFee")}
        className="program-details-description__short-statistic-item"
        accent
      >
        <NumberFormat
          value={formatValue(programDescription.signalSubscriptionFee, 2)}
          displayType="text"
          suffix=" GVT"
        />
      </StatisticItem>
    </div>
  );
};

export default translate()(SignalProgramInfo);
