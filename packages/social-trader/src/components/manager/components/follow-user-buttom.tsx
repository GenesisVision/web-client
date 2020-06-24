import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { toggleFollowUser } from "components/manager/services/manager.service";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const _FollowUserButton: React.FC<Props> = ({
  onChange,
  size = GV_BTN_SIZE.BIG,
  id,
  value,
  disabled
}) => {
  const [t] = useTranslation();
  const [innerValue, setInnerValue] = useState<boolean>(value);
  const successMiddleware = () => setInnerValue(!innerValue);
  const onChangeMiddleware = () => onChange && onChange();
  const { sendRequest, isPending } = useApiRequest({
    request: toggleFollowUser,
    middleware: [successMiddleware, onChangeMiddleware]
  });
  const handleClick = useCallback(() => {
    return sendRequest({ id, value: innerValue });
  }, [id, innerValue, onChange]);
  return (
    <GVButton
      variant={innerValue ? "outlined" : "contained"}
      color={innerValue ? "secondary" : "primary"}
      wide
      size={size}
      onClick={handleClick}
      disabled={isPending || disabled}
    >
      {innerValue
        ? t("manager-page.unfollow-user")
        : t("manager-page.follow-user")}
    </GVButton>
  );
};

interface Props {
  onChange?: VoidFunction;
  size?: GV_BTN_SIZE;
  disabled?: boolean;
  id: string;
  value: boolean;
}

export const FollowUserButton = React.memo(_FollowUserButton);
