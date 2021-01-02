import { getImageByQuality } from "components/conversation/conversation-image/conversation-image.helpers";
import { IPostMessageValues } from "components/conversation/conversation-input/conversation-input.helpers";
import {
  AssetSearchResult,
  ConversationFeed,
  IEditPostData,
  SEARCH_ASSET_TYPE
} from "components/conversation/conversation.types";
import { IImageValue } from "components/form/input-image/input-image";
import { EditablePost, EditPost, Post, UserFeedMode } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";
import filesService from "services/file-service";
import { AnyObjectType } from "utils/types";

export const getPostLikesUsers = (id: string) => {
  return api
    .social()
    .getPostLikesUsers(id)
    .then(({ items }) => items);
};

export const getPostRepostsUsers = (id: string) => {
  return api
    .social()
    .getPostRepostsUsers(id)
    .then(({ items }) => items);
};

export const getSocialMedia = (values?: Object, token?: Token) => {
  return api.social(token).getSocialMedia(values);
};

export const rePost = (values: {
  id: string;
  text: string;
  images?: IImageValue[];
}) => {
  return uploadImages(values.images).then(images => {
    api.social().rePost({ body: { ...values, images } });
  });
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
    const id = await filesService.uploadFile(image.image!.cropped, "Social");
    ids.push(id);
  }
  return ids.map((image, position) => ({ image, position }));
};

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

export const getFeedMethod = (values?: AnyObjectType, token?: Token) => {
  return api
    .social(token)
    .getFeed({ ...values, showOnlyUserPosts: !values?.showEvents });
};

export const getGlobalFeed = (
  values?: Object,
  token?: Token
): Promise<ConversationFeed> => {
  return getFeedMethod(values, token);
};

export const getTopPosts = (values: Object): Promise<ConversationFeed> => {
  return getFeedMethod({ ...values, showTop: true });
};

export interface SearchInFeedValues {
  tagContent: { id: string; name: string }[];
  hashTags: Array<string>;
  mask?: string;
}

export const searchInFeed = (searchValues: SearchInFeedValues) => (
  values: Object
): Promise<ConversationFeed> => {
  return getFeedMethod({
    ...searchValues,
    tagContentIds: searchValues.tagContent.map(({ id }) => id),
    ...values
  });
};

export const getNewsFeed = (values?: Object): Promise<ConversationFeed> => {
  return getFeedMethod({ ...values, userMode: "FriendsPosts" });
};

export const getPosts = (values: {
  id: string;
  showEvents?: boolean;
  userMode?: UserFeedMode;
}): Promise<ConversationFeed> => {
  return getFeedMethod({ ...values, userId: values.id });
};

export const getPost = ({
  id,
  token
}: {
  id: string;
  token?: Token;
}): Promise<Post> => {
  return api.social(token).getPost(id);
};

export const getPostForEdit = ({
  id,
  token
}: {
  id: string;
  token?: Token;
}): Promise<IEditPostData> => {
  return api
    .social(token)
    .getOriginalPost(id)
    .then((post: EditablePost) => {
      const images = post.images.map(({ id, resizes }) => {
        const src = getImageByQuality(resizes, "Low").logoUrl;
        return ({
          image: id,
          id,
          src
        } as unknown) as IImageValue;
      });
      return { text: post.textOriginal, images };
    });
};

export const report = ({
  id,
  text,
  reason
}: {
  id: string;
  text?: string;
  reason?: string;
}) => {
  return api.social().spamReport(id, { text, reason });
};

export const editPost = (values: EditPost & { images?: IImageValue[] }) => {
  const oldImages = values.images
    .filter(({ image }: IImageValue) => !image?.cropped)
    .map(({ image }: IImageValue) => ({ image: String(image), position: 0 }));
  const newImages = (values.images.filter(
    ({ image }: IImageValue) => !!image?.cropped
  ) as unknown) as IImageValue[];
  return uploadImages(newImages).then(images => {
    return api.social().editPost({
      body: { ...values, images: [...oldImages, ...images] }
    });
  });
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
    color: data.color,
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
    .search({ ...filters, skipStatistic: true })
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
