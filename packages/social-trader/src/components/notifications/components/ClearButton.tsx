import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { clearAll } from "components/notifications/services/notifications.services";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

const ClearButton: React.FC<Props> = ({ onApply }) => {
  const [t] = useTranslation();
  const middleware = [onApply];
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

interface Props {
  onApply: VoidFunction;
}

export default ClearButton;
