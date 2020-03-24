import { IPostMessageValues } from "components/conversation/conversation-input/conversation-input.helpers";
import { getConversationPostLoaderData } from "components/conversation/conversation.loader";
import {
  AssetSearchResult,
  ConversationFeed,
  ConversationPost,
  SEARCH_ASSET_TYPE
} from "components/conversation/conversation.types";
import { IImageValue } from "components/form/input-image/input-image";
import searchApi from "services/api-client/search-api";
import socialApi from "services/api-client/social-api";
import authService from "services/auth-service";
import filesService from "services/file-service";
import { getRandomBoolean, getRandomInteger } from "utils/helpers";

export const sharePost = (id: string) => {
  const authorization = authService.getAuthArg();
  return mockRequest(id);
};

export const pinPost = (id: string) => {
  const authorization = authService.getAuthArg();
  return socialApi.pinPost(id, authorization);
};

export const unpinPost = (id: string) => {
  const authorization = authService.getAuthArg();
  return socialApi.unpinPost(id, authorization);
};

export const togglePin = ({ id, value }: { id: string; value: boolean }) => {
  const method = value ? unpinPost : pinPost;
  return method(id);
};

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

export const getPost = ({ id }: { id: string }): Promise<ConversationPost> => {
  const authorization = authService.getAuthArg();
  return Promise.resolve(
    getConversationPostLoaderData(
      getRandomInteger(0, 10),
      getRandomInteger(0, 5)
    )
  );
};

type RequestFilters = {
  mask: string;
  take?: number;
  authorization?: string;
};

const getAssetSearchResult = (type: SEARCH_ASSET_TYPE) => (
  data: any
): AssetSearchResult => {
  return {
    type,
    avatar: data.avatar || data.logo,
    name: data.url,
    id: data.id
  };
};

export const searchAsset = (text: string): Promise<AssetSearchResult[]> => {
  const trimmedQuery = text.trim();
  const filters: RequestFilters = {
    take: 10,
    mask: trimmedQuery,
    authorization: authService.getAuthArg()
  };
  return searchApi
    .search(filters)
    .then(({ programs, funds, follows, managers }) => {
      const programsNames: AssetSearchResult[] = programs.items.map(
        getAssetSearchResult(SEARCH_ASSET_TYPE.program)
      );
      const followNames: AssetSearchResult[] = follows.items.map(
        getAssetSearchResult(SEARCH_ASSET_TYPE.follow)
      );
      const fundsNames: AssetSearchResult[] = funds.items.map(
        getAssetSearchResult(SEARCH_ASSET_TYPE.fund)
      );
      const managersNames: AssetSearchResult[] = managers.items.map(
        getAssetSearchResult(SEARCH_ASSET_TYPE.user)
      );
      return [
        ...programsNames,
        ...followNames,
        ...fundsNames,
        ...managersNames
      ];
    });
};
