import { ProfileFullViewModel } from "gv-api-web";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import useApiRequest from "shared/hooks/api-request.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";

import Profile from "./profile";

const _ProfileContainer: React.FC = () => {
  const dispatch = useDispatch();
  const alertMessageActionsSuccess = (text: string) =>
    dispatch(alertMessageActions.success(text));
  const [t] = useTranslation();
  const { sendRequest, data } = useApiRequest<ProfileFullViewModel>({
    request: () => profileApi.getProfileFull(authService.getAuthArg())
  });
  useEffect(() => {
    sendRequest();
  }, []);
  const success = useCallback(() => {
    alertMessageActionsSuccess(t("profile-page.success-edit"));
    sendRequest();
  }, []);
  return (
    <Profile
      condition={!!data}
      info={data!}
      notifySuccess={alertMessageActionsSuccess}
      onSuccessEdit={success}
    />
  );
};

const ProfileContainer = React.memo(_ProfileContainer);
export default ProfileContainer;
