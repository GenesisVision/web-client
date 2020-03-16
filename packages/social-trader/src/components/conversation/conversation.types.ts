export type OnMessageSendFunc = (values: { text: string }) => Promise<void>;

export interface IConversationImage {
  url: string;
}

export interface Achievement {}

export interface ConversationUserPersonalDetails {
  followed: boolean;
}

export interface ConversationUser {
  id: string;
  avatar: string;
  name: string;
  link: string;
  achievements: Achievement[];
  personalDetails?: ConversationUserPersonalDetails;
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

export interface ConversationMessage {
  images: IConversationImage[];
  user: ConversationUser;
  text?: string;
  date: string | Date;
  likesCount: number;
  personalDetails?: ConversationMessagePersonalDetails;
}

export interface ConversationComment {
  id: string;
  message: ConversationMessage;
}

export interface ConversationPost {
  id: string;
  message: ConversationMessage;
  details?: MessageDetailType[];
  comments: ConversationComment[];
}
