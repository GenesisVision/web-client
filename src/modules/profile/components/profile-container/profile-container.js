import { connect } from "react-redux";
import React from "react";

import Profile from "./profile/profile";
import profileActions from "../../actions/profile-actions";

const ProfileContainer = props => {
  return <Profile {...props} />;
};

const mapStateToProps = state => {
  const { isFetching, profile } = state.profileData;
  return { isFetching, profile };
};

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => {
    dispatch(profileActions.fetchProfile());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
