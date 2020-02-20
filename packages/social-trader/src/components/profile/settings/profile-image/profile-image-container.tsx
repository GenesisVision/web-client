import { IImageValue } from "components/form/input-image/input-image";
import { fetchProfileHeaderInfoAction } from "components/header/actions/header-actions";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { headerSelector } from "reducers/header-reducer";

import { updateProfileAvatar } from "../services/profile-settings.service";
import ProfileImage from "./profile-image";

const _ProfileImageContainer: React.FC = () => {
  const fetchProfileMiddleware = () => {
    dispatch(fetchProfileHeaderInfoAction());
  };
  const { sendRequest, errorMessage } = useApiRequest({
    middleware: [fetchProfileMiddleware],
    request: updateProfileAvatar,
    successMessage: "profile-page.settings.image-success-save-message"
  });
  const dispatch = useDispatch();
  const headerData = useSelector(headerSelector);
  const handleSubmit = useCallback(
    (newImage: IImageValue) => sendRequest({ newImage }),
    []
  );
  if (headerData === undefined) return null;

  return (
    <ProfileImage
      errorMessage={errorMessage}
      key={headerData.avatar}
      onSubmit={handleSubmit}
      avatar={headerData.avatar}
    />
  );
};

const ProfileImageContainer = React.memo(_ProfileImageContainer);
export default ProfileImageContainer;
