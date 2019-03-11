import { FundDetailsFull } from "gv-api-web";
import { GVButton } from "gv-react-components";
import FundDepositContainer from "modules/fund-deposit/fund-deposit-container";
import React, { Component, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ProgramDetailContext } from "shared/components/details/helpers/details-context";
import InvestmentFundInfo from "shared/components/funds/fund-details/fund-details-description/investment-fund-info";
import { FUND } from "shared/constants/constants";

enum INVESTMENT_POPUP {
  INVEST = "INVEST"
}

interface IInvestmentFundControlsOwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  fundDescription: FundDetailsFull;
}

interface IInvestmentFundControlsState {
  popups: { [k: string]: boolean };
}

type InvestmentFundControlsProps = InjectedTranslateProps &
  IInvestmentFundControlsOwnProps;

class InvestmentFundControls extends Component<
  InvestmentFundControlsProps,
  IInvestmentFundControlsState
> {
  constructor(props: InvestmentFundControlsProps) {
    super(props);
    this.state = {
      popups: Object.keys(INVESTMENT_POPUP).reduce((curr: any, next: any) => {
        curr[INVESTMENT_POPUP[next]] = false;
        return curr;
      }, {})
    };
  }
  openPopup = (popupName: INVESTMENT_POPUP) => () => {
    const { isAuthenticated, redirectToLogin } = this.props;
    if (isAuthenticated) {
      let popups = { ...this.state.popups, [popupName]: true };

      this.setState({ popups });
    } else {
      redirectToLogin();
    }
  };

  closePopup = (popupName: INVESTMENT_POPUP) => () => {
    let popups = { ...this.state.popups, [popupName]: false };
    this.setState({ popups });
  };

  applyChanges = (updateDetails: any) => () => {
    updateDetails();
  };

  render() {
    const { popups } = this.state;
    const { t, fundDescription } = this.props;
    const { personalFundDetails } = fundDescription;
    const canInvest = personalFundDetails && personalFundDetails.canInvest;
    return (
      <Fragment>
        <InvestmentFundInfo fundDescription={fundDescription} />

        <Fragment>
          <div className="details-description__invest-button-container">
            <GVButton
              className="details-description__invest-btn"
              onClick={this.openPopup(INVESTMENT_POPUP.INVEST)}
              disabled={!canInvest}
            >
              {t("fund-details-page.description.invest")}
            </GVButton>
          </div>
        </Fragment>
        <ProgramDetailContext.Consumer>
          {({ updateDetails }) => (
            <Fragment>
              <FundDepositContainer
                open={popups[INVESTMENT_POPUP.INVEST]}
                id={fundDescription.id}
                type={FUND}
                onClose={this.closePopup(INVESTMENT_POPUP.INVEST)}
                onInvest={updateDetails}
              />
            </Fragment>
          )}
        </ProgramDetailContext.Consumer>
      </Fragment>
    );
  }
}

export default translate()(InvestmentFundControls);
