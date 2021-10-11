import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import { ASSET } from "constants/constants";
import { ToggleAssetFavoriteButton } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button";
import { ToggleableAssetType } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.types";
import React, { useCallback, useState } from "react";

interface Props {
  asset: ToggleableAssetType;
  assetType: ASSET;
}

const _IconFavoriteButton: React.FC<Props> = ({ asset, assetType }) => {
  const [programState, setProgramState] = useState(asset);
  const handleUpdateRow = useCallback(program => {
    setProgramState(program);
  }, []);
  const isFavourite =
    "personalDetails" in programState
      ? programState.personalDetails.isFavorite
      : programState.isFavorite;
  return (
    <ToggleAssetFavoriteButton
      asset={programState}
      updateRow={handleUpdateRow}
      assetType={assetType}
      id={asset.id}
      isFavorite={isFavourite}
    >
      <FavoriteIcon selected={isFavourite} />
    </ToggleAssetFavoriteButton>
  );
};

export const IconFavoriteButton = React.memo(_IconFavoriteButton);
