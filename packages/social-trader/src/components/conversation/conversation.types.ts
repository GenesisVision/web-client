import { IImageValue } from "components/form/input-image/input-image";
import { TableDataType } from "constants/constants";
import { Post, PostActions, PostImage, ProfilePublic } from "gv-api-web";

export enum SEARCH_ASSET_TYPE {
  program = "program",
  fund = "fund",
  follow = "follow",
  user = "user"
}

export interface IEditPostData {
  text: string;
  images: Array<{ image: string; id: string; src: string }>;
}

export type AssetSearchResult = {
  type: SEARCH_ASSET_TYPE;
  avatar: string;
  id: string;
  name: string;
};

export type OnMessageSendFunc = (values: { text: string }) => Promise<void>;

export type IConversationImage = PostImage;

export type IConversationUser = ProfilePublic;

export interface MessageDetailType {
  value: string;
  title: string;
}

export type ConversationMessagePersonalDetails = PostActions;

export type ConversationComment = ConversationPost;

export type ConversationPost = Post;

export type ConversationFeed = TableDataType<ConversationPost>;
