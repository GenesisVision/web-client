import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { getAssetFolderRoute } from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import React from "react";
import { composeAssetDetailsUrl } from "utils/compose-url";

import { IAssetTagProps } from "./tag-components.types";

const _FundLink: React.FC<IAssetTagProps> = ({
  assetDetails: { url, title }
}) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("Fund", url);
  const folderRoute = getAssetFolderRoute("Fund");
  return (
    <Link to={linkCreator(route, folderRoute, contextTitle)}>{title}</Link>
  );
};
export const FundLink = React.memo(_FundLink);
