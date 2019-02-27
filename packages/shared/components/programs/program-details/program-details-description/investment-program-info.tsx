import { ProgramDetailsFull } from "gv-api-web";
import React, { FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Hint from "shared/components/hint/hint";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";

interface IInvestmentProgramInfoProps {
  isOwnProgram?: boolean;
  programDescription: ProgramDetailsFull;
}

const InvestmentProgramInfo: FunctionComponent<
  InjectedTranslateProps & IInvestmentProgramInfoProps
> = ({ t, programDescription, isOwnProgram }) => {
  return (
    <div className="program-details-description__statistic-container">
      <StatisticItem
        label={t("program-details-page.description.avToInvest")}
        className="program-details-description__short-statistic-item"
        accent
      >
        <NumberFormat
          value={formatValue(programDescription.availableInvestment, 2)}
          displayType="text"
          suffix={` GVT`}
        />
      </StatisticItem>
      <StatisticItem
        label={t("program-details-page.description.entryFee")}
        className="program-details-description__short-statistic-item"
        accent
      >
        {programDescription.entryFeeSelected !==
        programDescription.entryFeeCurrent ? (
          <Hint
            content={
              <NumberFormat
                value={formatValue(programDescription.entryFeeSelected, 2)}
                displayType="text"
                prefix={`${programDescription.entryFeeCurrent} % (`}
                suffix=" %)"
              />
            }
            className="program-details-description__short-statistic-hint"
            vertical={"bottom"}
            tooltipContent={t(
              "program-details-page.description.entry-fee-levels"
            )}
          />
        ) : (
          <NumberFormat
            value={formatValue(programDescription.entryFeeCurrent, 2)}
            displayType="text"
            suffix=" %"
          />
        )}
      </StatisticItem>
      <StatisticItem
        label={t("program-details-page.description.successFee")}
        className="program-details-description__short-statistic-item"
        accent
      >
        <NumberFormat
          value={formatValue(programDescription.successFee, 2)}
          displayType="text"
          suffix=" %"
        />
      </StatisticItem>
      {isOwnProgram && (
        <StatisticItem
          label={t("program-details-page.description.stop-out-level")}
          className="program-details-description__short-statistic-item"
          accent
        >
          <NumberFormat
            value={formatValue(programDescription.stopOutLevel, 2)}
            displayType="text"
            suffix=" %"
          />
        </StatisticItem>
      )}
    </div>
  );
};

export default translate()(InvestmentProgramInfo);
