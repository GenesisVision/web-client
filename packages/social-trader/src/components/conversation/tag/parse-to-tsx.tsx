import { AnyTag } from "components/conversation/tag/tag-components/any-tag";
import { EventTag } from "components/conversation/tag/tag-components/event-tag";
import { EmptyTag } from "components/conversation/tag/tag-components/export-tag";
import { FollowLink } from "components/conversation/tag/tag-components/follow-link";
import { FollowTagCard } from "components/conversation/tag/tag-components/follow-tag-card";
import { FundLink } from "components/conversation/tag/tag-components/fund-link";
import { FundTagCard } from "components/conversation/tag/tag-components/fund-tag-card";
import { PlatformAssetTagComponent } from "components/conversation/tag/tag-components/platform-asset-tag";
import { ProgramLink } from "components/conversation/tag/tag-components/program-link";
import { ProgramTagCard } from "components/conversation/tag/tag-components/program-tag-card";
import { RepostTagComponent } from "components/conversation/tag/tag-components/repost-tag";
import { TagToComponentType } from "components/conversation/tag/tag-components/tag-components.types";
import { UrlTagComponent } from "components/conversation/tag/tag-components/url-tag";
import { UserLink } from "components/conversation/tag/tag-components/user-link";
import { UserTagCard } from "components/conversation/tag/tag-components/user-tag-card";
import Link from "components/link/link";
import { PostTag } from "gv-api-web";
import { getTagsUrl } from "pages/tags/tags.routes";
import React from "react";
import { safeGetElemFromArray } from "utils/helpers";

export const inTextComponentsMap: TagToComponentType[] = [
  { tagType: "Url", Component: UrlTagComponent },
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
    case "Url":
      return convertUrlTagToComponent(tag, componentsMap);
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

const convertUrlTagToComponent = (
  { link, type }: PostTag,
  componentsMap: TagToComponentType[]
): JSX.Element => {
  const { Component } = safeGetElemFromArray(
    componentsMap,
    ({ tagType }) => tagType === type
  );
  if (!link) return <></>;
  return <Component data={{ link }} />;
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
  simpleText,
  tags,
  map,
  text
}: {
  simpleText?: boolean;
  tags?: PostTag[];
  map: TagToComponentType[];
  text: string;
}): JSX.Element | string => {
  if (!tags) return <>{text}</>;
  const commonRegex = /#[a-zA-Z0-9]+|@tag-[\d]+/g;
  const tagStrings = text.match(commonRegex) || [];
  const parsedTags = tagStrings
    .map(tag => {
      const tagItem = tag.match(/@tag-[\d]+/g);
      const tagNumber = tagItem?.length
        ? tagItem[0].match(/[\d]+/g)
        : undefined;
      const tagSymbol = tag.match(/[a-zA-Z0-9]+/g);
      return tagNumber ? +tagNumber[0] : tagSymbol![0];
    })
    .map((tagId: number | string) => {
      if (typeof tagId === "number") {
        const tag = safeGetElemFromArray(tags, tag => tag.number === tagId);
        return simpleText ? tag.title : convertTagToComponent(tag, map);
      } else {
        return simpleText ? `#${tagId}` : convertHashTagToComponent(tagId);
      }
    });
  const otherWords = text.split(commonRegex);
  const mergedText = mergeArrays(otherWords, parsedTags);
  if (simpleText) return String(mergedText.join(" "));
  return <>{mergedText}</>;
};
