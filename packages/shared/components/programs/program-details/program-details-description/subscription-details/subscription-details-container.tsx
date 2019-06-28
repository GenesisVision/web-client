import "./subscription-details.scss";

import { PersonalProgramDetailsFull } from "gv-api-web";
import ProgramFollowContainer from "investor-web-portal/src/modules/program-follow/program-follow-container";
import * as React from "react";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import { rateApi } from "shared/services/api-client/rate-api";
import { CurrencyEnum } from "shared/utils/types";

import SubscriptionDetails from "./subscription-details";

class _SubscriptionDetailsContainer extends React.PureComponent<Props, State> {
  state = {
    isOpenPopup: false,
    rate: 0
  };

  fetchRate = () => {
    rateApi
      .v10RateByFromByToGet("USD", this.props.currency)
      .then(rate => this.setState({ rate }))
      .catch(() => this.setState({ rate: 0 }));
  };

  componentDidMount() {
    this.fetchRate();
  }

  openPopup = () => {
    this.setState({ isOpenPopup: true });
  };

  applyChanges = (updateDetails: any) => () => {
    updateDetails();
  };

  closePopup = () => {
    this.setState({ isOpenPopup: false });
  };

  render() {
    const { id, currency, personalDetails } = this.props;
    const { rate, isOpenPopup } = this.state;

    return (
      <ProgramDetailContext.Consumer>
        {({ updateDetails }: IProgramDetailContext) => (
          <>
            <SubscriptionDetails
              currency={currency}
              personalDetails={personalDetails}
              openPopup={this.openPopup}
              rate={rate}
            />
            <ProgramFollowContainer
              id={id}
              open={isOpenPopup}
              currency={currency}
              signalSubscription={personalDetails.signalSubscription}
              onClose={this.closePopup}
              onApply={this.applyChanges(updateDetails)}
            />
          </>
        )}
      </ProgramDetailContext.Consumer>
    );
  }
}

interface Props {
  id: string;
  currency: CurrencyEnum;
  personalDetails: PersonalProgramDetailsFull;
}

interface State {
  isOpenPopup: boolean;
  rate: number;
}

const SubscriptionDetailsContainer = React.memo(_SubscriptionDetailsContainer);
export default SubscriptionDetailsContainer;
