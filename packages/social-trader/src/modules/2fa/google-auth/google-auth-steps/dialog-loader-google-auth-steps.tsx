import {
  DialogLoaderGoogleAuthDesktop,
  DialogLoaderGoogleAuthMobile
} from "components/dialog/dialog-loader/dialog-loader-google-auth";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { compose } from "redux";
import { isTablet } from "utils/breakpoints";

interface IDialogLoaderGoogleAuthStepsStateProps {
  innerWidth: number;
}

const _DialogLoaderGoogleAuthSteps: React.FC<IDialogLoaderGoogleAuthStepsStateProps> = ({
  innerWidth
}) =>
  isTablet(innerWidth) ? (
    <DialogLoaderGoogleAuthMobile />
  ) : (
    <DialogLoaderGoogleAuthDesktop />
  );

const mapStateToProps = ({
  ui
}: RootState): IDialogLoaderGoogleAuthStepsStateProps => ({
  innerWidth: ui.size.innerWidth
});

const DialogLoaderGoogleAuthSteps = compose<React.ComponentType>(
  connect(mapStateToProps),
  React.memo
)(_DialogLoaderGoogleAuthSteps);
export default DialogLoaderGoogleAuthSteps;
