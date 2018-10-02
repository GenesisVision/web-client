import React from "react";
import { connect } from "react-redux";

import * as profileSettingsService from "../services/profile-settings.service";
import ProfileImage from "./profile-image";

const ProfileImageContainer = ({ headerData }) => {
  const handleChange = (signUpFormData, setSubmitting) => {
    profileSettingsService.setNewProfileAvatar(signUpFormData, setSubmitting);
  };

  if (headerData === undefined) return null;

  return (
    <ProfileImage
      onChange={handleChange}
      avatar={headerData && headerData.avatar}
    />
  );
};

const mapStateToProps = ({ profileHeader }) => {
  return { headerData: profileHeader.info.data };
};

export default connect(
  mapStateToProps,
  null
)(ProfileImageContainer);
