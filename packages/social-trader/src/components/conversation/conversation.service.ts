import { IPostMessageValues } from "components/conversation/conversation-input/conversation-input.helpers";
import { getConversationPostListLoaderData } from "components/conversation/conversation.loader";
import { ConversationPost } from "components/conversation/conversation.types";
import { IImageValue } from "components/form/input-image/input-image";
import socialApi from "services/api-client/social-api";
import authService from "services/auth-service";
import filesService from "services/file-service";
import { getRandomBoolean } from "utils/helpers";

const uploadImages = async (images?: IImageValue[]) => {
  const ids: string[] = [];
  if (!images?.length) return [];
  const authorization = authService.getAuthArg();
  for (const image of images) {
    const id = await filesService.uploadFile(
      image.image!.cropped,
      authorization
    );
    ids.push(id);
  }
  return ids.map((image, position) => ({ image, position }));
};

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

export const sendPost = (values: IPostMessageValues) => {
  const authorization = authService.getAuthArg();
  return uploadImages(values.images).then(images => {
    return socialApi.addPost(authorization, {
      body: { ...values, images }
    });
  });
};

export const toggleLike = (values: { id: string }) => {
  return mockRequest(values);
};

export const remove = (values: { id: string }) => {
  return mockRequest(values);
};

export const getPosts = (values: {
  id: string;
}): Promise<ConversationPost[]> => {
  return Promise.resolve(getConversationPostListLoaderData());
};
