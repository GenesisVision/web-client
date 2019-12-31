import { ASSET } from "constants/constants";
import { toggleFavoriteAssetDispatchable } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.service";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

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
