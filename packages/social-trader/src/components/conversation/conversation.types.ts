import { TableDataType } from "constants/constants";
import { Post, PostActions, PostImage, ProfilePublicShort } from "gv-api-web";

export type OnMessageSendFunc = (values: { text: string }) => Promise<void>;

export type IConversationImage = PostImage;

export type IConversationUser = ProfilePublicShort;

export interface MessageDetailType {
  value: string;
  title: string;
}

export type ConversationMessagePersonalDetails = PostActions;

export type ConversationComment = ConversationPost;

export type ConversationPost = Post;

export type ConversationFeed = TableDataType<ConversationPost>;
