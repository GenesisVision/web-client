import programApi from "/services/api-client/program-api";

export const SET_FAVORITE_PROGRAM = "SET_FAVORITE_PROGRAM";

const addFavoriteProgram = (programId, authorization) => {
  return {
    type: SET_FAVORITE_PROGRAM,
    payload: programApi.v10ProgramByIdFavoriteAddPost(programId, authorization),
    meta: {
      programId: programId,
      isFavorite: true
    }
  };
};

const removeFavoriteProgram = (programId, authorization) => {
  return {
    type: SET_FAVORITE_PROGRAM,
    payload: programApi.v10ProgramByIdFavoriteRemovePost(
      programId,
      authorization
    ),
    meta: {
      programId: programId,
      isFavorite: false
    }
  };
};

const favoriteActions = { addFavoriteProgram, removeFavoriteProgram };

export default favoriteActions;
