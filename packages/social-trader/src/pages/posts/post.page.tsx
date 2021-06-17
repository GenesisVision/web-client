import { ConversationPost } from "components/conversation/conversation.types";
import { getImageByQuality } from "components/conversation/conversation-image/conversation-image.helpers";
import { PostContainer } from "components/conversation/post/post-container";
import {
  inTextComponentsMap,
  parseToTsx
} from "components/conversation/tag/parse-to-tsx";
import Page from "components/page/page";
import { getPostSchema } from "pages/posts/post-page.schema";
import React from "react";
import { useTranslation } from "react-i18next";

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
    ? getImageByQuality(post.images[0].resizes, "Original").logoUrl
    : undefined;
  return (
    <Page
      type={"article"}
      schemas={[
        getPostSchema({
          description,
          identifier: post.id,
          author: post.author.username,
          logo: previewImage
        })
      ]}
      previewImage={previewImage}
      description={description}
      title={title}
      noIndex
      noFollow
    >
      <PostContainer
        visibleCommentsCount={post.comments.length}
        reduceLargeText={false}
        post={post}
        id={post.id}
      />
    </Page>
  );
};

interface Props {
  post: ConversationPost;
}
