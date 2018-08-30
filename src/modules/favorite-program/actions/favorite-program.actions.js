import programApi from "services/api-client/programs-api";

export const SET_FAVORITE_PROGRAM = "SET_FAVORITE_PROGRAM";

export const addFavoriteProgram = ({ programId, authorization }) => {
  return {
    type: SET_FAVORITE_PROGRAM,
    payload: programApi.v10ProgramsByIdFavoriteAddPost(
      programId,
      authorization
    ),
    meta: {
      programId: programId,
      isFavorite: true
    }
  };
};

export const removeFavoriteProgram = ({ programId, authorization }) => {
  return {
    type: SET_FAVORITE_PROGRAM,
    payload: programApi.v10ProgramsByIdFavoriteRemovePost(
      programId,
      authorization
    ),
    meta: {
      programId: programId,
      isFavorite: false
    }
  };
};
