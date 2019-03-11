import { FundDetailsFull } from "gv-api-web";
import { GVButton } from "gv-react-components";
import AssetEditContainer from "modules/asset-edit/asset-edit-container";
import FundDepositContainer from "modules/fund-deposit/fund-deposit-container";
import ReallocateContainer from "modules/reallocate/reallocate-container";
import moment from "moment";
import React, { Component, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ProgramDetailContext } from "shared/components/details/helpers/details-context";
import InvestmentFundInfo from "shared/components/funds/fund-details/fund-details-description/investment-fund-info";
import { FUND } from "shared/constants/constants";

import CloseFundContainer from "../close-fund/close-fund-container";

enum INVESTMENT_POPUP {
  INVEST = "INVEST",
  CLOSE = "CLOSE",
  REALLOCATE = "REALLOCATE",
  ASSET_EDIT = "ASSET_EDIT"
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
    const canCloseProgram =
      personalFundDetails && personalFundDetails.canClosePeriod;
    const canInvest = personalFundDetails && personalFundDetails.canInvest;
    const isOwnProgram =
      personalFundDetails && personalFundDetails.isOwnProgram;
    const canReallocate =
      personalFundDetails && personalFundDetails.canReallocate;
    const possibleReallocationTime =
      personalFundDetails && personalFundDetails.possibleReallocationTime;

    const composeEditInfo = {
      id: fundDescription.id,
      title: fundDescription.title,
      description: fundDescription.description,
      logo: {
        src: fundDescription.logo
      }
    };
    return (
      <Fragment>
        <InvestmentFundInfo fundDescription={fundDescription} />

        {isOwnProgram && (
          <Fragment>
            <div className="details-description__invest-button-container">
              <GVButton
                className="details-description__invest-btn"
                onClick={this.openPopup(INVESTMENT_POPUP.INVEST)}
                disabled={!canInvest}
              >
                {t("fund-details-page.description.invest")}
              </GVButton>
              <GVButton
                className="details-description__invest-btn"
                color="secondary"
                variant="outlined"
                onClick={this.openPopup(INVESTMENT_POPUP.ASSET_EDIT)}
                disabled={!canCloseProgram}
              >
                {t("fund-details-page.description.edit-fund")}
              </GVButton>
              <GVButton
                className="details-description__invest-btn"
                color="secondary"
                variant="outlined"
                onClick={this.openPopup(INVESTMENT_POPUP.CLOSE)}
                disabled={!canCloseProgram}
              >
                {t("fund-details-page.description.close-fund")}
              </GVButton>
              <div className="details-description__reallocate-container">
                <GVButton
                  className="details-description__invest-btn"
                  color="secondary"
                  variant="outlined"
                  onClick={this.openPopup(INVESTMENT_POPUP.REALLOCATE)}
                  disabled={!canReallocate}
                >
                  {t("fund-details-page.description.reallocate")}
                </GVButton>
                {!canReallocate && (
                  <div className="details-description__reallocate-message">
                    {t(
                      "fund-details-page.description.disable-reallocation-message"
                    )}{" "}
                    {moment(possibleReallocationTime).format("lll")}
                  </div>
                )}
              </div>
            </div>
          </Fragment>
        )}
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
              <CloseFundContainer
                open={popups[INVESTMENT_POPUP.CLOSE]}
                onClose={this.closePopup(INVESTMENT_POPUP.CLOSE)}
                onCancel={this.closePopup(INVESTMENT_POPUP.CLOSE)}
                onApply={this.applyChanges(updateDetails)}
                id={fundDescription.id}
              />
              <AssetEditContainer
                open={popups[INVESTMENT_POPUP.ASSET_EDIT]}
                info={composeEditInfo}
                onClose={this.closePopup(INVESTMENT_POPUP.ASSET_EDIT)}
                onApply={this.applyChanges(updateDetails)}
                type={FUND}
              />
              <ReallocateContainer
                key={`${popups[INVESTMENT_POPUP.REALLOCATE]}`}
                id={fundDescription.id}
                open={popups[INVESTMENT_POPUP.REALLOCATE]}
                onClose={this.applyChanges(updateDetails)}
                assets={fundDescription.currentAssets}
              />
            </Fragment>
          )}
        </ProgramDetailContext.Consumer>
      </Fragment>
    );
  }
}

export default translate()(InvestmentFundControls);
