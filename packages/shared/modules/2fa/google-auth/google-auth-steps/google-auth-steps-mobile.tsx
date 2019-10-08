import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import GVButton from "shared/components/gv-button";

import GoogleActivateStep from "./google-auth-activate-step";
import GoogleCodeStep from "./google-auth-code-step";
import GoogleDownloadStep from "./google-auth-download-step";
import { IGoogleAuthProps } from "./google-auth-steps-desktop";

class GoogleAuth extends React.PureComponent<Props, State> {
  state = {
    step: 0
  };
  handleNext = () => {
    this.setState(({ step }) => ({
      step: step + 1
    }));
  };
  handlePrev = () => {
    this.setState(({ step }) => ({
      step: step - 1
    }));
  };
  isPrevDisabled = () => this.state.step === 0;
  isNextDisabled = () => this.state.step === 2;
  render() {
    const { step } = this.state;
    const { t } = this.props;
    return (
      <div className="google-auth google-auth--mobile">
        {step === 0 && <GoogleDownloadStep />}
        {step === 1 && <GoogleCodeStep {...this.props} />}
        {step === 2 && <GoogleActivateStep {...this.props} />}
        <DialogButtons>
          <div className="google-auth__buttons">
            <GVButton
              disabled={this.isPrevDisabled()}
              onClick={this.handlePrev}
              variant="text"
            >
              <>
                &larr;&nbsp;
                {t("Prev")}
              </>
            </GVButton>
            <GVButton
              disabled={this.isNextDisabled()}
              onClick={this.handleNext}
              variant="text"
            >
              <>
                {t("Next")}
                &nbsp;&rarr;
              </>
            </GVButton>
          </div>
        </DialogButtons>
      </div>
    );
  }
}

interface Props extends IGoogleAuthProps, WithTranslation {}

interface State {
  step: number;
}

const GoogleAuthMobile = translate()(GoogleAuth);
export default GoogleAuthMobile;
