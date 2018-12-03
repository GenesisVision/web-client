import { GVButton } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

class LogoutButtonContainer extends PureComponent {
  state = {
    isPending: false
  };
  handleSubmit = () => {
    this.setState({ isPending: true }, () => {
      this.props.services
        .logoutFromDevices()
        .then(({ isPending }) => this.setState({ isPending }))
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
        {this.props.t("profile.settings.logout-from-another-devices")}
      </GVButton>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  services: bindActionCreators(props.profileSettingsService, dispatch)
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(LogoutButtonContainer);
