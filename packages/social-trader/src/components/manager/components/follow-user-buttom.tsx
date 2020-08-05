import GVButton from "components/gv-button";
import { toggleFollowUser } from "components/manager/services/manager.service";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sizeable } from "utils/types";

const _FollowUserButton: React.FC<Props> = ({
  onChange,
  size = "xlarge",
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
      {innerValue ? t("buttons.unfollow") : t("buttons.follow")}
    </GVButton>
  );
};

interface Props extends Sizeable {
  onChange?: VoidFunction;
  disabled?: boolean;
  id: string;
  value: boolean;
}

export const FollowUserButton = React.memo(_FollowUserButton);
