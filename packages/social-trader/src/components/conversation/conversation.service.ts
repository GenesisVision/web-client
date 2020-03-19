import { IPostMessageValues } from "components/conversation/conversation-input/conversation-input.helpers";
import { ConversationFeed } from "components/conversation/conversation.types";
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

const sendMessage = (values: IPostMessageValues) => {
  const authorization = authService.getAuthArg();
  return uploadImages(values.images).then(images => {
    return socialApi.addPost(authorization, {
      body: { ...values, images }
    });
  });
};

export const sendComment = (values: IPostMessageValues) => {
  return sendMessage(values);
};

export const sendPost = (values: IPostMessageValues) => {
  return sendMessage(values);
};

export const toggleLike = ({ id, liked }: { id: string; liked?: boolean }) => {
  const authorization = authService.getAuthArg();
  const method = liked ? socialApi.unlikePost : socialApi.likePost;
  return method(id, authorization);
};

export const remove = ({ id }: { id: string }) => {
  const authorization = authService.getAuthArg();
  return socialApi.deletePost(id, authorization);
};

export const getPosts = ({ id }: { id: string }): Promise<ConversationFeed> => {
  const authorization = authService.getAuthArg();
  return socialApi.getFeed({ authorization, userId: id });
};
