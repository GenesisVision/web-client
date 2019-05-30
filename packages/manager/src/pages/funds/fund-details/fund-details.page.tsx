import "shared/components/details/details.scss";

import { PlatformInfo } from "gv-api-web";
import FundWithdrawalContainer from "modules/fund-withdrawal/fund-withdrawal-container";
import * as React from "react";
import { connect } from "react-redux";
import { ManagerRootState } from "reducers";
import { compose } from "redux";
import { createSelector } from "reselect";
import FundDetailsPageCommon from "shared/components/funds/fund-details/fund-details.page";
import { fetchEventsCounts } from "shared/components/funds/fund-details/services/fund-details.service";
import { fetchPortfolioEvents } from "shared/components/programs/program-details/services/program-details.service";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { IApiState } from "shared/reducers/api-reducer/api-reducer";

import FundControls from "./components/fund-controls";

const _FundDetailsPage: React.FC<Props> = ({ events }) => {
  const descriptionSection = {
    FundWithdrawalContainer: FundWithdrawalContainer,
    FundControls: FundControls
  };

  const historySection = {
    fetchPortfolioEvents: fetchPortfolioEvents,
    fetchHistoryCounts: fetchEventsCounts,
    eventTypeFilterValues: events
  };

  return (
    <FundDetailsPageCommon
      descriptionSection={descriptionSection}
      historySection={historySection}
    />
  );
};

const eventsSelector = createSelector<
  ManagerRootState,
  IApiState<PlatformInfo>,
  SelectFilterValue<string>[]
>(
  state => state.platformData,
  platformData => {
    if (!platformData.data) return [];
    const { funds } = platformData.data.enums.program.managerNotificationType;
    const events = funds.map((event: string) => ({
      value: event,
      labelKey: `manager.dashboard-page.portfolio-events.types.${event}`
    }));
    return events;
  }
);

const mapStateToProps = (state: ManagerRootState): StateProps => {
  return {
    events: eventsSelector(state)
  };
};

interface Props extends OwnProps, StateProps {}

interface OwnProps {}

interface StateProps {
  events: SelectFilterValue<string>[];
}

const FundDetailsPage = compose<React.ComponentType<OwnProps>>(
  React.memo,
  connect(mapStateToProps)
)(_FundDetailsPage);
export default FundDetailsPage;
