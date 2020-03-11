import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import {
  clearAll,
  serviceGetNotifications
} from "components/notifications/services/notifications.services";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const ClearButton = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const middleware = [() => dispatch(serviceGetNotifications())];
  const { sendRequest, isPending } = useApiRequest({
    request: clearAll,
    middleware
  });
  const handleClick = useCallback(() => {
    sendRequest();
  }, []);

  return (
    <GVButton
      size={GV_BTN_SIZE.BIG}
      noPadding
      variant={"text"}
      onClick={handleClick}
      disabled={isPending}
    >
      {t("notifications-aside.clear")}
    </GVButton>
  );
};

export default ClearButton;
