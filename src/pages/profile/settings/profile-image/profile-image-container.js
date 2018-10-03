import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as profileSettingsService from "../services/profile-settings.service";
import ProfileImage from "./profile-image";

const ProfileImageContainer = ({ headerData, services }) => {
  const handleChange = croppedImage => {
    services.setNewProfileAvatar(croppedImage);
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

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators(profileSettingsService, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileImageContainer);
