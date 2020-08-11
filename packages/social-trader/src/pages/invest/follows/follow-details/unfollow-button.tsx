import { Button } from "components/button/button";
import useIsOpen from "hooks/is-open.hook";
import UnfollowContainer from "modules/unfollow/unfollow-container";
import { dispatchFollowDescription } from "pages/invest/follows/follow-details/services/follow-details.service";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Sizeable } from "utils/types";

const _UnFollowButton: React.FC<Props> = ({
  size = "xlarge",
  onApply,
  id,
  isExternal,
  tradingAccountId
}) => {
  const dispatch = useDispatch();
  const dispatchDescription = useCallback(() => {
    dispatch(dispatchFollowDescription(id)());
    onApply && onApply();
  }, [id]);
  const [t] = useTranslation();
  const [isOpenUnFollow, setIsOpenUnFollow, setIsCloseUnFollow] = useIsOpen();
  return (
    <>
      <Button
        size={size}
        color="secondary"
        variant="outlined"
        onClick={setIsOpenUnFollow}
      >
        {t("asset-details:description.unfollow")}
      </Button>
      <UnfollowContainer
        tradingAccountId={tradingAccountId}
        isExternal={isExternal}
        open={isOpenUnFollow}
        id={id}
        onClose={setIsCloseUnFollow}
        onApply={dispatchDescription}
      />
    </>
  );
};

interface Props extends Sizeable {
  onApply: VoidFunction;
  tradingAccountId: string;
  isExternal: boolean;
  id: string;
}

const UnFollowButton = React.memo(_UnFollowButton);
export default UnFollowButton;
