import { toggleLike } from "components/conversation/conversation.service";
import { Like } from "components/conversation/like/like";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

export const _LikeContainer: React.FC<Props> = ({
  count,
  canLike,
  liked,
  id
}) => {
  const { sendRequest, isPending } = useApiRequest({
    request: () => toggleLike({ id })
  });

  return (
    <Like
      count={count}
      onClick={sendRequest}
      liked={liked}
      disable={isPending || !canLike}
    />
  );
};

interface Props {
  id: string;
  count: number;
  liked?: boolean;
  canLike?: boolean;
}

export const LikeContainer = React.memo(_LikeContainer);
