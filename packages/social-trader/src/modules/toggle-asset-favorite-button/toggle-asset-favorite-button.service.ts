import { ASSET, ASSET_INVEST } from "constants/constants";
import { IApiState } from "reducers/reducer-creators/api-reducer";
import { api } from "services/api-client/swagger-custom-client";

import {
  addFavoriteFollowAction,
  removeFavoriteFollowAction
} from "./actions/favorite-follow.actions";
import {
  addFavoriteFundAction,
  removeFavoriteFundAction
} from "./actions/favorite-fund.actions";
import {
  addFavoriteProgramAction,
  removeFavoriteProgramAction
} from "./actions/favorite-program.actions";
import {
  TableToggleFavoriteType,
  ToggleableAssetListType,
  ToggleFavoriteDispatchableType
} from "./toggle-asset-favorite-button.types";

export const toggleFavorite = (
  id: string,
  isFavorite: boolean,
  addMethod: (id: string) => any,
  removeMethod: (id: string) => any
) => {
  const method = isFavorite ? removeMethod : addMethod;
  return method(id);
};

export const toggleFavoriteFund = (id: string, isFavorite: boolean) => {
  const fundsApi = api.funds();
  return toggleFavorite(
    id,
    isFavorite,
    fundsApi.addToFavorites,
    fundsApi.removeFromFavorites
  );
};

export const toggleFavoriteProgram = (id: string, isFavorite: boolean) => {
  const programsApi = api.programs();
  return toggleFavorite(
    id,
    isFavorite,
    programsApi.addToFavorites,
    programsApi.removeFromFavorites
  );
};

export const toggleFavoriteFollow = (id: string, isFavorite: boolean) => {
  const followApi = api.follows();
  return toggleFavorite(
    id,
    isFavorite,
    followApi.addToFavorites,
    followApi.removeFromFavorites
  );
};

export const toggleFavoriteCoins = (id: string, isFavorite: boolean) => {
  const coinsApi = api.coins();
  return toggleFavorite(
    id,
    isFavorite,
    coinsApi.addToFavorites,
    coinsApi.removeFromFavorites
  );
};

export const toggleFavoriteAsset = ({
  id,
  isFavorite,
  assetType
}: {
  id: string;
  isFavorite: boolean;
  assetType: ASSET_INVEST;
}) => {
  switch (assetType) {
    case ASSET_INVEST.FOLLOW:
      return toggleFavoriteFollow(id, isFavorite);
    case ASSET_INVEST.FUND:
      return toggleFavoriteFund(id, isFavorite);
    case ASSET_INVEST.PROGRAM:
      return toggleFavoriteProgram(id, isFavorite);
    case ASSET_INVEST.COIN:
      return toggleFavoriteCoins(id, isFavorite);
  }
};

export const toggleFavoriteFundDispatchable: ToggleFavoriteDispatchableType = (
  id,
  isFavorite
) => dispatch => {
  dispatch(
    isFavorite
      ? removeFavoriteFundAction({
          id
        })
      : addFavoriteFundAction({
          id
        })
  );
};

export const toggleFavoriteProgramDispatchable: ToggleFavoriteDispatchableType = (
  id,
  isFavorite
) => dispatch => {
  dispatch(
    isFavorite
      ? removeFavoriteProgramAction({
          id
        })
      : addFavoriteProgramAction({
          id
        })
  );
};

export const toggleFavoriteFollowDispatchable: ToggleFavoriteDispatchableType = (
  id,
  isFavorite
) => dispatch => {
  dispatch(
    isFavorite
      ? removeFavoriteFollowAction({
          id
        })
      : addFavoriteFollowAction({
          id
        })
  );
};

export const toggleFavoriteAssetDispatchable = ({
  id,
  isFavorite,
  assetType
}: {
  id: string;
  isFavorite: boolean;
  assetType: ASSET;
}) => {
  switch (assetType) {
    case ASSET.FOLLOW:
      return toggleFavoriteFollowDispatchable(id, isFavorite);
    case ASSET.FUND:
      return toggleFavoriteFundDispatchable(id, isFavorite);
    case ASSET.PROGRAM:
      return toggleFavoriteProgramDispatchable(id, isFavorite);
  }
};

export const toggleFavoriteUpdateRow: TableToggleFavoriteType = (
  asset,
  updateRow
) => {
  const isFavorite =
    "personalDetails" in asset
      ? asset.personalDetails.isFavorite
      : asset.isFavorite;
  const newAsset =
    "personalDetails" in asset
      ? {
          ...asset,
          personalDetails: {
            ...asset.personalDetails,
            isFavorite: !isFavorite
          }
        }
      : {
          ...asset,
          isFavorite: !isFavorite
        };
  updateRow(newAsset);
};

export const updateFavoriteLocal = (
  state: IApiState<ToggleableAssetListType>,
  id: string,
  isFavorite: boolean
): IApiState<ToggleableAssetListType> => {
  if (!state.data) return state;
  return {
    ...state,
    data: {
      ...state.data,
      // @ts-ignore TODO why
      items: state.data.items.map((asset: any) =>
        asset.id === id
          ? {
              ...asset,
              personalDetails: {
                ...asset.personalDetails,
                isFavorite
              }
            }
          : asset
      )
    }
  };
};
