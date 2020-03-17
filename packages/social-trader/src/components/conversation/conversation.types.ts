export type OnMessageSendFunc = (values: { text: string }) => Promise<void>;

export interface IConversationImage {
  url: string;
}

export interface Achievement {}

export interface ConversationUserPersonalDetails {
  followed: boolean;
}

export interface IConversationUser {
  id: string;
  avatar: string;
  name: string;
  link: string;
  achievements: Achievement[];
  actions?: ConversationUserPersonalDetails;
}

export interface MessageDetailType {
  value: string;
  title: string;
}

export interface ConversationMessagePersonalDetails {
  canClose: boolean;
  canLike: boolean;
  canComment: boolean;
  liked: boolean;
}

export type ConversationComment = ConversationPost;

export interface ConversationPost {
  id: string;
  images: IConversationImage[];
  author: IConversationUser;
  text?: string;
  date: string | Date;
  likesCount: number;
  actions?: ConversationMessagePersonalDetails;
  comments: ConversationComment[];
}
