import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import useErrorMessage from "shared/hooks/error-message.hook";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import { SetSubmittingType } from "shared/utils/types";

import PublicInfoForm, { IAboutFormValues } from "./public-info-form";

const _PublicInfo: React.FC<Props> = ({ userName, about, onSuccessEdit }) => {
  const {
    errorMessage,
    setErrorMessage,
    cleanErrorMessage
  } = useErrorMessage();
  const handleSubmit = useCallback(
    (model: IAboutFormValues, setSubmitting: SetSubmittingType) =>
      profileApi
        .v10ProfileUpdatePost(authService.getAuthArg(), {
          model
        })
        .then(onSuccessEdit)
        .then(cleanErrorMessage)
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
  onSuccessEdit: () => void;
  userName: string;
  about: string;
}

const PublicInfo = React.memo(_PublicInfo);
export default PublicInfo;
