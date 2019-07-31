import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import LevelCalculator from "modules/level-calculator/components/level-calculator";
import ProgramDeposit from "modules/program-deposit/program-deposit";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVButton from "shared/components/gv-button";
import InvestmentProgramInfo from "shared/components/programs/program-details/program-details-description/investment-program-info";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import { programDescriptionSelector } from "shared/components/programs/program-details/reducers/description.reducer";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
import { kycConfirmedSelector } from "shared/reducers/header-reducer";
import { RootState } from "shared/reducers/root-reducer";

enum INVESTMENT_POPUP {
  INVEST = "INVEST",
  EDIT = "EDIT",
  INVEST_UNAUTH = "INVEST_UNAUTH"
}

class _InvestmentProgramControls extends React.PureComponent<Props, State> {
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
      isKycConfirmed,
      service: { dispatchProgramDescription },
      t,
      isOwnProgram,
      programDescription,
      isAuthenticated,
      levelsParameters
    } = this.props;

    const message =
      isAuthenticated && !isOwnProgram
        ? t("program-details-page.description.auth-manager-popup")
        : t("program-details-page.description.unauth-popup");
    const isDisabledInvestButton = isAuthenticated
      ? !programDescription.personalProgramDetails ||
        !programDescription.personalProgramDetails.canInvest
      : false;

    return (
      <>
        <InvestmentProgramInfo
          isOwnProgram={isOwnProgram}
          programDescription={programDescription}
          levelsParameters={levelsParameters}
          isKycConfirmed={isKycConfirmed}
          LevelCalculator={LevelCalculator}
        />
        <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
          {isOwnProgram ? (
            <GVButton
              className="asset-details-description__invest-btn"
              onClick={this.openPopup(INVESTMENT_POPUP.INVEST)}
              disabled={isDisabledInvestButton}
            >
              {t("program-details-page.description.invest")}
            </GVButton>
          ) : (
            <GVButton
              className="asset-details-description__invest-btn"
              onClick={this.openPopup(INVESTMENT_POPUP.INVEST_UNAUTH)}
            >
              {t("program-details-page.description.invest")}
            </GVButton>
          )}
        </div>
        <InvestmentUnauthPopup
          message={message}
          title={programDescription.title}
          currency={programDescription.currency}
          availableToInvestBase={programDescription.availableInvestment}
          asset={ASSET.PROGRAM}
          open={popups[INVESTMENT_POPUP.INVEST_UNAUTH]}
          onClose={this.closePopup(INVESTMENT_POPUP.INVEST_UNAUTH)}
        />
        <ProgramDeposit
          condition={isAuthenticated}
          currency={programDescription.currency}
          open={popups[INVESTMENT_POPUP.INVEST]}
          id={programDescription.id}
          onClose={this.closePopup(INVESTMENT_POPUP.INVEST)}
          onApply={dispatchProgramDescription}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchProgramDescription
    },
    dispatch
  )
});

const mapStateToProps = (state: RootState): StateProps => ({
  isKycConfirmed: kycConfirmedSelector(state)
});

interface StateProps {
  isKycConfirmed: boolean;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  canCloseProgram: boolean;
  isOwnProgram: boolean;
  programDescription: ProgramDetailsFull;
  levelsParameters: LevelsParamsInfo;
}

interface State {
  popups: { [k: string]: boolean };
}

interface Props extends WithTranslation, OwnProps, DispatchProps, StateProps {}

const InvestmentProgramControls = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  translate()
)(_InvestmentProgramControls);
export default InvestmentProgramControls;
