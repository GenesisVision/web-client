import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { getImageByQuality } from "components/conversation/conversation-image/conversation-image.helpers";
import styles from "components/conversation/conversation-user/conversation-user.module.scss";
import { DefaultBlock } from "components/default.block/default.block";
import { PlateFeedCard } from "components/plate-feed/plate-feed-card";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Separator } from "components/separator/separator";
import { Text } from "components/text/text";
import { MediaPost, Post } from "gv-api-web";
import React from "react";
import { formatDate } from "utils/dates";

interface Props {
  hasImage?: boolean;
  updateItems: VoidFunction;
  post: MediaPost;
}

const transformNewsPostToGVPost = (newsPost: MediaPost): Post => ({
  rePostsUsers: [],
  likesUsers: [],
  isHighlighted: false,
  url: newsPost.url,
  id: newsPost.id,
  text: newsPost.text,
  date: newsPost.date,
  likesCount: 0,
  rePostsCount: 0,
  impressionsCount: 0,
  isPinned: false,
  isDeleted: false,
  images: [],
  tags: [],
  author: {
    id: newsPost.author,
    username: newsPost.author,
    logoUrl: newsPost.authorLogoUrl,
    registrationDate: new Date(),
    url: newsPost.authorUrl,
    socialLinks: []
  },
  personalDetails: {
    isLiked: false,
    canEdit: false,
    canDelete: false,
    canPin: false,
    canComment: false
  },
  comments: []
});

const NewsCardContent: React.FC<Props> = React.memo(
  ({ hasImage, updateItems, post }) => {
    const TitleTag = hasImage ? "h3" : "h2";
    return (
      <div>
        <DefaultBlock>
          <Row>
            <TitleTag>{post.title}</TitleTag>
          </Row>
          {!!post.text?.length && (
            <Row>
              <Text muted>{post.text}</Text>
            </Row>
          )}
          <Row>
            <Separator />
          </Row>
          <Row>
            <AvatarWithName
              avatar={
                <ProfileAvatar url={post.authorLogoUrl} alt={post.author} />
              }
              name={
                <>
                  <Row>
                    <RowItem className={styles["conversation-user__name"]}>
                      {post.author}
                    </RowItem>
                  </Row>
                  <Row size={"small"}>
                    <Text muted>{formatDate(post.date)}</Text>
                  </Row>
                </>
              }
            />
          </Row>
        </DefaultBlock>
        {/* <Separator />
        <DefaultBlock size={SIZES.LARGE}>
          <Center>
            <RowItem wide>
              <LikeContainer
                id={post.id}
                canLike={false}
                count={post.likesCount}
                liked={false}
              />
            </RowItem>
            <RowItem>
              <Share
                post={transformNewsPostToGVPost(post)}
                onApply={updateItems}
                id={post.id}
                count={post.rePostsCount}
              />
            </RowItem>
          </Center>
        </DefaultBlock> */}
      </div>
    );
  }
);

const _NewsCard: React.FC<Props> = ({ updateItems, post }) => {
  const cardImage = post.image
    ? getImageByQuality(post.image.resizes, "Original").logoUrl
    : undefined;
  return (
    <PlateFeedCard
      url={post.url}
      imageSrc={cardImage}
      content={
        <NewsCardContent
          hasImage={!!cardImage}
          updateItems={updateItems}
          post={post}
        />
      }
    />
  );
};

export const NewsCard = React.memo(_NewsCard);
