import { FundDetailsFull } from "gv-api-web";
import { GVButton } from "gv-react-components";
import AssetEditContainer from "modules/asset-edit/asset-edit-container";
import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import ReallocateContainer from "modules/reallocate/reallocate-container";
import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ProgramDetailContext } from "shared/components/details/helpers/details-context";
import InvestmentFundInfo from "shared/components/funds/fund-details/fund-details-description/investment-fund-info";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { ASSET, FUND } from "shared/constants/constants";

import CloseFundContainer from "../close-fund/close-fund-container";

enum INVESTMENT_POPUP {
  INVEST = "INVEST",
  CLOSE = "CLOSE",
  REALLOCATE = "REALLOCATE",
  ASSET_EDIT = "ASSET_EDIT",
  INVEST_UNAUTH = "INVEST_UNAUTH"
}

class InvestmentFundControls extends React.PureComponent<Props, State> {
  state = {
    popups: Object.keys(INVESTMENT_POPUP).reduce((curr: any, next: any) => {
      curr[INVESTMENT_POPUP[next]] = false;
      return curr;
    }, {})
  };

  openPopup = (popupName: INVESTMENT_POPUP) => () => {
    let popups = { ...this.state.popups, [popupName]: true };
    this.setState({ popups });
  };

  closePopup = (popupName: INVESTMENT_POPUP) => () => {
    let popups = { ...this.state.popups, [popupName]: false };
    this.setState({ popups });
  };

  applyChanges = (updateDetails: () => void) => () => {
    updateDetails();
  };

  render() {
    const { popups } = this.state;
    const { t, fundDescription, isAuthenticated } = this.props;
    const { personalFundDetails } = fundDescription;
    const canCloseProgram =
      personalFundDetails && personalFundDetails.canCloseProgram;
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

    const message =
      isAuthenticated && !isOwnProgram
        ? t("fund-details-page.description.auth-manager-popup")
        : t("fund-details-page.description.unauth-popup");

    return (
      <>
        <InvestmentFundInfo fundDescription={fundDescription} />
        <div className="details-description__invest-button-container">
          {isOwnProgram ? (
            <>
              <GVButton
                className="details-description__invest-btn"
                onClick={this.openPopup(INVESTMENT_POPUP.INVEST)}
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
                {!canReallocate && personalFundDetails.status !== "Ended" && (
                  <div className="details-description__reallocate-message">
                    {t(
                      "fund-details-page.description.disable-reallocation-message"
                    )}{" "}
                    {moment(possibleReallocationTime).format("lll")}
                  </div>
                )}
              </div>
            </>
          ) : (
            <GVButton
              className="details-description__invest-btn"
              onClick={this.openPopup(INVESTMENT_POPUP.INVEST_UNAUTH)}
            >
              {t("fund-details-page.description.invest")}
            </GVButton>
          )}
        </div>
        <ProgramDetailContext.Consumer>
          {({ updateDetails }) => (
            <>
              <FundDepositContainer
                open={popups[INVESTMENT_POPUP.INVEST]}
                id={fundDescription.id}
                onClose={this.closePopup(INVESTMENT_POPUP.INVEST)}
                onApply={this.applyChanges(updateDetails)}
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
                id={fundDescription.id}
                open={popups[INVESTMENT_POPUP.REALLOCATE]}
                onClose={this.closePopup(INVESTMENT_POPUP.REALLOCATE)}
                onApply={this.applyChanges(updateDetails)}
                assets={fundDescription.currentAssets}
              />
            </>
          )}
        </ProgramDetailContext.Consumer>
        <InvestmentUnauthPopup
          message={message}
          title={fundDescription.title}
          asset={ASSET.FUND}
          open={popups[INVESTMENT_POPUP.INVEST_UNAUTH]}
          onClose={this.closePopup(INVESTMENT_POPUP.INVEST_UNAUTH)}
        />
      </>
    );
  }
}

export default translate()(InvestmentFundControls);

interface OwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  fundDescription: FundDetailsFull;
}

interface State {
  popups: { [k: string]: boolean };
}

interface Props extends InjectedTranslateProps, OwnProps {}
