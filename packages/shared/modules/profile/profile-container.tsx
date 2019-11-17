import { ProfileFullViewModel } from "gv-api-web";
import React, { useEffect } from "react";
import useApiRequest from "shared/hooks/api-request.hook";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";

import Profile from "./profile";

const _ProfileContainer: React.FC = () => {
  const { sendRequest, data } = useApiRequest<ProfileFullViewModel>({
    request: () => profileApi.getProfileFull(authService.getAuthArg())
  });
  useEffect(() => {
    sendRequest();
  }, []);
  return <Profile condition={!!data} info={data!} />;
};

const ProfileContainer = React.memo(_ProfileContainer);
export default ProfileContainer;
