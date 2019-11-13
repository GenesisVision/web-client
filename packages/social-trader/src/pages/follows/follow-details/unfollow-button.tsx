import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import GVButton from "shared/components/gv-button";
import useIsOpen from "shared/hooks/is-open.hook";
import UnfollowContainer from "shared/modules/unfollow/unfollow-container";

import { dispatchFollowDescription } from "./services/follow-details.service";

const _UnFollowButton: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const dispatchDescription = useCallback(() => {
    dispatch(dispatchFollowDescription(id));
  }, [id]);
  const [t] = useTranslation();
  const [isOpenUnFollow, setIsOpenUnFollow, setIsCloseUnFollow] = useIsOpen();
  return (
    <>
      <GVButton
        color="secondary"
        variant="outlined"
        className="asset-details-description__invest-btn"
        onClick={setIsOpenUnFollow}
      >
        {t("program-details-page.description.unfollow")}
      </GVButton>
      <UnfollowContainer
        open={isOpenUnFollow}
        id={id}
        onClose={setIsCloseUnFollow}
        onApply={dispatchDescription}
      />
    </>
  );
};

interface Props {
  id: string;
}

const UnFollowButton = React.memo(_UnFollowButton);
export default UnFollowButton;
