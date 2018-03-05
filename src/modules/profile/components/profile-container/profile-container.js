// @flow
import { connect } from "react-redux";
import React, { Component } from "react";

import Profile from "./profile/profile";
import profileActions from "../../actions/profile-actions";

import ProfileModel, { constructFromObject } from "./profile/profile.model";

import {
  IProfileProps,
  IProfileActions,
  IProfileFullProps
} from "./profile/profile.type";

class ProfileContainer extends Component<IProfileFullProps> {
  componentWillMount() {
    this.props.fetchProfile();
  }

  render() {
    const { isPending, profile } = this.props;
    if (this.props.isPending || this.props.profile === undefined) {
      return null;
    }

    return (
      <div>
        <h1>Profile</h1>
        <Profile profile={this.props.profile} />
      </div>
    );
  }
}

const mapStateToProps = (state): IProfileProps => {
  const { isPending } = state.profileData.view;
  const profile = constructFromObject(
    new ProfileModel(),
    state.profileData.view.data
  );
  return { isPending, profile };
};

const mapDispatchToProps = (dispatch): IProfileActions => ({
  fetchProfile: () => {
    dispatch(profileActions.fetchProfile());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
