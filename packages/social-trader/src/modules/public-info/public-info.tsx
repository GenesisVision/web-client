import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";

import PublicInfoForm, { IAboutFormValues } from "./public-info-form";
import { updateProfile } from "./public-info.service";

const _PublicInfo: React.FC<Props> = ({
  userName,
  about,
  onUpdate,
  isPending
}) => {
  const { sendRequest, errorMessage } = useApiRequest({
    middleware: [onUpdate],
    request: updateProfile,
    successMessage: "profile-page.success-edit"
  });
  const handleSubmit = useCallback(
    (model: IAboutFormValues) =>
      sendRequest({
        model
      }),
    []
  );
  return (
    <PublicInfoForm
      isPending={isPending}
      userName={userName}
      about={about}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
    />
  );
};

interface Props {
  isPending: boolean;
  onUpdate: () => void;
  userName: string;
  about: string;
}

const PublicInfo = React.memo(_PublicInfo);
export default PublicInfo;
