import {
  ConversationMessage,
  ConversationPersonalDetails,
  ConversationPost,
  MessageDetailType
} from "components/conversation/conversation.types";
import {
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

export const getConversationPersonalDetailsLoaderData = (): ConversationPersonalDetails => ({
  canComment: true,
  canLike: true,
  liked: !!getRandomInteger(0, 1)
});

export const getConversationMessageLoaderData = (): ConversationMessage => ({
  id: uuid.v4(),
  avatar: "",
  date: new Date().toLocaleString(),
  likesCount: getRandomInteger(1, 10),
  name: getRandomWord(getRandomInteger(8, 50)),
  text: getRandomWords(getRandomInteger(3, 50)),
  personalDetails: getConversationPersonalDetailsLoaderData()
});

export const getConversationPostLoaderData = (): ConversationPost => {
  const hasEvent = getRandomInteger(0, 1);
  const message = getConversationMessageLoaderData();
  return {
    ...message,
    details: hasEvent ? getPostDetailListLoaderData() : undefined,
    comments: tableLoaderCreator(
      getConversationMessageLoaderData,
      getRandomInteger(0, 5)
    ),
    personalDetails: getConversationPersonalDetailsLoaderData()
  };
};

export const getConversationPostListLoaderData = (): ConversationPost[] =>
  tableLoaderCreator(getConversationPostLoaderData, getRandomInteger(2, 5));
