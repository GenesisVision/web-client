import followApi from "services/api-client/follow-api";
import fundsApi from "services/api-client/funds-api";
import programsApi from "services/api-client/programs-api";
import authService from "services/auth-service";
import { ASSET } from "shared/constants/constants";

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
  ToggleFavoriteDispatchableType
} from "./toggle-asset-favorite-button.types";

export const toggleFavorite = (
  id: string,
  isFavorite: boolean,
  addMethod: MethodType,
  removeMethod: MethodType
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
