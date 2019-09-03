import { ProgramDetailsFull } from "gv-api-web";
import ProgramFollowContainer from "modules/program-follow/program-follow-container";
import ProgramUnfollowContainer from "modules/program-unfollow/program-unfollow-container";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import GVButton from "shared/components/gv-button";
import InvestmentUnauthPopup from "shared/components/programs/program-details/program-details-description/investment-unauth-popup/investment-unauth-popup";
import SignalProgramInfo from "shared/components/programs/program-details/program-details-description/signal-program-info";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";

class _SignalProviderControls extends React.PureComponent<
  Props,
  ISignalProviderControlState
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      popups: Object.keys(SIGNAL_POPUP).reduce((curr: any, next: any) => {
        curr[SIGNAL_POPUP[next]] = false;
        return curr;
      }, {})
    };
  }
  openPopup = (popupName: SIGNAL_POPUP) => () => {
    this.setState({ popups: { ...this.state.popups, [popupName]: true } });
  };

  closePopup = (popupName: SIGNAL_POPUP) => () => {
    let popups = { ...this.state.popups, [popupName]: false };
    this.setState({ popups });
  };

  render() {
    const {
      t,
      programDescription,
      isAuthenticated,
      service: { dispatchProgramDescription }
    } = this.props;
    const { popups } = this.state;
    return (
      <>
        <SignalProgramInfo programDescription={programDescription} />
        <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
          {programDescription.personalProgramDetails &&
          programDescription.personalProgramDetails.signalSubscription
            .hasActiveSubscription ? (
            <>
              <GVButton
                color="secondary"
                variant="outlined"
                className="asset-details-description__invest-btn"
                onClick={this.openPopup(SIGNAL_POPUP.UNFOLLOW)}
              >
                {t("program-details-page.description.unfollow")}
              </GVButton>
            </>
          ) : (
            <GVButton
              className="asset-details-description__invest-btn"
              onClick={this.openPopup(
                isAuthenticated ? SIGNAL_POPUP.FOLLOW : SIGNAL_POPUP.UNAUTH
              )}
            >
              {t("program-details-page.description.follow-trade")}
            </GVButton>
          )}
        </div>
        {programDescription.personalProgramDetails && (
          <>
            <ProgramFollowContainer
              id={programDescription.id}
              open={popups[SIGNAL_POPUP.FOLLOW]}
              currency={programDescription.currency}
              signalSubscription={
                programDescription.personalProgramDetails.signalSubscription
              }
              onClose={this.closePopup(SIGNAL_POPUP.FOLLOW)}
              onApply={dispatchProgramDescription}
            />
            <ProgramUnfollowContainer
              open={popups[SIGNAL_POPUP.UNFOLLOW]}
              id={programDescription.id}
              onClose={this.closePopup(SIGNAL_POPUP.UNFOLLOW)}
              onApply={dispatchProgramDescription}
            />
          </>
        )}
        <InvestmentUnauthPopup
          header={t("program-details-page.description.follow-trade")}
          message={t("program-details-page.description.unauth-follow-popup")}
          asset={ASSET.PROGRAM}
          title={programDescription.title}
          currency={programDescription.currency}
          open={popups[SIGNAL_POPUP.UNAUTH]}
          onClose={this.closePopup(SIGNAL_POPUP.UNAUTH)}
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

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

enum SIGNAL_POPUP {
  UNAUTH = "UNAUTH",
  FOLLOW = "FOLLOW",
  UNFOLLOW = "UNFOLLOW"
}

interface OwnProps {
  isAuthenticated: boolean;
  programDescription: ProgramDetailsFull;
}

interface ISignalProviderControlState {
  popups: { [k: string]: boolean };
}

interface Props extends OwnProps, WithTranslation, DispatchProps {}

const SignalProviderControls = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  translate()
)(_SignalProviderControls);
export default SignalProviderControls;
