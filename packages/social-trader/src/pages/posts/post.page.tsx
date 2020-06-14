import { getImageUrlByQuality } from "components/conversation/conversation-image/conversation-image.helpers";
import { ConversationPost } from "components/conversation/conversation.types";
import { PostContainer } from "components/conversation/post/post-container";
import {
  inTextComponentsMap,
  parseToTsx
} from "components/conversation/tag/parse-to-tsx";
import Page from "components/page/page";
import { getPostSchema } from "pages/posts/post-page.schema";
import React from "react";
import { useTranslation } from "react-i18next";
import { composePostPreviewImageUrl } from "utils/compose-url";

export const PostPage: React.FC<Props> = ({ post }) => {
  const [t] = useTranslation();
  const title = t(`Post`);
  const description = (parseToTsx({
    simpleText: true,
    tags: post.tags,
    text: post.text,
    map: inTextComponentsMap
  }) as string).trim();
  const previewImage = post.images.length
    ? getImageUrlByQuality(post.images[0].resizes, "Low")
    : undefined;
  return (
    <Page
      schemas={[
        getPostSchema({
          description,
          identifier: post.id,
          author: post.author.username,
          logo: previewImage
        })
      ]}
      previewImage={composePostPreviewImageUrl(post.id)}
      description={description}
      title={title}
    >
      <PostContainer post={post} id={post.id} />
    </Page>
  );
};

interface Props {
  post: ConversationPost;
}
