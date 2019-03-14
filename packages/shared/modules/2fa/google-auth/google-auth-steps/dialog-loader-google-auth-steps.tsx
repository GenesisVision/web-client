import React, { Component } from "react";
import { connect } from "react-redux";
import { isTablet } from "shared/utils/breakpoints";

import {
  DialogLoaderGoogleAuthMobile,
  DialogLoaderGoogleAuthDesktop
} from "shared/components/dialog/dialog-loader/dialog-loader-google-auth";
import { IUiState } from "shared/reducers/ui-reducer";

interface IDialogLoaderGoogleAuthStepsStateProps {
  innerWidth: number;
}

class DialogLoaderGoogleAuthSteps extends Component<
  IDialogLoaderGoogleAuthStepsStateProps
> {
  render() {
    return isTablet(this.props.innerWidth) ? (
      <DialogLoaderGoogleAuthMobile />
    ) : (
      <DialogLoaderGoogleAuthDesktop />
    );
  }
}

const mapStateToProps = ({
  ui
}: {
  ui: IUiState;
}): IDialogLoaderGoogleAuthStepsStateProps => ({
  innerWidth: ui.innerWidth
});

const DialogLoaderGoogleAuthStepsContainer = connect(mapStateToProps)(
  DialogLoaderGoogleAuthSteps
);

export default DialogLoaderGoogleAuthStepsContainer;
