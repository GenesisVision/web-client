import Link from "components/link/link";
import { PostTag } from "gv-api-web";
import { getTagsUrl } from "pages/tags/tags.routes";
import React from "react";
import { safeGetElemFromArray } from "utils/helpers";

import {
  AnyTag,
  EmptyTag,
  EventTag,
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
  { tagType: "Event", Component: EventTag },
  { tagType: "Undefined", Component: AnyTag },
  { tagType: "Program", Component: ProgramLink },
  { tagType: "Follow", Component: FollowLink },
  { tagType: "Fund", Component: FundLink },
  { tagType: "User", Component: UserLink }
];

export const underTextComponentsMap: TagToComponentType[] = [
  { tagType: "Event", Component: EmptyTag },
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
  return <Link to={getTagsUrl({ tags: [symbol] })}>#{symbol}</Link>;
};

export const convertTagToComponent = (
  tag: PostTag,
  componentsMap: TagToComponentType[]
): JSX.Element => {
  switch (tag.type) {
    case "Event":
      return convertEventTagToComponent(tag, componentsMap);
    case "Asset":
      return convertPlatformAssetTagToComponent(tag, componentsMap);
    case "Program":
    case "Fund":
    case "Follow":
      return convertAssetTagToComponent(tag, componentsMap);
    case "Post":
      return convertRepostTagToComponent(tag, componentsMap);
    case "User":
      return convertUserTagToComponent(tag, componentsMap);
    case "Undefined":
    default:
      return convertUndefinedTagToComponent(tag);
  }
};

const convertEventTagToComponent = (
  { assetDetails, event, type }: PostTag,
  componentsMap: TagToComponentType[]
): JSX.Element => {
  const { Component } = safeGetElemFromArray(
    componentsMap,
    ({ tagType }) => tagType === type
  );
  if (!event || !assetDetails) return <></>;
  return <Component data={{ event, assetDetails }} />;
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
