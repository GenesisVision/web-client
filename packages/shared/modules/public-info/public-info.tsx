import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import useErrorMessage from "shared/hooks/error-message.hook";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";

import PublicInfoForm, { IAboutFormValues } from "./public-info-form";

const _PublicInfo: React.FC<Props> = ({ userName, about, onSuccessEdit }) => {
  const [t] = useTranslation();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const handleSubmit = useCallback(
    (model: IAboutFormValues) =>
      profileApi
        .v10ProfileUpdatePost(authService.getAuthArg(), {
          model
        })
        .then(() => onSuccessEdit(t("profile-page.success-edit")))
        .catch(setErrorMessage),
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
  onSuccessEdit: (text: string) => void;
  userName: string;
  about: string;
}

const PublicInfo = React.memo(_PublicInfo);
export default PublicInfo;
