import { connect } from "react-redux";
import React from "react";

import ProfileForm from "./profile-form/profile-form";
import profileFormActions from "../../actions/profile-form-actions";
import profileActions from "../../actions/profile-actions";
import ProfileModel, {
  constructFromObject
} from "../profile-container/profile/profile.model";

const ProfileFormContainer = ({
  profile,
  isPending,
  errorMessage,
  fetchProfile,
  updateProfile,
  cancelChanges
}) => {
  if (profile === null) {
    fetchProfile();
    return null;
  }
  if (isPending) {
    return null;
  }
  return (
    <div>
      <h1>Profile Edit</h1>
      <ProfileForm
        profile={profile}
        fetchProfile={fetchProfile}
        onSubmit={updateProfile}
        onCancel={cancelChanges}
        error={errorMessage}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { isPending, errorMessage } = {
    ...state.profileData,
    ...state.profileFormData
  };
  const profile = constructFromObject(
    new ProfileModel(),
    state.profileData.data
  );
  return { isPending, errorMessage, profile };
};

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => {
    dispatch(profileActions.fetchProfile());
  },
  updateProfile: (profile, setSubmitting) => {
    dispatch(profileFormActions.updateProfile(profile)).finally(() => {
      setSubmitting(false);
    });
  },
  cancelChanges: () => {
    profileFormActions.cancelChanges();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ProfileFormContainer
);
