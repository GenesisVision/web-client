import { toggleFavoriteAssetDispatchable } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.service";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ASSET } from "shared/constants/constants";

export const useToggleFavoriteDispatch = () => {
  const dispatch = useDispatch();
  return useCallback(
    ({
      id,
      isFavorite,
      assetType
    }: {
      id: string;
      isFavorite: boolean;
      assetType: ASSET;
    }) => {
      dispatch(toggleFavoriteAssetDispatchable({ id, isFavorite, assetType }));
    },
    []
  );
};
