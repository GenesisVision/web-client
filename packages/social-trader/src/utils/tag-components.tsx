import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { SocialPostTagType } from "gv-api-web";
import { getAssetFolderRoute } from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import { composeAssetDetailsUrl } from "utils/compose-url";

export interface IAssetLinkProps {
  url: string;
  name: string;
}

export type TagToComponentType = {
  tagType: SocialPostTagType;
  Component: React.FC<IAssetLinkProps>;
};

const _AnyTag: React.FC<IAssetLinkProps> = ({ name }) => {
  return <>{name}</>;
};
export const AnyTag = React.memo(_AnyTag);

const _ProgramLink: React.FC<IAssetLinkProps> = ({ url, name }) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("Program", url);
  const folderRoute = getAssetFolderRoute("Program");
  return <Link to={linkCreator(route, folderRoute, contextTitle)}>{name}</Link>;
};

export const ProgramLink = React.memo(_ProgramLink);
const _FundLink: React.FC<IAssetLinkProps> = ({ url, name }) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("Fund", url);
  const folderRoute = getAssetFolderRoute("Fund");
  return <Link to={linkCreator(route, folderRoute, contextTitle)}>{name}</Link>;
};
export const FundLink = React.memo(_FundLink);

const _FollowLink: React.FC<IAssetLinkProps> = ({ url, name }) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("SignalProgram", url);
  const folderRoute = getAssetFolderRoute("SignalProgram");
  return <Link to={linkCreator(route, folderRoute, contextTitle)}>{name}</Link>;
};
export const FollowLink = React.memo(_FollowLink);

const _UserLink: React.FC<IAssetLinkProps> = ({ url, name }) => {
  const { contextTitle } = useToLink();
  const to = managerToPathCreator(url, contextTitle);
  return <Link to={to}>{name}</Link>;
};
export const UserLink = React.memo(_UserLink);
