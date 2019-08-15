import React, { useCallback } from "react";
import useErrorMessage from "shared/hooks/error-message.hook";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import { SetSubmittingType } from "shared/utils/types";

import PublicInfoForm, { IAboutFormValues } from "./public-info-form";

const _PublicInfo: React.FC<Props> = ({ userName, about }) => {
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const handleSubmit = useCallback(
    (model: IAboutFormValues, setSubmitting: SetSubmittingType) =>
      profileApi
        .v10ProfileUpdatePost(authService.getAuthArg(), {
          model
        })
        .catch(setErrorMessage)
        .finally(() => setSubmitting(false)),
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
