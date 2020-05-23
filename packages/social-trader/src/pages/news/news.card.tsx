import { Center } from "components/center/center";
import { getImageUrlByQuality } from "components/conversation/conversation-image/conversation-image.helpers";
import { ConversationUser } from "components/conversation/conversation-user/conversation-user";
import { ConversationPost } from "components/conversation/conversation.types";
import { LikeContainer } from "components/conversation/like/like-container";
import { Share } from "components/conversation/share/share";
import {
  inTextComponentsMap,
  parseToTsx
} from "components/conversation/tag/parse-to-tsx";
import { RepostTagContainer } from "components/conversation/tag/repost-tag-container";
import { DefaultBlock } from "components/default.block/default.block";
import { MutedText } from "components/muted-text/muted-text";
import { PlateFeedCard } from "components/plate-feed/plate-feed-card";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Separator } from "components/separator/separator";
import React from "react";

interface Props {
  updateItems: VoidFunction;
  post: ConversationPost;
}

const NewsCardContent: React.FC<Props> = React.memo(({ updateItems, post }) => {
  const hasTags = !!post.tags;
  const hasImages = !!post.images.length;
  const TitleTag = hasImages ? "h3" : "h2";
  const rePostTag = post.tags?.find(({ type }) => type === "Post");
  return (
    <div>
      <DefaultBlock>
        {/*<Row>
          <TitleTag>Title</TitleTag>
        </Row>*/}
        {!!post.text?.length && (
          <Row>
            <MutedText noWrap={false}>
              {parseToTsx({
                tags: post.tags,
                text: post.text,
                map: inTextComponentsMap
              })}
            </MutedText>
          </Row>
        )}
        {rePostTag && (
          <Row>
            <RepostTagContainer>
              <MutedText noWrap={false}>{rePostTag.post.text}</MutedText>
            </RepostTagContainer>
          </Row>
        )}
        {hasTags && (
          <Row wrap>
            {post.tags
              .filter(({ title }) => title !== "<RePost>")
              .map(({ title }) => title)
              .map(tagTitle => (
                <RowItem key={tagTitle}>
                  <MutedText>#{tagTitle}</MutedText>
                </RowItem>
              ))}
          </Row>
        )}
        <Row>
          <ConversationUser
            postId={post.id}
            url={post.author.url}
            avatar={post.author.logoUrl}
            username={post.author.username}
            date={post.date}
          />
        </Row>
      </DefaultBlock>
      <Separator />
      <DefaultBlock>
        <Center>
          <RowItem wide>
            <LikeContainer
              id={post.id}
              canLike={!!post.actions}
              count={post.likesCount}
              liked={post.actions?.isLiked}
            />
          </RowItem>
          <RowItem>
            <Share
              onApply={updateItems}
              id={post.id}
              count={post.rePostsCount}
            />
          </RowItem>
        </Center>
      </DefaultBlock>
    </div>
  );
});

const _NewsCard: React.FC<Props> = ({ updateItems, post }) => {
  const cardImage = post.images.length
    ? getImageUrlByQuality(post.images[0].resizes, "High")
    : undefined;
  return (
    <PlateFeedCard
      imageSrc={cardImage}
      content={<NewsCardContent updateItems={updateItems} post={post} />}
    />
  );
};

export const NewsCard = React.memo(_NewsCard);
