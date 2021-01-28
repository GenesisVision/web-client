import { Button } from "components/button/button";
import { ProfileHeaderInfoAction } from "components/header/actions/header-actions";
import { clearAll } from "components/notifications/services/notifications.services";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const ClearButton: React.FC = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const updateHeaderButton = () => dispatch(ProfileHeaderInfoAction());
  const middleware = [updateHeaderButton];
  const { sendRequest, isPending } = useApiRequest({
    request: clearAll,
    middleware
  });
  const handleClick = useCallback(() => {
    sendRequest();
  }, []);

  return (
    <Button
      size={"xlarge"}
      noPadding
      variant={"text"}
      onClick={handleClick}
      disabled={isPending}
    >
      {t("notifications-aside.clear")}
    </Button>
  );
};

export default ClearButton;
