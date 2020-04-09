import { IPostMessageValues } from "components/conversation/conversation-input/conversation-input.helpers";
import {
  AssetSearchResult,
  ConversationFeed,
  SEARCH_ASSET_TYPE
} from "components/conversation/conversation.types";
import { IImageValue } from "components/form/input-image/input-image";
import { EditablePost, RePost, UserFeedMode } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import filesService from "services/file-service";
import { getRandomBoolean } from "utils/helpers";

export const rePost = (body: RePost) => {
  return api.social().rePost({ body });
};

export const pinPost = (id: string) => {
  return api.social().pinPost(id);
};

export const unpinPost = (id: string) => {
  return api.social().unpinPost(id);
};

export const togglePin = ({ id, value }: { id: string; value: boolean }) => {
  const method = value ? unpinPost : pinPost;
  return method(id);
};

const uploadImages = async (images?: IImageValue[]) => {
  const ids: string[] = [];
  if (!images?.length) return [];
  for (const image of images) {
    const id = await filesService.uploadFile(image.image!.cropped);
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
  return uploadImages(values.images).then(images => {
    return api.social().addPost({
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
  const socialApi = api.social();
  const method = liked ? socialApi.unlikePost : socialApi.likePost;
  return method(id);
};

export const restorePost = ({ id }: { id: string }) => {
  return api.social().revertDeletingPost(id);
};

export const remove = ({ id }: { id: string }) => {
  return api.social().deletePost(id);
};

export const getFeedMethod = (values?: Object) => {
  return api.social().getFeed(values);
};

export const getGlobalFeed = (values?: Object): Promise<ConversationFeed> => {
  return getFeedMethod(values);
};

export const searchInFeed = (values: {
  hashTags?: Array<string>;
  mask?: string;
}): Promise<ConversationFeed> => {
  return getFeedMethod(values);
};

export const getNewsFeed = (values?: Object): Promise<ConversationFeed> => {
  return getFeedMethod({ ...values, userMode: "FriendsPosts" });
};

export const getPosts = (values: {
  id: string;
  userMode?: UserFeedMode;
}): Promise<ConversationFeed> => {
  return getFeedMethod({ ...values, userId: values.id });
};

export const getPost = ({ id }: { id: string }): Promise<EditablePost> => {
  return api.social().getPost(id);
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
    avatar: data.logoUrl, //TODO check
    name: data.url,
    id: data.id
  };
};

export const searchAsset = (text: string): Promise<AssetSearchResult[]> => {
  const trimmedQuery = text.trim();
  const filters: RequestFilters = {
    take: 10,
    mask: trimmedQuery
  };
  return api
    .search()
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
