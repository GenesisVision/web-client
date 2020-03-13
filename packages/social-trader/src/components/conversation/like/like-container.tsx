import { Like } from "components/conversation/like/like";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

export const _LikeContainer: React.FC<Props> = ({ count, canLike, liked }) => {
  const { sendRequest, isPending } = useApiRequest({
    request: () => {
      return new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, 1000)
      );
    }
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
  count: number;
  liked?: boolean;
  canLike?: boolean;
}

export const LikeContainer = React.memo(_LikeContainer);
