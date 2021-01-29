import { IImageValue } from "components/form/input-image/input-image";
import { TableDataType } from "constants/constants";
import { Post, PostImage, PostPersonalDetails, ProfilePublic } from "gv-api-web";
import { IPostMessageValues } from "components/conversation/conversation-input/conversation-input.helpers";

export enum SEARCH_ASSET_TYPE {
  program = "program",
  fund = "fund",
  follow = "follow",
  user = "user"
}

export interface IEditPostData {
  text: string;
  images: Array<IImageValue>;
}

export type AssetSearchResult = {
  color?: string;
  type: SEARCH_ASSET_TYPE;
  avatar: string;
  id: string;
  name: string;
};

export type OnMessageSendFunc = (values: IPostMessageValues) => Promise<void>;

export type IConversationImage = PostImage;

export type IConversationUser = ProfilePublic;

export interface MessageDetailType {
  value: string;
  title: string;
}

export type ConversationMessagePersonalDetails = PostPersonalDetails;

export type ConversationComment = ConversationPost;

export type ConversationPost = Post;

export type ConversationFeed = TableDataType<ConversationPost>;
