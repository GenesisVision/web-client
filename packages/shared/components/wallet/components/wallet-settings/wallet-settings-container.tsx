import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { MiddlewareDispatch, ResponseError } from "shared/utils/types";

import {
  offPayFeesWithGvt,
  onPayFeesWithGvt
} from "../../services/wallet.services";
import WalletSettings from "./wallet-settings";

class _WalletSettingsContainer extends React.PureComponent<Props, State> {
  state = {
    isPayFeesWithGvt: this.props.isPayFeesWithGvt,
    isOpenGVTFees: false,
    isPending: false
  };

  catchError = (error: ResponseError) => {
    this.props.services.alertError(error.errorMessage);
    this.setState({ isPending: false });
  };

  handleOpenGVTFees = () => this.setState({ isOpenGVTFees: true });

  handleCloseGVTFees = () => this.setState({ isOpenGVTFees: false });

  handleSwitch = () => {
    const { isPayFeesWithGvt } = this.props;
    const method = isPayFeesWithGvt ? offPayFeesWithGvt : onPayFeesWithGvt;
    this.setState({ isPending: true });
    return method()
      .then(() =>
        this.setState({ isPayFeesWithGvt: !isPayFeesWithGvt, isPending: false })
      )
      .catch(this.catchError);
  };

  render() {
    const { t } = this.props;
    const { isPayFeesWithGvt, isPending, isOpenGVTFees } = this.state;
    return (
      <WalletSettings
        name="PayGVTFee"
        label={t("wallet-page.settings.label")}
        isPayFeesWithGvt={isPayFeesWithGvt}
        isPending={isPending}
        handleOpenGVTFees={this.handleOpenGVTFees}
        handleCloseGVTFees={this.handleCloseGVTFees}
        handleSwitch={this.handleSwitch}
        isOpenGVTFees={isOpenGVTFees}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  services: {
    alertError: (message: string) =>
      dispatch(alertMessageActions.error(message))
  }
});

interface Props extends OwnProps, DispatchProps, InjectedTranslateProps {}

interface OwnProps {
  isPayFeesWithGvt: boolean;
}

interface DispatchProps {
  services: {
    alertError: (message: string) => void;
  };
}

interface State {
  isPayFeesWithGvt: boolean;
  isOpenGVTFees: boolean;
  isPending: boolean;
}

const WalletSettingsContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_WalletSettingsContainer);
export default WalletSettingsContainer;
