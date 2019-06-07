import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  DialogLoaderGoogleAuthDesktop,
  DialogLoaderGoogleAuthMobile
} from "shared/components/dialog/dialog-loader/dialog-loader-google-auth";
import RootState from "shared/reducers/root-reducer";
import { isTablet } from "shared/utils/breakpoints";

interface IDialogLoaderGoogleAuthStepsStateProps {
  innerWidth: number;
}

const _DialogLoaderGoogleAuthSteps: React.FC<
  IDialogLoaderGoogleAuthStepsStateProps
> = ({ innerWidth }) =>
  isTablet(innerWidth) ? (
    <DialogLoaderGoogleAuthMobile />
  ) : (
    <DialogLoaderGoogleAuthDesktop />
  );

const mapStateToProps = ({
  ui
}: RootState): IDialogLoaderGoogleAuthStepsStateProps => ({
  innerWidth: ui.innerWidth
});

const DialogLoaderGoogleAuthSteps = compose<React.ComponentType>(
  connect(mapStateToProps),
  React.memo
)(_DialogLoaderGoogleAuthSteps);
export default DialogLoaderGoogleAuthSteps;
