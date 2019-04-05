import ProgramReinvestingContainer from "modules/program-reinvesting/components/program-reinvesting-container";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import React from "react";
import ProgramDetailsPageCommon from "shared/components/programs/program-details/program-details.page";
import { INVESTOR_EVENT_TYPE_FILTER_VALUES } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";

import { fetchPortfolioEvents } from "../../dashboard/services/dashboard-events.services";
import ProgramControls from "./components/program-controls";
import { fetchHistoryCounts } from "./services/program-details.service";

const ProgramDetailsPage: React.FC = () => {
  const descriptionSection = {
    ProgramControls: ProgramControls,
    ProgramWithdrawContainer: ProgramWithdrawContainer,
    ProgramReinvestingWidget: ProgramReinvestingContainer
  };

  const historySection = {
    fetchPortfolioEvents: fetchPortfolioEvents,
    fetchHistoryCounts: fetchHistoryCounts,
    eventTypeFilterValues: INVESTOR_EVENT_TYPE_FILTER_VALUES
  };

  return (
    <ProgramDetailsPageCommon
      descriptionSection={descriptionSection}
      //@ts-ignored
      historySection={historySection}
    />
  );
};

export default ProgramDetailsPage;
