import { Button } from "components/button/button";
import { PostContext } from "components/conversation/post/post.context";
import { ProfilePublic } from "gv-api-web";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  author: ProfilePublic;
}

export const generateUserTag = (name: string) => `@${name} (user) `;

const _Reply: React.FC<Props> = ({ author }) => {
  const [t] = useTranslation();
  const { setReplyState } = useContext(PostContext);

  const handleClick = useCallback(() => {
    setReplyState({ url: generateUserTag(author.url), name: author.username });
  }, [author]);

  return (
    <Button variant={"text"} noPadding onClick={handleClick}>
      {t("Reply")}
    </Button>
  );
};

export const Reply = React.memo(_Reply);
