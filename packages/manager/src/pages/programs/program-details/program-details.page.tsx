import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import React from "react";
import { connect } from "react-redux";
import { ManagerRootState } from "reducers";
import ProgramDetailsPageCommon from "shared/components/programs/program-details/program-details.page";
import {
  EVENT_LOCATION,
  fetchPortfolioEvents
} from "shared/components/programs/program-details/services/program-details.service";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { programEventsSelector } from "shared/reducers/platform-reducer";

import ProgramControls from "./components/program-controls/program-controls";

const _ProgramDetailsPage: React.FC<StateProps> = ({ events }) => {
  const descriptionSection = {
    ProgramControls: ProgramControls,
    ProgramWithdrawContainer: ProgramWithdrawContainer
  };

  const historySection = {
    fetchPortfolioEvents: fetchPortfolioEvents(EVENT_LOCATION.Asset),
    eventTypeFilterValues: events
  };

  return (
    <ProgramDetailsPageCommon
      descriptionSection={descriptionSection}
      historySection={historySection}
    />
  );
};

const mapStateToProps = (state: ManagerRootState): StateProps => ({
  events: programEventsSelector(state)
});

interface StateProps {
  events: SelectFilterValue<string>[];
}

const ProgramDetailsPage = connect(mapStateToProps)(
  React.memo(_ProgramDetailsPage)
);
export default ProgramDetailsPage;
