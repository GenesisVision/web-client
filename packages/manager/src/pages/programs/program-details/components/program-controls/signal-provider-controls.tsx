import "./signal-provider-controls.scss";

import { ProgramDetailsFull } from "gv-api-web";
import ProgramEditSignalContainer from "modules/program-signal/program-edit-signal/program-edit-signal-container";
import ProgramMakeSignalContainer from "modules/program-signal/program-make-signal/program-make-signal-container";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import SignalProgramInfo from "shared/components/programs/program-details/program-details-description/signal-program-info";

class _SignalProviderControls extends React.PureComponent<Props, State> {
  state = {
    popups: Object.keys(SIGNAL_POPUP).reduce<PopupStateType>(
      (curr, next) => {
        curr[SIGNAL_POPUP[next as SIGNAL_POPUP]] = false;
        return curr;
      },
      {} as PopupStateType
    )
  };

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

  render() {
    const { t, programDescription } = this.props;
    const { popups } = this.state;
    return (
      <>
        {programDescription.isSignalProgram ? (
          <>
            <SignalProgramInfo programDescription={programDescription} />
            <div className="program-details-description__button-container">
              <GVButton
                onClick={this.openPopup(SIGNAL_POPUP.EDIT)}
                className="program-details-description__invest-btn signal-provider__btn"
              >
                {t(
                  "program-details-page.description.edit-signal-provider.title"
                )}
              </GVButton>
            </div>
          </>
        ) : (
          <div className="signal-provider">
            <div>
              {t("program-details-page.description.signal-provider.title")}
            </div>
            <div className="signal-provider__disclaimer">
              {t("program-details-page.description.signal-provider.disclaimer")}
            </div>
            <div className="program-details-description__button-container">
              <GVButton
                onClick={this.openPopup(SIGNAL_POPUP.MAKE)}
                className="program-details-description__invest-btn signal-provider__btn"
              >
                {t("program-details-page.description.signal-provider.title")}
              </GVButton>
            </div>
          </div>
        )}
        <ProgramMakeSignalContainer
          programDescription={programDescription}
          open={popups[SIGNAL_POPUP.MAKE]}
          onClose={this.closePopup(SIGNAL_POPUP.MAKE)}
        />
        <ProgramEditSignalContainer
          programDescription={programDescription}
          open={popups[SIGNAL_POPUP.EDIT]}
          onClose={this.closePopup(SIGNAL_POPUP.EDIT)}
        />
      </>
    );
  }
}

enum SIGNAL_POPUP {
  EDIT = "EDIT",
  MAKE = "MAKE"
}

type PopupStateType = { [k in SIGNAL_POPUP]: boolean };

interface OwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  programDescription: ProgramDetailsFull;
}

interface State {
  popups: PopupStateType;
}

interface Props extends OwnProps, WithTranslation {}

const SignalProviderControls = compose<React.ComponentType<OwnProps>>(
  translate()
)(_SignalProviderControls);
export default SignalProviderControls;
