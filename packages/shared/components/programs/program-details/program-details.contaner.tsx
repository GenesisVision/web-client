import "shared/components/details/details.scss";

import { ProgramBalanceChart, ProgramDetailsFull } from "gv-api-web";
import React from "react";
import { ProgramDetailContext } from "shared/components/details/helpers/details-context";
import Page from "shared/components/page/page";
import ProgramDetailsDescriptionSection from "shared/components/programs/program-details/program-details-description/program-details-description-section";
import ProgramDetailsStatisticSection from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import {
  fetchOpenPositions,
  fetchProgramTrades,
  getProgramStatistic
} from "shared/components/programs/program-details/services/program-details.service";
import {
  ProgramDetailsProfitChart,
  ProgramDetailsStatistic
} from "shared/components/programs/program-details/services/program-details.types";
import { IDescriptionSection, IHistorySection } from "./program-details.types";
import ProgramDetailsHistorySection from "./program-history/program-details-history-section";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { STATUS } from "shared/constants/constants";

const _ProgramDetailsContainer: React.FC<Props> = ({
  updateDetails,
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
      <ProgramDetailContext.Provider value={{ updateDetails }}>
        <div className="details">
          <div className="details__section">
            <ProgramDetailsDescriptionSection
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
              fetchOpenPositions={fetchOpenPositions}
              fetchTrades={fetchProgramTrades}
              fetchPortfolioEvents={fetchHistoryPortfolioEvents}
              fetchHistoryCounts={historySection.fetchHistoryCounts}
              programId={description.id}
              programCurrency={description.currency as CURRENCIES}
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
  isAuthenticated: boolean;
  currency: CURRENCIES;
}

interface Props extends OwnProps {}

const ProgramDetailsContainer = React.memo(_ProgramDetailsContainer);
export default ProgramDetailsContainer;
