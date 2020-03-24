import { sharePost } from "components/conversation/conversation.service";
import { Share } from "components/conversation/share/share";
import useApiRequest from "hooks/api-request.hook";
import React from "react";

export const _ShareContainer: React.FC<Props> = ({ id }) => {
  const { sendRequest, isPending } = useApiRequest({
    request: () => sharePost(id)
  });

  return <Share onClick={sendRequest} disable={isPending} />;
};

interface Props {
  id: string;
}

export const ShareContainer = React.memo(_ShareContainer);
