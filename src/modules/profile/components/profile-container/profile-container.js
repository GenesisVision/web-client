// @flow
import { connect } from "react-redux";
import React from "react";

import Profile from "./profile/profile";
import profileActions from "../../actions/profile-actions";

import ProfileModel, { constructFromObject } from "./profile/profile.model";

import {
  IProfileProps,
  IProfileActions,
  IProfileFullProps
} from "./profile/profile.type";

const ProfileContainer = (props: IProfileFullProps) => {
  return (
    <div>
      <h1>Profile</h1>
      <Profile
        isPending={props.isPending}
        profile={props.profile}
        fetchProfile={props.fetchProfile}
      />
    </div>
  );
};

const mapStateToProps = (state): IProfileProps => {
  const { isPending } = state.profileData;
  const profile = constructFromObject(
    new ProfileModel(),
    state.profileData.data
  );
  return { isPending, profile };
};

const mapDispatchToProps = (dispatch): IProfileActions => ({
  fetchProfile: () => {
    dispatch(profileActions.fetchProfile());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
