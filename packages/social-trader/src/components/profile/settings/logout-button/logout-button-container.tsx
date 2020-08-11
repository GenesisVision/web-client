import { Button } from "components/button/button";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { MiddlewareDispatch } from "utils/types";

import { logoutFromDevices } from "../services/profile-settings.service";

const _LogoutButtonContainer: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch<MiddlewareDispatch>();
  const { isPending, sendRequest } = useApiRequest({
    request: () => dispatch(logoutFromDevices),
    successMessage:
      "profile-page:settings.logout-from-another-devices.success-message"
  });
  const handleSubmit = useCallback(() => sendRequest(), []);
  return (
    <Button onClick={handleSubmit} disabled={isPending}>
      {t("profile-page:settings.logout-from-another-devices.label")}
    </Button>
  );
};

const LogoutButtonContainer = React.memo(_LogoutButtonContainer);
export default LogoutButtonContainer;
