import GVButton from "components/gv-button";
import { fetchProfileHeaderInfo } from "components/header/header.service";
import { clearAll } from "components/notifications/services/notifications.services";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const ClearButton: React.FC<Props> = ({ onApply }) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const updateHeaderButton = () => dispatch(fetchProfileHeaderInfo);
  const middleware = [onApply, updateHeaderButton];
  const { sendRequest, isPending } = useApiRequest({
    request: clearAll,
    middleware
  });
  const handleClick = useCallback(() => {
    sendRequest();
  }, []);

  return (
    <GVButton
      size={"xlarge"}
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
