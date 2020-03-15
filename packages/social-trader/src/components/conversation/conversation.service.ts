import { getConversationPostListLoaderData } from "components/conversation/conversation.loader";
import { ConversationPost } from "components/conversation/conversation.types";
import { getRandomBoolean } from "utils/helpers";

const mockRequest = (values: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(values);
      const success = getRandomBoolean();
      success ? resolve() : reject({ errorMessage: "Failed" });
    }, 1000);
  });

export const sendComment = (values: { text: string; id: string }) => {
  return mockRequest(values);
};

export const sendPost = (values: { text: string }) => {
  return mockRequest(values);
};

export const toggleLike = (values: { id: string }) => {
  return mockRequest(values);
};

export const getPosts = (values: {
  id: string;
}): Promise<ConversationPost[]> => {
  return Promise.resolve(getConversationPostListLoaderData());
};
