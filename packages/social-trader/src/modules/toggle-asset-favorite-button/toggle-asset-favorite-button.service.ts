import { ASSET } from "constants/constants";
import { IApiState } from "reducers/reducer-creators/api-reducer";
import followApi from "services/api-client/follow-api";
import fundsApi from "services/api-client/funds-api";
import programsApi from "services/api-client/programs-api";
import authService from "services/auth-service";

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
  MethodType,
  TableToggleFavoriteType,
  ToggleableAssetListType,
  ToggleFavoriteDispatchableType
} from "./toggle-asset-favorite-button.types";

export const toggleFavorite = (
  id: string,
  isFavorite: boolean,
  addMethod: any,
  removeMethod: any
) => {
  const method = isFavorite ? removeMethod : addMethod;
  return method(id, authService.getAuthArg());
};

export const toggleFavoriteFund = (id: string, isFavorite: boolean) =>
  toggleFavorite(
    id,
    isFavorite,
    fundsApi.addToFavorites,
    fundsApi.removeFromFavorites
  );

export const toggleFavoriteProgram = (id: string, isFavorite: boolean) =>
  toggleFavorite(
    id,
    isFavorite,
    programsApi.addToFavorites,
    programsApi.removeFromFavorites
  );

export const toggleFavoriteFollow = (id: string, isFavorite: boolean) =>
  toggleFavorite(
    id,
    isFavorite,
    followApi.addToFavorites,
    followApi.removeFromFavorites
  );

export const toggleFavoriteAsset = ({
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
      return toggleFavoriteFollow(id, isFavorite);
    case ASSET.FUND:
      return toggleFavoriteFund(id, isFavorite);
    case ASSET.PROGRAM:
      return toggleFavoriteProgram(id, isFavorite);
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
  const { isFavorite } = asset.personalDetails;
  const newAsset = {
    ...asset,
    personalDetails: {
      ...asset.personalDetails,
      isFavorite: !isFavorite
    }
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
