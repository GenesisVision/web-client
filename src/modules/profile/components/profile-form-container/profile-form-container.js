import { connect } from "react-redux";
import React, { Component } from "react";

import profileActions from "../../actions/profile-actions";
import ProfileForm from "./profile-form/profile-form";
import profileFormActions from "../../actions/profile-form-actions";

import ProfileModel, {
  constructFromObject
} from "../profile-container/profile/profile.model";

class ProfileFormContainer extends Component {
  componentDidMount() {
    if (this.props.profile === undefined) {
      this.props.fetchProfile();
    }
  }

  render() {
    const {
      isPending,
      profile,
      errorMessage,
      updateProfile,
      cancelChanges
    } = this.props;

    if (isPending || profile === undefined) {
      return null;
    }
    return (
      <div>
        <h1>Profile Edit</h1>
        <ProfileForm
          profile={profile}
          onSubmit={updateProfile}
          onCancel={cancelChanges}
          error={errorMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    isPending: isPendingView,
    errorMessage: errorMessageView,
    data
  } = state.profileData.view;
  const {
    isPending: isPendingForm,
    errorMessage: errorMessageForm
  } = state.profileData.form;
  const profile = constructFromObject(new ProfileModel(), data);
  return {
    isPending: isPendingView || isPendingForm,
    errorMessage: errorMessageView || errorMessageForm,
    profile
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => {
    dispatch(profileActions.fetchProfile());
  },
  updateProfile: (profile, setSubmitting) => {
    dispatch(profileFormActions.updateProfile(profile)).catch(() => {
      setSubmitting(false);
    });
  },
  cancelChanges: () => {
    profileFormActions.cancelChanges();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileFormContainer);
