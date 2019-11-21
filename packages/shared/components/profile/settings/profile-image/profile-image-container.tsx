import * as React from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import useApiRequest from "shared/hooks/api-request.hook";
import { headerSelector } from "shared/reducers/header-reducer";
import { SetSubmittingType } from "shared/utils/types";

import { updateProfileAvatar } from "../services/profile-settings.service";
import ProfileImage from "./profile-image";

const _ProfileImageContainer: React.FC = () => {
  const { sendRequest } = useApiRequest({
    request: updateProfileAvatar,
    successMessage: "profile-page.settings.image-success-save-message"
  });
  const dispatch = useDispatch();
  const headerData = useSelector(headerSelector);
  const handleSubmit = useCallback(
    (newImage: IImageValue, setSubmitting: SetSubmittingType) =>
      sendRequest({ newImage }, setSubmitting).then(() => {
        dispatch(fetchProfileHeaderInfoAction());
      }),
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
