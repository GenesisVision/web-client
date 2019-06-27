import "./subscription-details.scss";

import {
  AttachToSignalProviderModeEnum,
  PersonalProgramDetailsFull
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import Profitability from "shared/components/profitability/profitability";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Surface from "shared/components/surface/surface";
import { roundPercents } from "shared/utils/formatter";
import ProgramFollowContainer from "investor-web-portal/src/modules/program-follow/program-follow-container";
import { CurrencyEnum } from "../../../../../utils/types";

class _SubscriptionDetails extends React.PureComponent<Props, State> {
  state = {
    isOpenPopup: false
  };

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
    const { t, id, currency, personalDetails } = this.props;

    return (
      <ProgramDetailContext.Consumer>
        {({ updateDetails }: IProgramDetailContext) => (
          <>
            <Surface className="surface--horizontal-paddings subscription-details">
              <div className="subscription-details__heading">
                <h3>Subscription details</h3>
                <button
                  type="button"
                  onClick={this.openPopup}
                  className="subscription-details__edit-btn"
                >
                  Edit
                </button>
              </div>
              <div className="subscription-details__short-statistic">
                <StatisticItem
                  className="subscription-details__short-statistic-item"
                  accent
                  label={t("fund-details-page.description.profit")}
                >
                  <Profitability value={`${personalDetails.profit}`}>
                    {roundPercents(personalDetails.profit)}
                  </Profitability>
                </StatisticItem>
                <StatisticItem
                  className="subscription-details__short-statistic-item"
                  accent
                  label={t("fund-details-page.description.status")}
                >
                  Active
                </StatisticItem>
                <StatisticItem
                  accent
                  label={"Subscription Type"}
                  className="subscription-details__short-statistic-item"
                >
                  <div className="subscription-details__type">
                    <span className="subscription-details__type-item">
                      By Balance
                    </span>
                    <span className="subscription-details__type-item">
                      <span className="subscription-details__value-accent">
                        Tolerance percentage 1%
                      </span>
                    </span>
                  </div>
                </StatisticItem>
              </div>
            </Surface>
            <ProgramFollowContainer
              id={id}
              open={this.state.isOpenPopup}
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

type mode = {
  label: string;
  value: AttachToSignalProviderModeEnum;
};

const modes: { [key: string]: mode } = {
  byBalance: {
    label: "follow-program.modes.byBalance.label",
    value: "ByBalance"
  },
  percentage: {
    label: "follow-program.modes.percentage.label",
    value: "Percent"
  },
  fixed: {
    label: "follow-program.modes.fixed.label",
    value: "Fixed"
  }
};

interface OwnProps {
  id: string;
  currency: CurrencyEnum;
  personalDetails: PersonalProgramDetailsFull;
}

interface Props extends OwnProps, InjectedTranslateProps {}
interface State {
  isOpenPopup: boolean;
}

const SubscriptionDetails = translate()(_SubscriptionDetails);
export default SubscriptionDetails;
