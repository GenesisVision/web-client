import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { PostTag, SocialPostTagType } from "gv-api-web";
import { getAssetFolderRoute } from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import { composeAssetDetailsUrl } from "utils/compose-url";
import { getRandomWord, safeGetElemFromArray } from "utils/helpers";

interface IAssetLinkProps {
  url: string;
  name: string;
}

type TagToComponentType = {
  tagType: SocialPostTagType;
  Component: React.FC<IAssetLinkProps>;
};

const AnyLink: React.FC<IAssetLinkProps> = ({ url, name }) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = url;
  const folderRoute = undefined;
  return <Link to={linkCreator(route, folderRoute, contextTitle)}>{name}</Link>;
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

const componentsMap: TagToComponentType[] = [
  { tagType: "Undefined", Component: AnyLink },
  { tagType: "Program", Component: ProgramLink },
  { tagType: "Follow", Component: FollowLink },
  { tagType: "Fund", Component: FundLink },
  { tagType: "User", Component: UserLink }
];

const convertAssetTagToComponent = (
  { type, assetDetails: { url, title } }: PostTag,
  componentsMap: TagToComponentType[]
): JSX.Element => {
  const { Component } = safeGetElemFromArray(
    componentsMap,
    ({ tagType }) => tagType === type
  );
  return <Component url={url} name={title} />;
};

const mockText = "test @tag-0 test.test @tag-1 test. test .@tag-2.test";
const getMockTag = (): PostTag => ({
  title: "",
  number: 0,
  assetDetails: {
    url: "dasf",
    assetType: "Program",
    title: getRandomWord(),
    id: "",
    color: "",
    logo: "",
    programDetails: { level: 0, levelProgress: 0 }
  },
  type: "Program",
  userDetails: {
    id: "",
    username: "",
    url: ""
  },
  platformAssetDetails: {
    id: "string",
    name: "string",
    asset: "string",
    description: "string",
    icon: "string",
    color: "string",
    mandatoryFundPercent: 0,
    url: "string"
  }
});

export const parseToTsx = ({
  tags,
  map,
  text
}: {
  tags: PostTag[];
  map: TagToComponentType[];
  text: string;
}): JSX.Element => {
  const parsedWords: any[] = [];
  for (let i = 0; i < text.length; i++) {
    const letter = text[i];
    const tagEnd = i + 5;
    if (letter === "@" && text.slice(i, tagEnd) === "@tag-") {
      const tagNumber = text.slice(
        tagEnd,
        tagEnd + text.slice(tagEnd).search(/\W/)
      );
      parsedWords.push(
        <>{convertAssetTagToComponent(tags[+tagNumber], map)}</>
      );
      i = i + 4 + tagNumber.length;
    } else parsedWords.push(letter);
  }

  return <>{parsedWords}</>;
};

export const testParse = parseToTsx({
  tags: [getMockTag(), getMockTag(), getMockTag()],
  map: componentsMap,
  text: mockText
});
