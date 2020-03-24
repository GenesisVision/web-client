import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { PostTag, SocialPostTagType } from "gv-api-web";
import { getAssetFolderRoute } from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import { composeAssetDetailsUrl } from "utils/compose-url";
import { safeGetElemFromArray } from "utils/helpers";

interface IAssetLinkProps {
  url: string;
  name: string;
}

type TagToComponentType = {
  tagType: SocialPostTagType;
  Component: React.FC<IAssetLinkProps>;
};

const AnyTag: React.FC<IAssetLinkProps> = ({ name }) => {
  return <>{name}</>;
};

const ProgramLink: React.FC<IAssetLinkProps> = ({ url, name }) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("Program", url);
  const folderRoute = getAssetFolderRoute("Program");
  return <Link to={linkCreator(route, folderRoute, contextTitle)}>{name}</Link>;
};

const FundLink: React.FC<IAssetLinkProps> = ({ url, name }) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("Fund", url);
  const folderRoute = getAssetFolderRoute("Fund");
  return <Link to={linkCreator(route, folderRoute, contextTitle)}>{name}</Link>;
};

const FollowLink: React.FC<IAssetLinkProps> = ({ url, name }) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("SignalProgram", url);
  const folderRoute = getAssetFolderRoute("SignalProgram");
  return <Link to={linkCreator(route, folderRoute, contextTitle)}>{name}</Link>;
};

const UserLink: React.FC<IAssetLinkProps> = ({ url, name }) => {
  const { contextTitle } = useToLink();
  const to = managerToPathCreator(url, contextTitle);
  return <Link to={to}>{name}</Link>;
};

export const componentsMap: TagToComponentType[] = [
  { tagType: "Undefined", Component: AnyTag },
  { tagType: "Program", Component: ProgramLink },
  { tagType: "Follow", Component: FollowLink },
  { tagType: "Fund", Component: FundLink },
  { tagType: "User", Component: UserLink }
];

const convertTagToComponent = (
  post: PostTag,
  componentsMap: TagToComponentType[]
): JSX.Element => {
  switch (post.type) {
    case "User":
      return convertUserTagToComponent(post, componentsMap);
    case "Undefined":
      return convertUndefinedTagToComponent(post);
    default:
      return convertAssetTagToComponent(post, componentsMap);
  }
};

const convertUserTagToComponent = (
  { type, userDetails }: PostTag,
  componentsMap: TagToComponentType[]
): JSX.Element => {
  const { Component } = safeGetElemFromArray(
    componentsMap,
    ({ tagType }) => tagType === type
  );
  return <Component url={userDetails?.url} name={userDetails?.username} />;
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
  return <Component url={assetDetails?.url} name={assetDetails?.title} />;
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
