import { GVButton } from "gv-react-components";
import ProgramFollowContainer from "modules/program-follow/program-follow-container";
import ProgramUnfollowContainer from "modules/program-unfollow/program-unfollow-container";
import React, { Component, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import SignalProgramInfo from "shared/components/programs/program-details/program-details-description/signal-program-info";
import { FOLLOW_TYPE } from "shared/constants/constants";

import { ProgramDetailContext } from "../program-details.page";

enum SIGNAL_POPUP {
  FOLLOW = "FOLLOW",
  UNFOLLOW = "UNFOLLOW"
}

interface ISignalProviderControlOwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  programDescription: any;
}

interface ISignalProviderControlState {
  popups: { [k: string]: boolean };
}

type SignalProviderControlsProps = ISignalProviderControlOwnProps &
  InjectedTranslateProps;

class SignalProviderControls extends Component<
  SignalProviderControlsProps,
  ISignalProviderControlState
> {
  constructor(props: SignalProviderControlsProps) {
    super(props);
    this.state = {
      popups: Object.keys(SIGNAL_POPUP).reduce((curr: any, next: any) => {
        curr[SIGNAL_POPUP[next]] = false;
        return curr;
      }, {})
    };
  }
  openPopup = (popupName: SIGNAL_POPUP) => () => {
    const { isAuthenticated, redirectToLogin } = this.props;
    if (isAuthenticated) {
      let popups = { ...this.state.popups, [popupName]: true };

      this.setState({ popups });
    } else {
      redirectToLogin();
    }
  };

  closePopup = (popupName: SIGNAL_POPUP) => () => {
    let popups = { ...this.state.popups, [popupName]: false };
    this.setState({ popups });
  };

  applyChanges = (updateDetails: any) => () => {
    updateDetails();
  };

  render() {
    const { t, programDescription } = this.props;
    const { popups } = this.state;
    return (
      <Fragment>
        <SignalProgramInfo programDescription={programDescription} />
        <div className="program-details-description__button-container">
          {programDescription.personalProgramDetails.isFollowSignals ? (
            <GVButton
              className="program-details-description__invest-btn"
              onClick={this.openPopup(SIGNAL_POPUP.UNFOLLOW)}
            >
              {t("program-details-page.description.unfollow")}
            </GVButton>
          ) : (
            <GVButton
              className="program-details-description__invest-btn"
              onClick={this.openPopup(SIGNAL_POPUP.FOLLOW)}
            >
              {t("program-details-page.description.follow-trade")}
            </GVButton>
          )}
        </div>
        <ProgramDetailContext.Consumer>
          {({ updateDetails }: any) => (
            <Fragment>
              <ProgramFollowContainer
                programName={programDescription.title}
                type={FOLLOW_TYPE.CREATE}
                id={programDescription.id}
                open={popups[SIGNAL_POPUP.FOLLOW]}
                currency={programDescription.currency}
                onClose={this.closePopup(SIGNAL_POPUP.FOLLOW)}
                onApply={this.applyChanges(updateDetails)}
              />
              <ProgramUnfollowContainer
                open={popups[SIGNAL_POPUP.UNFOLLOW]}
                id={programDescription.id}
                onClose={this.closePopup(SIGNAL_POPUP.UNFOLLOW)}
                onApply={this.applyChanges(updateDetails)}
              />
            </Fragment>
          )}
        </ProgramDetailContext.Consumer>
      </Fragment>
    );
  }
}

export default translate()(SignalProviderControls);
