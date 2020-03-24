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
  ProgramLink,
  ProgramTagCard,
  RepostTagComponent,
  TagToComponentType,
  UserLink,
  UserTagCard
} from "utils/tag-components";

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
  { tagType: "Program", Component: ProgramTagCard },
  { tagType: "Follow", Component: FollowTagCard },
  { tagType: "Fund", Component: FundTagCard },
  { tagType: "User", Component: UserTagCard }
];

export const convertTagToComponent = (
  tag: PostTag,
  componentsMap: TagToComponentType[]
): JSX.Element => {
  switch (tag.type) {
    // @ts-ignore
    case "Post":
      return convertRepostTagToComponent(tag, componentsMap);
    case "User":
      return convertUserTagToComponent(tag, componentsMap);
    case "Undefined":
      return convertUndefinedTagToComponent(tag);
    default:
      return convertAssetTagToComponent(tag, componentsMap);
  }
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
  const regex = /@tag-[\d]+/g;
  const tagStrings = text.match(regex) || [];
  const parsedTags = tagStrings
    .map(tag => {
      const result = tag.match(/[\d]+/g);
      return result ? +result[0] : 0;
    })
    .map((number: number) => {
      const tag = safeGetElemFromArray(tags, tag => tag.number === number);
      return convertTagToComponent(tag, map);
    });
  const otherWords = text.split(regex);
  const mergedText = mergeArrays(otherWords, parsedTags);
  return <>{mergedText}</>;
};
