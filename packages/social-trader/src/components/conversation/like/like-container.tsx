import { toggleLike } from "components/conversation/conversation.service";
import { Like } from "components/conversation/like/like";
import useApiRequest from "hooks/api-request.hook";
import React, { useState } from "react";

export const _LikeContainer: React.FC<Props> = ({
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
    middleware: [successMiddleware],
    request: () => toggleLike({ id })
  });

  return (
    <Like
      count={innerCount}
      onClick={sendRequest}
      liked={innerLiked}
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
