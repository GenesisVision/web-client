import "./signal-provider-controls.scss";

import { ProgramDetailsFull } from "gv-api-web";
import ProgramEditSignalContainer from "modules/program-edit-signal/program-edit-signal-container";
import ProgramMakeSignalContainer from "modules/program-make-signal/program-make-signal.container";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ProgramDetailContext } from "shared/components/details/helpers/details-context";
import GVButton from "shared/components/gv-button";
import SignalProgramInfo from "shared/components/programs/program-details/program-details-description/signal-program-info";

enum SIGNAL_POPUP {
  EDIT = "EDIT",
  MAKE = "MAKE"
}

class SignalProviderControls extends React.PureComponent<
  OwnProps & InjectedTranslateProps,
  State
> {
  state = {
    popups: Object.keys(SIGNAL_POPUP).reduce((curr: any, next: any) => {
      curr[SIGNAL_POPUP[next]] = false;
      return curr;
    }, {})
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

  applyChanges = (updateDetails: any) => () => {
    updateDetails();
  };

  render() {
    const { t, programDescription } = this.props;
    const { popups } = this.state;
    return (
      <ProgramDetailContext.Consumer>
        {({ updateDetails }: any) => (
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
                  {t(
                    "program-details-page.description.signal-provider.disclaimer"
                  )}
                </div>
                <div className="program-details-description__button-container">
                  <GVButton
                    onClick={this.openPopup(SIGNAL_POPUP.MAKE)}
                    className="program-details-description__invest-btn signal-provider__btn"
                  >
                    {t(
                      "program-details-page.description.signal-provider.title"
                    )}
                  </GVButton>
                </div>
              </div>
            )}
            <ProgramMakeSignalContainer
              programName={programDescription.title}
              open={popups[SIGNAL_POPUP.MAKE]}
              id={programDescription.id}
              onClose={this.closePopup(SIGNAL_POPUP.MAKE)}
              onApply={this.applyChanges(updateDetails)}
            />
            <ProgramEditSignalContainer
              programDescription={programDescription}
              open={popups[SIGNAL_POPUP.EDIT]}
              onClose={this.closePopup(SIGNAL_POPUP.EDIT)}
              onApply={this.applyChanges(updateDetails)}
            />
          </>
        )}
      </ProgramDetailContext.Consumer>
    );
  }
}

export default translate()(SignalProviderControls);

interface OwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  programDescription: ProgramDetailsFull;
}

interface State {
  popups: { [k: string]: boolean };
}
