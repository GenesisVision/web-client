import { Button } from "components/button/button";
import { ProfileHeaderInfoAction } from "components/header/actions/header-actions";
import { clearAll } from "components/notifications/services/notifications.services";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const ClearButton: React.FC<Props> = ({ onApply }) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const updateHeaderButton = () => dispatch(ProfileHeaderInfoAction);
  const middleware = [onApply, updateHeaderButton];
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

interface Props {
  onApply: VoidFunction;
}

export default ClearButton;
