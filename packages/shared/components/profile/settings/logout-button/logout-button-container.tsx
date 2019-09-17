import { CancelablePromise } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import GVButton from "shared/components/gv-button";
import useApiRequest from "shared/hooks/api-request.hook";

import { logoutFromDevices } from "../services/profile-settings.service";

const _LogoutButtonContainer: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { isPending, sendRequest } = useApiRequest({
    request: () => {
      dispatch(logoutFromDevices);
      return Promise.resolve() as CancelablePromise<any>;
    }
  });
  const handleSubmit = useCallback(() => sendRequest(), []);
  return (
    <div className="logout-container">
      <GVButton onClick={handleSubmit} disabled={isPending}>
        {t("profile-page.settings.logout-from-another-devices")}
      </GVButton>
    </div>
  );
};

const LogoutButtonContainer = React.memo(_LogoutButtonContainer);
export default LogoutButtonContainer;
