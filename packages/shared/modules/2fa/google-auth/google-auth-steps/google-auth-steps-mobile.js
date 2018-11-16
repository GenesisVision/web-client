import { GVButton } from "gv-react-components";
import GoogleActivateStep from "./google-auth-activate-step";
import GoogleCodeStep from "./google-auth-code-step";
import GoogleDownloadStep from "./google-auth-download-step";
import { Component } from "react";
import React from "react";
import { translate } from "react-i18next";

class GoogleAuth extends Component {
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
        {step === 0 && <GoogleDownloadStep {...this.props} />}
        {step === 1 && <GoogleCodeStep {...this.props} />}
        {step === 2 && <GoogleActivateStep {...this.props} />}
        <div className="dialog__buttons google-auth__buttons">
          <GVButton
            disabled={this.isPrevDisabled()}
            onClick={this.handlePrev}
            variant="text"
          >
            &larr;&nbsp;
            {t("Prev")}
          </GVButton>
          <GVButton
            disabled={this.isNextDisabled()}
            onClick={this.handleNext}
            variant="text"
          >
            {t("Next")}
            &nbsp;&rarr;
          </GVButton>
        </div>
      </div>
    );
  }
}

const GoogleAuthMobile = translate()(GoogleAuth);
export default GoogleAuthMobile;
