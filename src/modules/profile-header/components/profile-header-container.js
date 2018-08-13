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
    if (!this.props.info.data) return null;
    return <ProfileHeader info={this.props.info.data} />;
  }
}

const mapDispatchToProps = dispatch => ({
  fetchHeaderInfo: () => dispatch(profileHeaderAction.fetchHeaderInfo())
});

const mapStateToProps = state => ({
  ...state.profileHeader
});

export default compose(
  isAuthenticated,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfileHeaderContainer);
