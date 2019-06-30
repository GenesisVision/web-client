import "shared/components/details/details.scss";

import {
  LevelsParamsInfo,
  ProgramBalanceChart,
  ProgramDetailsFull
} from "gv-api-web";
import * as React from "react";
import { ProgramDetailContext } from "shared/components/details/helpers/details-context";
import Page from "shared/components/page/page";
import ProgramDetailsDescriptionSection from "shared/components/programs/program-details/program-details-description/program-details-description-section";
import ProgramDetailsStatisticSection from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import {
  fetchOpenPositions,
  fetchProgramTrades,
  getProgramStatistic,
  getTradeExport
} from "shared/components/programs/program-details/services/program-details.service";
import {
  ProgramDetailsProfitChart,
  ProgramDetailsStatistic
} from "shared/components/programs/program-details/services/program-details.types";
import { STATUS } from "shared/constants/constants";
import withLoader from "shared/decorators/with-loader";
import { CurrencyEnum } from "shared/utils/types";

import { IDescriptionSection, IHistorySection } from "./program-details.types";
import ProgramDetailsHistorySection from "./program-history/program-details-history-section";

const _ProgramDetailsContainer: React.FC<Props> = ({
  levelsParameters,
  updateDetails,
  isKycConfirmed,
  currency,
  isAuthenticated,
  redirectToLogin,
  descriptionSection,
  historySection,
  description,
  statistic,
  profitChart,
  balanceChart
}) => {
  const fetchHistoryPortfolioEvents = (filters: any) =>
    historySection.fetchPortfolioEvents({
      ...filters,
      assetId: description.id
    });
  const isInvested =
    description.personalProgramDetails &&
    description.personalProgramDetails.isInvested;
  return (
    <Page title={description.title}>
      <ProgramDetailContext.Provider value={{ updateDetails, isKycConfirmed }}>
        <div className="details">
          <div className="details__section">
            <ProgramDetailsDescriptionSection
              levelsParameters={levelsParameters}
              accountCurrency={currency}
              programDescription={description}
              isAuthenticated={isAuthenticated}
              redirectToLogin={redirectToLogin}
              ProgramControls={descriptionSection.ProgramControls}
              ChangePasswordTradingAccount={
                descriptionSection.ChangePasswordTradingAccount
              }
              ProgramWithdrawContainer={
                descriptionSection.ProgramWithdrawContainer
              }
              ProgramReinvestingWidget={
                descriptionSection.ProgramReinvestingWidget
              }
            />
          </div>
          <div className="details__section">
            <ProgramDetailsStatisticSection
              status={description.status as STATUS}
              getProgramStatistic={getProgramStatistic}
              programId={description.id}
              currency={currency}
              statistic={statistic}
              profitChart={profitChart}
              balanceChart={balanceChart}
            />
          </div>
          <div className="details__history">
            <ProgramDetailsHistorySection
              isOwnProgram={
                description.personalProgramDetails
                  ? description.personalProgramDetails.isOwnProgram
                  : false
              }
              isForex={description.brokerDetails.isForex}
              isSignalProgram={description.isSignalProgram}
              getTradeExport={getTradeExport}
              fetchOpenPositions={fetchOpenPositions}
              fetchTrades={fetchProgramTrades}
              fetchPortfolioEvents={fetchHistoryPortfolioEvents}
              fetchHistoryCounts={historySection.fetchHistoryCounts}
              programId={description.id}
              programCurrency={description.currency}
              currency={currency}
              isInvested={isInvested}
              eventTypeFilterValues={historySection.eventTypeFilterValues}
            />
          </div>
        </div>
      </ProgramDetailContext.Provider>
    </Page>
  );
};

interface OwnProps {
  updateDetails: () => any;
  redirectToLogin: () => void;
  historySection: IHistorySection;
  descriptionSection: IDescriptionSection;
  description: ProgramDetailsFull;
  profitChart?: ProgramDetailsProfitChart;
  balanceChart?: ProgramBalanceChart;
  statistic?: ProgramDetailsStatistic;
  levelsParameters: LevelsParamsInfo;
  isAuthenticated: boolean;
  isKycConfirmed: boolean;
  currency: CurrencyEnum;
}

interface Props extends OwnProps {}

const ProgramDetailsContainer = React.memo(
  withLoader(_ProgramDetailsContainer)
);
export default ProgramDetailsContainer;
