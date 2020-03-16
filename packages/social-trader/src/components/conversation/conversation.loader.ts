import {
  ConversationComment,
  ConversationMessage,
  ConversationMessagePersonalDetails,
  ConversationPost,
  ConversationUser,
  MessageDetailType
} from "components/conversation/conversation.types";
import {
  getRandomBoolean,
  getRandomInteger,
  getRandomWord,
  getRandomWords,
  tableLoaderCreator
} from "utils/helpers";
import uuid from "uuid";

export const getPostDetailLoaderData = (): MessageDetailType => ({
  title: getRandomWord(),
  value: getRandomWord()
});

export const getPostDetailListLoaderData = (): MessageDetailType[] =>
  tableLoaderCreator(getPostDetailLoaderData, 3);

export const getConversationPersonalDetailsLoaderData = (): ConversationMessagePersonalDetails => ({
  canClose: getRandomBoolean(),
  canComment: true,
  canLike: true,
  liked: getRandomBoolean()
});

export const getConversationUserLoaderData = (): ConversationUser => ({
  id: uuid.v4(),
  achievements: [],
  avatar: "",
  name: getRandomWord(getRandomInteger(8, 50)),
  link: ""
});

export const getConversationMessageLoaderData = (): ConversationMessage => ({
  user: getConversationUserLoaderData(),
  date: new Date().toLocaleString(),
  likesCount: getRandomInteger(1, 10),
  text: getRandomWords(getRandomInteger(3, 50)),
  personalDetails: getConversationPersonalDetailsLoaderData()
});

export const getConversationComment = (): ConversationComment => ({
  id: uuid.v4(),
  message: getConversationMessageLoaderData()
});

export const getConversationPostLoaderData = (): ConversationPost => {
  const hasEvent = getRandomBoolean();
  return {
    id: uuid.v4(),
    message: getConversationMessageLoaderData(),
    details: hasEvent ? getPostDetailListLoaderData() : undefined,
    comments: tableLoaderCreator(getConversationComment, getRandomInteger(0, 5))
  };
};

export const getConversationPostListLoaderData = (): ConversationPost[] =>
  tableLoaderCreator(getConversationPostLoaderData, getRandomInteger(2, 5));
