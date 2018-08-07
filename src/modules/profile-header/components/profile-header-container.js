import profileHeaderAction from "modules/profile-header/actions/profile-header-actions";
import ProfileHeader from "modules/profile-header/components/profile-header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

class ProfileHeaderContainer extends Component {
  componentDidMount() {
    this.props.fetchHeaderInfo();
  }

  render() {
    return <ProfileHeader />;
  }
}

const mapDispatchToProps = dispatch => ({
  fetchHeaderInfo: () => dispatch(profileHeaderAction.fetchHeaderInfo())
});

export default compose(
  isAuthenticated,
  connect(
    null,
    mapDispatchToProps
  )
)(ProfileHeaderContainer);
