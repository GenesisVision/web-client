import { ProfileFullViewModel } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";

import Profile from "./profile";

const _ProfileContainer: React.FC = () => {
  const dispatch = useDispatch();
  const alertMessageActionsSuccess = (text: string) =>
    dispatch(alertMessageActions.success(text));
  const [t] = useTranslation();
  const [data, setData] = useState<ProfileFullViewModel | undefined>(undefined);
  const fetch = () =>
    profileApi.getProfileFull(authService.getAuthArg()).then(setData);
  useEffect(() => {
    fetch();
  }, []);
  const success = () => {
    alertMessageActionsSuccess(t("profile-page.success-edit"));
    fetch();
  };
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
