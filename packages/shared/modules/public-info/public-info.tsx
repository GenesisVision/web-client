import React, { useCallback } from "react";
import useApiRequest from "shared/hooks/api-request.hook";
import { SetSubmittingType } from "shared/utils/types";

import PublicInfoForm, { IAboutFormValues } from "./public-info-form";
import { updateProfile } from "./public-info.service";

const _PublicInfo: React.FC<Props> = ({ userName, about }) => {
  const { sendRequest, errorMessage } = useApiRequest({
    request: updateProfile,
    successMessage: "profile-page.success-edit"
  });
  const handleSubmit = useCallback(
    (model: IAboutFormValues, setSubmitting: SetSubmittingType) =>
      sendRequest(
        {
          model
        },
        setSubmitting
      ),
    []
  );
  return (
    <PublicInfoForm
      userName={userName}
      about={about}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
    />
  );
};

interface Props {
  userName: string;
  about: string;
}

const PublicInfo = React.memo(_PublicInfo);
export default PublicInfo;
