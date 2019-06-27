import "./subscription-details.scss";

import {
  AttachToSignalProviderModeEnum,
  PersonalProgramDetailsFull
} from "gv-api-web";
import ProgramFollowContainer from "investor-web-portal/src/modules/program-follow/program-follow-container";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import {
  IProgramDetailContext,
  ProgramDetailContext
} from "shared/components/details/helpers/details-context";
import Profitability from "shared/components/profitability/profitability";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Surface from "shared/components/surface/surface";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, roundPercents } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

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

    const {
      mode,
      openTolerancePercent,
      percent,
      fixedVolume,
      totalProfit
    } = personalDetails.signalSubscription;

    console.log(personalDetails.signalSubscription);

    return (
      <ProgramDetailContext.Consumer>
        {({ updateDetails }: IProgramDetailContext) => (
          <>
            <Surface className="surface--horizontal-paddings subscription-details">
              <div className="subscription-details__heading">
                <h3>{t("subscription-details.title")}</h3>
                <button
                  type="button"
                  onClick={this.openPopup}
                  className="subscription-details__edit-btn"
                >
                  {t("subscription-details.edit")}
                </button>
              </div>
              <div className="subscription-details__short-statistic">
                <StatisticItem
                  className="subscription-details__short-statistic-item"
                  accent
                  label={t("fund-details-page.description.profit")}
                >
                  <Profitability value={`${totalProfit}`}>
                    {roundPercents(totalProfit)}
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
                  label={t("subscription-details.subscription-type")}
                  className="subscription-details__short-statistic-item"
                >
                  <div className="subscription-details__type">
                    <span className="subscription-details__type-item">
                      {t(`subscription-details.modes.${mode}`)}
                      {mode === modes.percentage && ` volume ${percent}%`}
                      {mode === modes.fixed && (
                        <>
                          <NumberFormat
                            value={formatCurrencyValue(fixedVolume, "USD")}
                            prefix=" "
                            suffix="USD"
                            displayType="text"
                          />
                          <NumberFormat
                            value={formatCurrencyValue(
                              convertFromCurrency(fixedVolume, 1),
                              currency
                            )}
                            prefix=" (≈ "
                            suffix={` ${currency})`}
                            displayType="text"
                          />
                        </>
                      )}
                    </span>
                    <span className="subscription-details__type-item">
                      <span className="subscription-details__value-accent">
                        {t(
                          `subscription-details.tolerance-percentage ${openTolerancePercent}%`
                        )}
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

const modes: { [key: string]: AttachToSignalProviderModeEnum } = {
  byBalance: "ByBalance",
  percentage: "Percent",
  fixed: "Fixed"
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
