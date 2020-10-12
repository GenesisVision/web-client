import { AssetTagCard } from "components/conversation/tag/tag-components/asset-tag-card";
import { useToLink } from "components/link/link.helper";
import Crashable from "decorators/crashable";
import { getAssetFolderRoute } from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import React from "react";
import { composeAssetDetailsUrl } from "utils/compose-url";

import { IAssetTagProps } from "./tag-components.types";

const _ProgramTagCard: React.FC<IAssetTagProps> = ({ assetDetails }) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("Program", assetDetails.url);
  const folderRoute = getAssetFolderRoute("Program");
  return (
    <AssetTagCard
      assetDetails={assetDetails}
      url={linkCreator(route, folderRoute, contextTitle)}
    />
  );
};
export const ProgramTagCard = React.memo(Crashable(_ProgramTagCard));
