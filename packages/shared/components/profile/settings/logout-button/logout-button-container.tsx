import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVButton from "shared/components/gv-button";

import { logoutFromDevices } from "../services/profile-settings.service";

class _LogoutButtonContainer extends React.PureComponent<Props, State> {
  state = {
    isPending: false
  };
  handleSubmit = () => {
    this.setState({ isPending: true }, () => {
      this.props.service
        .logoutFromDevices()
        .then(() => this.setState({ isPending: false }))
        .catch(() => this.setState({ isPending: false }));
    });
  };

  render() {
    return (
      <GVButton
        variant="text"
        onClick={this.handleSubmit}
        color="secondary"
        disabled={this.state.isPending}
        className="profile-settings__logout-devices"
      >
        {this.props.t("profile-page.settings.logout-from-another-devices")}
      </GVButton>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { logoutFromDevices },
    dispatch
  )
});

interface Props extends OwnProps, DispatchProps, InjectedTranslateProps {}

interface ServiceThunks extends ActionCreatorsMapObject {
  logoutFromDevices: typeof logoutFromDevices;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {}

interface State {
  isPending: boolean;
}

const LogoutButtonContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_LogoutButtonContainer);
export default LogoutButtonContainer;
