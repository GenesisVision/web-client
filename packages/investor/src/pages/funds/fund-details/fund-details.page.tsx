import "shared/components/details/details.scss";

import { PlatformInfo } from "gv-api-web";
import FundWithdrawalContainer from "modules/fund-withdrawal/fund-withdrawal-container";
import * as React from "react";
import { connect } from "react-redux";
import { InvestorRootState } from "reducers";
import { compose } from "redux";
import { createSelector } from "reselect";
import FundDetailsPageCommon from "shared/components/funds/fund-details/fund-details.page";
import { fetchEventsCounts } from "shared/components/funds/fund-details/services/fund-details.service";
import { fetchPortfolioEvents } from "shared/components/programs/program-details/services/program-details.service";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { platformDataSelector } from "shared/reducers/platform-reducer";

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
  InvestorRootState,
  PlatformInfo | undefined,
  SelectFilterValue<string>[]
>(
  state => platformDataSelector(state),
  platformData => {
    if (!platformData) return [];
    const { funds } = platformData.enums.program.investorNotificationType;
    const events = funds.map((event: string) => ({
      value: event,
      labelKey: `investor.dashboard-page.portfolio-events.types.${event}`
    }));
    return events;
  }
);

const mapStateToProps = (state: InvestorRootState): StateProps => ({
  events: eventsSelector(state)
});

interface Props extends OwnProps, StateProps {}

interface OwnProps {}

interface StateProps {
  events: SelectFilterValue<string>[];
}

const FundDetailsPage = compose<React.ComponentType<OwnProps>>(
  connect(mapStateToProps),
  React.memo
)(_FundDetailsPage);
export default FundDetailsPage;
