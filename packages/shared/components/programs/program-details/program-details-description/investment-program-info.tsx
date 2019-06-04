import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

interface IInvestmentProgramInfoProps {
  isOwnProgram?: boolean;
  programDescription: ProgramDetailsFull;
}

const InvestmentProgramInfo: React.FC<
  InjectedTranslateProps & IInvestmentProgramInfoProps
> = ({ t, programDescription, isOwnProgram }) => {
  const {
    availableInvestmentBase,
    currency,
    entryFeeSelected,
    entryFeeCurrent,
    successFee,
    stopOutLevel
  } = programDescription;
  return (
    <div className="program-details-description__statistic-container">
      <StatisticItem
        label={t("program-details-page.description.avToInvest")}
        className="program-details-description__short-statistic-item"
        accent
      >
        <NumberFormat
          value={formatCurrencyValue(availableInvestmentBase, currency)}
          displayType="text"
          suffix={` ${currency}`}
        />
      </StatisticItem>
      <StatisticItem
        label={t("program-details-page.description.entryFee")}
        className="program-details-description__short-statistic-item"
        accent
      >
        {entryFeeSelected !== entryFeeCurrent ? (
          <Hint
            content={
              <NumberFormat
                value={formatValue(entryFeeSelected, 2)}
                displayType="text"
                prefix={`${entryFeeCurrent} % (`}
                suffix=" %)"
              />
            }
            className="program-details-description__short-statistic-hint"
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            tooltipContent={t(
              "program-details-page.description.entry-fee-levels"
            )}
          />
        ) : (
          <NumberFormat
            value={formatValue(entryFeeCurrent, 2)}
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
          value={formatValue(successFee, 2)}
          displayType="text"
          suffix=" %"
        />
      </StatisticItem>
      <StatisticItem
        condition={!!stopOutLevel}
        label={t("program-details-page.description.stop-out-level")}
        className="program-details-description__short-statistic-item"
        accent
      >
        <NumberFormat
          value={formatValue(stopOutLevel, 2)}
          displayType="text"
          suffix=" %"
        />
      </StatisticItem>
    </div>
  );
};

export default React.memo(translate()(InvestmentProgramInfo));
