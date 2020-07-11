import { sendLikeEvent } from "components/conversation/conversation.ga";
import { toggleLike } from "components/conversation/conversation.service";
import { Like } from "components/conversation/like/like";
import { UsersListTooltip } from "components/conversation/users-list-tooltip/users-list-tooltip";
import MenuTooltip from "components/menu-tooltip/menu-tooltip";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { ProfilePublicShort } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useState } from "react";

export const _LikeContainer: React.FC<Props> = ({
  likesUsers,
  count,
  canLike,
  liked,
  id
}) => {
  const [innerLiked, setInnerLiked] = useState<boolean>(!!liked);
  const [innerCount, setInnerCount] = useState<number>(count);
  const successMiddleware = () => {
    if (innerLiked) setInnerCount(innerCount - 1);
    else setInnerCount(innerCount + 1);
    setInnerLiked(!innerLiked);
  };
  const { sendRequest, isPending } = useApiRequest({
    middleware: [sendLikeEvent, successMiddleware],
    request: () => toggleLike({ id, liked })
  });

  const renderLike = useCallback(
    () => (
      <Like
        count={innerCount}
        onClick={sendRequest}
        liked={innerLiked}
        disable={isPending || !canLike}
      />
    ),
    [innerCount, sendRequest, innerLiked, isPending, canLike]
  );

  const renderTooltip = useCallback(
    () => likesUsers && <UsersListTooltip count={count} list={likesUsers} />,
    [count, likesUsers]
  );

  return likesUsers?.length ? (
    <MenuTooltip vertical={VERTICAL_POPOVER_POS.BOTTOM} render={renderTooltip}>
      <div>{renderLike()}</div>
    </MenuTooltip>
  ) : (
    renderLike()
  );
};

interface Props {
  likesUsers?: Array<ProfilePublicShort>;
  id: string;
  count: number;
  liked?: boolean;
  canLike?: boolean;
}

export const LikeContainer = React.memo(_LikeContainer);
