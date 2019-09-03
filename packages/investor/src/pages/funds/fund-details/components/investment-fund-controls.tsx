import { FundDetailsFull } from "gv-api-web";
import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import InvestmentFundInfo from "shared/components/funds/fund-details/fund-details-description/investment-fund-info";
import { dispatchFundDescription } from "shared/components/funds/fund-details/services/fund-details.service";
import GVButton from "shared/components/gv-button";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { ASSET } from "shared/constants/constants";

enum INVESTMENT_POPUP {
  INVEST = "INVEST",
  INVEST_UNAUTH = "INVEST_UNAUTH"
}

class _InvestmentFundControls extends React.PureComponent<Props, State> {
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

  render() {
    const { popups } = this.state;
    const {
      t,
      fundDescription,
      isAuthenticated,
      service: { dispatchFundDescription }
    } = this.props;

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
        <div className="details-description__invest-button-container">
          <GVButton
            className="details-description__invest-btn"
            onClick={openPopup}
            disabled={isDisabledInvestButton}
          >
            {t("fund-details-page.description.invest")}
          </GVButton>
        </div>
        <FundDepositContainer
          condition={isAuthenticated}
          open={popups[INVESTMENT_POPUP.INVEST]}
          id={fundDescription.id}
          onClose={this.closePopup(INVESTMENT_POPUP.INVEST)}
          onApply={dispatchFundDescription}
        />
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchFundDescription
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchFundDescription: typeof dispatchFundDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  isAuthenticated: boolean;
  fundDescription: FundDetailsFull;
}

interface State {
  popups: { [k: string]: boolean };
}

interface Props extends WithTranslation, OwnProps, DispatchProps {}

const InvestmentFundControls = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  translate()
)(_InvestmentFundControls);
export default InvestmentFundControls;
