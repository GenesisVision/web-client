import { getConversationPostListLoaderData } from "components/conversation/conversation.loader";
import { ConversationPost } from "components/conversation/conversation.types";

const mockRequest = (values: any) =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log(values);
      resolve();
    }, 1000)
  );

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
