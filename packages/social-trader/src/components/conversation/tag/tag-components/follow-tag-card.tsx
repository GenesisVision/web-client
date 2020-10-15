import { AssetTagCard } from "components/conversation/tag/tag-components/asset-tag-card";
import { useToLink } from "components/link/link.helper";
import Crashable from "decorators/crashable";
import { getAssetFolderRoute } from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import React from "react";
import { composeAssetDetailsUrl } from "utils/compose-url";

import { IAssetTagProps } from "./tag-components.types";

const _FollowTagCard: React.FC<IAssetTagProps> = ({ assetDetails }) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("SignalProgram", assetDetails.url);
  const folderRoute = getAssetFolderRoute("SignalProgram");
  return (
    <AssetTagCard
      assetDetails={assetDetails}
      url={linkCreator(route, folderRoute, contextTitle)}
    />
  );
};
export const FollowTagCard = React.memo(Crashable(_FollowTagCard));
