import { FundDetailsFull } from "gv-api-web";
import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { FundDetailContext } from "shared/components/details/helpers/details-context";
import InvestmentFundInfo from "shared/components/funds/fund-details/fund-details-description/investment-fund-info";
import GVButton from "shared/components/gv-button";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { ASSET } from "shared/constants/constants";

enum INVESTMENT_POPUP {
  INVEST = "INVEST",
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

  applyChanges = (updateDescription: () => void) => () => {
    updateDescription();
  };

  render() {
    const { popups } = this.state;
    const { t, fundDescription, isAuthenticated } = this.props;

    const openPopup = isAuthenticated
      ? this.openPopup(INVESTMENT_POPUP.INVEST)
      : this.openPopup(INVESTMENT_POPUP.INVEST_UNAUTH);

    const isDisabledInvestButton = isAuthenticated
      ? !fundDescription.personalFundDetails ||
        !fundDescription.personalFundDetails.canInvest
      : false;

    return (
      <>
        <InvestmentFundInfo fundDescription={fundDescription} />

        <>
          <div className="details-description__invest-button-container">
            <GVButton
              className="details-description__invest-btn"
              onClick={openPopup}
              disabled={isDisabledInvestButton}
            >
              {t("fund-details-page.description.invest")}
            </GVButton>
          </div>
        </>
        <FundDetailContext.Consumer>
          {({ updateDescription }) => (
            <>
              <FundDepositContainer
                condition={isAuthenticated}
                open={popups[INVESTMENT_POPUP.INVEST]}
                id={fundDescription.id}
                onClose={this.closePopup(INVESTMENT_POPUP.INVEST)}
                onApply={this.applyChanges(updateDescription)}
              />
            </>
          )}
        </FundDetailContext.Consumer>
        <InvestmentUnauthPopup
          message={t("fund-details-page.description.unauth-popup")}
          asset={ASSET.FUND}
          title={fundDescription.title}
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

interface Props extends WithTranslation, OwnProps {}
