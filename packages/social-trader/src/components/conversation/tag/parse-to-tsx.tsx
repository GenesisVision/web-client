import { getActiveUrl } from "components/active/active.helpers";
import Link from "components/link/link";
import { PostTag } from "gv-api-web";
import React from "react";
import { safeGetElemFromArray } from "utils/helpers";

import {
  AnyTag,
  EmptyTag,
  FollowLink,
  FollowTagCard,
  FundLink,
  FundTagCard,
  PlatformAssetTagComponent,
  ProgramLink,
  ProgramTagCard,
  RepostTagComponent,
  TagToComponentType,
  UserLink,
  UserTagCard
} from "./tag-components";

export const inTextComponentsMap: TagToComponentType[] = [
  { tagType: "Undefined", Component: AnyTag },
  { tagType: "Program", Component: ProgramLink },
  { tagType: "Follow", Component: FollowLink },
  { tagType: "Fund", Component: FundLink },
  { tagType: "User", Component: UserLink }
];

export const underTextComponentsMap: TagToComponentType[] = [
  { tagType: "Undefined", Component: EmptyTag },
  // @ts-ignore
  { tagType: "Post", Component: RepostTagComponent },
  { tagType: "Asset", Component: PlatformAssetTagComponent },
  { tagType: "Program", Component: ProgramTagCard },
  { tagType: "Follow", Component: FollowTagCard },
  { tagType: "Fund", Component: FundTagCard },
  { tagType: "User", Component: UserTagCard }
];

export const convertHashTagToComponent = (symbol: string): JSX.Element => {
  return <Link to={getActiveUrl(symbol)}>#{symbol}</Link>;
};

export const convertTagToComponent = (
  tag: PostTag,
  componentsMap: TagToComponentType[]
): JSX.Element => {
  switch (tag.type) {
    case "Asset":
      return convertPlatformAssetTagToComponent(tag, componentsMap);
    case "Program":
    case "Fund":
    case "Follow":
      return convertAssetTagToComponent(tag, componentsMap);
    // @ts-ignore
    case "Post":
      return convertRepostTagToComponent(tag, componentsMap);
    case "User":
      return convertUserTagToComponent(tag, componentsMap);
    case "Undefined":
    default:
      return convertUndefinedTagToComponent(tag);
  }
};

const convertPlatformAssetTagToComponent = (
  { platformAssetDetails, type }: PostTag,
  componentsMap: TagToComponentType[]
): JSX.Element => {
  const { Component } = safeGetElemFromArray(
    componentsMap,
    ({ tagType }) => tagType === type
  );
  return <Component platformAssetDetails={platformAssetDetails} />;
};

const convertRepostTagToComponent = (
  tag: PostTag,
  componentsMap: TagToComponentType[]
): JSX.Element => {
  const { Component } = safeGetElemFromArray(
    componentsMap,
    ({ tagType }) => tagType === tag.type
  );
  // @ts-ignore
  return <Component post={tag.post} />;
};

const convertUserTagToComponent = (
  { type, userDetails }: PostTag,
  componentsMap: TagToComponentType[]
): JSX.Element => {
  const { Component } = safeGetElemFromArray(
    componentsMap,
    ({ tagType }) => tagType === type
  );
  return <Component userDetails={userDetails} />;
};

const convertUndefinedTagToComponent = ({ title }: PostTag): JSX.Element => {
  return <AnyTag name={title} url={""} />;
};

const convertAssetTagToComponent = (
  { type, assetDetails }: PostTag,
  componentsMap: TagToComponentType[]
): JSX.Element => {
  const { Component } = safeGetElemFromArray(
    componentsMap,
    ({ tagType }) => tagType === type
  );
  return <Component assetDetails={assetDetails} />;
};

const mergeArrays = (first: any[], second: any[]): any[] => {
  const result = [];
  for (const i in first) result.push(first[i], second[i]);
  return result;
};

export const parseToTsx = ({
  tags,
  map,
  text
}: {
  tags?: PostTag[];
  map: TagToComponentType[];
  text: string;
}): JSX.Element => {
  if (!tags) return <>{text}</>;
  const commonRegex = /#[a-zA-Z]+|@tag-[\d]+/g;
  const tagStrings = text.match(commonRegex) || [];
  const parsedTags = tagStrings
    .map(tag => {
      const tagNumber = tag.match(/[\d]+/g);
      const tagSymbol = tag.match(/[a-zA-Z]+/g);
      return tagNumber ? +tagNumber[0] : tagSymbol![0];
    })
    .map((tagId: number | string) => {
      if (typeof tagId === "number") {
        const tag = safeGetElemFromArray(tags, tag => tag.number === tagId);
        return convertTagToComponent(tag, map);
      } else {
        return convertHashTagToComponent(tagId);
      }
    });
  const otherWords = text.split(commonRegex);
  const mergedText = mergeArrays(otherWords, parsedTags);
  return <>{mergedText}</>;
};
