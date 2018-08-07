import profileHeaderAction from "modules/profile-header/actions/profile-header-actions";
import ProfileHeader from "modules/profile-header/components/profile-header";
import React, { Component } from "react";
import { connect } from "react-redux";

class ProfileHeaderContainer extends Component {
  componentDidMount() {
    this.props.fetchHeaderInfo();
  }

  render() {
    return this.props.isAuthenticated && <ProfileHeader />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authData.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  fetchHeaderInfo: () => dispatch(profileHeaderAction.fetchHeaderInfo())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHeaderContainer);
