import "./signal-provider-controls.scss";

import { GVButton } from "gv-react-components";
import ProgramMakeSignalContainer from "modules/program-make-signal/program-make-signal.container";
import React, { Component, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ProgramDetailContext } from "shared/components/details/helpers/details-context";
import SignalProgramInfo from "shared/components/programs/program-details/program-details-description/signal-program-info";

interface ISignalProviderControlOwnProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  programDescription: any;
}

interface ISignalProviderControlState {
  isOpenCreateSignalPopup: boolean;
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
      isOpenCreateSignalPopup: false
    };
  }

  openPopup = () => {
    const { isAuthenticated, redirectToLogin } = this.props;
    if (isAuthenticated) {
      this.setState({ isOpenCreateSignalPopup: true });
    } else {
      redirectToLogin();
    }
  };

  closePopup = () => {
    this.setState({ isOpenCreateSignalPopup: false });
  };

  applyChanges = (updateDetails: any) => () => {
    updateDetails();
  };

  render() {
    const { t, programDescription } = this.props;
    const { isOpenCreateSignalPopup } = this.state;
    return (
      <ProgramDetailContext.Consumer>
        {({ updateDetails }: any) =>
          programDescription.isSignalProgram ? (
            <SignalProgramInfo programDescription={programDescription} />
          ) : (
            <Fragment>
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
                    onClick={this.openPopup}
                    className="program-details-description__invest-btn signal-provider__btn"
                  >
                    {t(
                      "program-details-page.description.signal-provider.title"
                    )}
                  </GVButton>
                </div>
              </div>

              <ProgramMakeSignalContainer
                programName={programDescription.title}
                open={isOpenCreateSignalPopup}
                id={programDescription.id}
                onClose={this.closePopup}
                onApply={this.applyChanges(updateDetails)}
              />
            </Fragment>
          )
        }
      </ProgramDetailContext.Consumer>
    );
  }
}

export default translate()(SignalProviderControls);
