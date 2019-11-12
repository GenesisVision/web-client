import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  DialogLoaderGoogleAuthDesktop,
  DialogLoaderGoogleAuthMobile
} from "shared/components/dialog/dialog-loader/dialog-loader-google-auth";
import { isTablet } from "shared/utils/breakpoints";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

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
  innerWidth: ui.size.innerWidth
});

const DialogLoaderGoogleAuthSteps = compose<React.ComponentType>(
  connect(mapStateToProps),
  React.memo
)(_DialogLoaderGoogleAuthSteps);
export default DialogLoaderGoogleAuthSteps;
