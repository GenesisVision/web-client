import "./subscription-details.scss";

import { PersonalProgramDetailsFull } from "gv-api-web";
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

class _SubscriptionDetails extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpenWithdrawalPopup: false
    };
  }

  handleOpenWithdrawalPopup = () => {
    this.setState({ isOpenWithdrawalPopup: true });
  };

  handleCloseWithdrawalPopup = () => {
    this.setState({ isOpenWithdrawalPopup: false });
  };

  render() {
    const { t, id, personalDetails } = this.props;

    return (
      <ProgramDetailContext.Consumer>
        {({ updateDetails }: IProgramDetailContext) => (
          <Surface className="surface--horizontal-paddings subscription-details">
            <h3>Subscription details</h3>
            <span>Edit</span>
            <div className="subscription-details__short-statistic">
              <StatisticItem
                accent
                label={t("fund-details-page.description.profit")}
              >
                <Profitability value={`${personalDetails.profit}`}>
                  {roundPercents(personalDetails.profit)}
                </Profitability>
              </StatisticItem>
              <StatisticItem
                accent
                label={t("fund-details-page.description.status")}
              >
                Active
              </StatisticItem>
              <StatisticItem accent label={"Subscription Type"}>
                <span>By Balance</span>
              </StatisticItem>
              <StatisticItem accent label="">
                <span className="subscription-details__value-accent">
                  Tolerance percentage 1%
                </span>
              </StatisticItem>
            </div>
          </Surface>
        )}
      </ProgramDetailContext.Consumer>
    );
  }
}

interface OwnProps {
  id: string;
  personalDetails: PersonalProgramDetailsFull;
}

interface Props extends OwnProps, InjectedTranslateProps {}
interface State {
  isOpenWithdrawalPopup: boolean;
}

const SubscriptionDetails = translate()(_SubscriptionDetails);
export default SubscriptionDetails;
