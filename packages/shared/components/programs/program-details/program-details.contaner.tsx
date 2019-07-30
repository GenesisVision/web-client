import "shared/components/details/details.scss";

import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import Page from "shared/components/page/page";
import ProgramDetailsDescriptionSection from "shared/components/programs/program-details/program-details-description/program-details-description-section";
import ProgramDetailsStatisticSection from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import {
  fetchOpenPositions,
  fetchPeriodHistory,
  fetchProgramTrades
} from "shared/components/programs/program-details/services/program-details.service";
import { STATUS } from "shared/constants/constants";
import withLoader from "shared/decorators/with-loader";
import { CurrencyEnum } from "shared/utils/types";

import { GM_NAME } from "./program-details.constants";
import { IDescriptionSection, IHistorySection } from "./program-details.types";
import ProgramDetailsHistorySection from "./program-history/program-details-history-section";

const _ProgramDetailsContainer: React.FC<Props> = ({
  isKycConfirmed,
  currency,
  isAuthenticated,
  redirectToLogin,
  descriptionSection,
  historySection,
  description
}) => {
  const fetchHistoryPortfolioEvents = useCallback(
    (filters: any) =>
      historySection.fetchPortfolioEvents({
        ...filters,
        assetId: description.id
      }),
    [historySection, description]
  );
  const isInvested =
    description.personalProgramDetails &&
    description.personalProgramDetails.isInvested;
  return (
    <Page title={description.title}>
      <div className="details">
        <div className="details__section">
          <ProgramDetailsDescriptionSection
            accountCurrency={currency}
            programDescription={description}
            isAuthenticated={isAuthenticated}
            redirectToLogin={redirectToLogin}
            ProgramControls={descriptionSection.ProgramControls}
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
            id={description.id}
          />
        </div>
        <div className="details__history">
          <ProgramDetailsHistorySection
            isOwnProgram={
              description.personalProgramDetails
                ? description.personalProgramDetails.isOwnProgram
                : false
            }
            showSwaps={description.brokerDetails.showSwaps}
            showTickets={description.brokerDetails.showTickets}
            isSignalProgram={description.isSignalProgram}
            fetchOpenPositions={fetchOpenPositions}
            fetchPeriodHistory={fetchPeriodHistory}
            fetchTrades={fetchProgramTrades}
            fetchPortfolioEvents={fetchHistoryPortfolioEvents}
            fetchHistoryCounts={historySection.fetchHistoryCounts}
            programId={description.id}
            programCurrency={description.currency}
            currency={currency}
            isInvested={isInvested}
            eventTypeFilterValues={historySection.eventTypeFilterValues}
            isGMProgram={description.brokerDetails.name === GM_NAME}
            title={description.title}
          />
        </div>
      </div>
    </Page>
  );
};

interface OwnProps {
  redirectToLogin: () => void;
  historySection: IHistorySection;
  descriptionSection: IDescriptionSection;
  description: ProgramDetailsFull;
  isAuthenticated: boolean;
  isKycConfirmed: boolean;
  currency: CurrencyEnum;
}

interface Props extends OwnProps {}

const ProgramDetailsContainer = React.memo(
  withLoader(_ProgramDetailsContainer)
);
export default ProgramDetailsContainer;
