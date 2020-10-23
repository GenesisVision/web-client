import React from "react";

import {
  Post as PostType,
  PostAssetDetailsWithPrices,
  PostEvent,
  PostLink,
  PostPlatformAssetDetailsWithPrices,
  ProfilePublic,
  SocialPostTagType
} from "../../../../../../gv-api-web";

export interface IUrlTagProps {
  data: { link: PostLink };
}

export interface IEventTagProps {
  data: { event: PostEvent; assetDetails: PostAssetDetailsWithPrices };
}

export interface IPlatformAssetTagProps {
  platformAssetDetails: PostPlatformAssetDetailsWithPrices;
}

export interface IUserTagProps {
  userDetails: ProfilePublic;
}

export interface IAssetTagProps {
  assetDetails: PostAssetDetailsWithPrices;
}

export interface IAnyTagProps {
  url: string;
  name: string;
}

export interface IRepostTagProps {
  post: PostType;
}

export type TagToComponentType = {
  tagType: SocialPostTagType;
  Component: React.FC<any>;
};
