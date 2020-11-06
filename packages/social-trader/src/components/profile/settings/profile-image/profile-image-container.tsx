import { ProfileHeaderInfoAction } from "components/header/actions/header-actions";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { headerSelector } from "reducers/header-reducer";

import { updateProfileAvatar } from "../services/profile-settings.service";
import ProfileImage, { IProfileImageFormValues } from "./profile-image";

const _ProfileImageContainer: React.FC = () => {
  const fetchProfileMiddleware = () => {
    dispatch(ProfileHeaderInfoAction());
  };
  const { sendRequest, errorMessage } = useApiRequest({
    middleware: [fetchProfileMiddleware],
    request: updateProfileAvatar,
    successMessage: "profile-page:settings.image-success-save-message"
  });
  const dispatch = useDispatch();
  const headerData = useSelector(headerSelector);
  const handleSubmit = useCallback(
    ({ logo }: IProfileImageFormValues) => sendRequest({ newImage: logo }),
    []
  );
  if (headerData === undefined) return null;

  return (
    <ProfileImage
      errorMessage={errorMessage}
      key={headerData.logoUrl}
      onSubmit={handleSubmit}
      avatar={headerData.logoUrl}
    />
  );
};

const ProfileImageContainer = React.memo(_ProfileImageContainer);
export default ProfileImageContainer;
