import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { toggleFollowUser } from "components/manager/services/manager.service";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const _FollowUserButton: React.FC<Props> = ({ id, value, disabled }) => {
  const [t] = useTranslation();
  const [innerValue, setInnerValue] = useState<boolean>(value);
  const successMiddleware = () => setInnerValue(!innerValue);
  const { sendRequest, isPending } = useApiRequest({
    request: toggleFollowUser,
    middleware: [successMiddleware]
  });
  const handleClick = useCallback(() => {
    return sendRequest({ id, value: innerValue });
  }, []);
  return (
    <GVButton
      variant={innerValue ? "outlined" : "contained"}
      color={innerValue ? "secondary" : "primary"}
      wide
      size={GV_BTN_SIZE.BIG}
      onClick={handleClick}
      disabled={isPending || disabled}
    >
      {t("manager-page.follow-user")}
    </GVButton>
  );
};

interface Props {
  disabled?: boolean;
  id: string;
  value: boolean;
}

export const FollowUserButton = React.memo(_FollowUserButton);
