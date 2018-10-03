import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fileService from "shared/services/file-service";

import * as profileSettingsService from "../services/profile-settings.service";
import ProfileImage from "./profile-image";

const ProfileImageContainer = ({ headerData, services }) => {
  if (headerData === undefined) return null;

  const updateAvatar = (croppedImage, submitCallback) => {
    if (croppedImage) {
      services.updateProfileAvatar(croppedImage, submitCallback);
    }

    if (headerData.avatar && !croppedImage) {
      services.removeProfileAvatar(submitCallback);
    }
  };

  return (
    <ProfileImage
      handleSubmit={updateAvatar}
      avatar={headerData && fileService.getFileUrl(headerData.avatar)}
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
