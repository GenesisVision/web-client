import { IImageValue } from "components/form/input-image/input-image";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { headerSelector } from "reducers/header-reducer";
import { SetSubmittingType } from "utils/types";

import { updateProfileAvatar } from "../services/profile-settings.service";
import ProfileImage from "./profile-image";

const _ProfileImageContainer: React.FC = () => {
  const { sendRequest } = useApiRequest({
    request: updateProfileAvatar,
    successMessage: "profile-page.settings.image-success-save-message"
  });
  const headerData = useSelector(headerSelector);
  const handleSubmit = useCallback(
    (newImage: IImageValue, setSubmitting: SetSubmittingType) =>
      sendRequest({ newImage }, setSubmitting),
    []
  );
  if (headerData === undefined) return null;

  return (
    <ProfileImage
      key={headerData.avatar}
      onSubmit={handleSubmit}
      avatar={headerData.avatar}
    />
  );
};

const ProfileImageContainer = React.memo(_ProfileImageContainer);
export default ProfileImageContainer;
