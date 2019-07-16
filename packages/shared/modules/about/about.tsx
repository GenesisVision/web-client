import React, { useCallback } from "react";
import { PROFILE_ROUTE } from "shared/components/profile/profile.constants";
import useErrorMessage from "shared/hooks/error-message.hook";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import history from "shared/utils/history";
import { SetSubmittingType } from "shared/utils/types";

import AboutForm, { IAboutFormValues } from "./about-form";

const _About: React.FC<Props> = ({ userName, about }) => {
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const handleSubmit = useCallback(
    (model: IAboutFormValues, setSubmitting: SetSubmittingType) =>
      profileApi
        .v10ProfileUpdatePost(authService.getAuthArg(), {
          model
        })
        .then(() => history.push(PROFILE_ROUTE))
        .catch(setErrorMessage)
        .finally(() => setSubmitting(false)),
    []
  );
  return (
    <AboutForm
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

const About = React.memo(_About);
export default About;
