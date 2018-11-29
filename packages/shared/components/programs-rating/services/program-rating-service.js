import {
  fetchProgramsRating,
  fetchSelfProgramsRating,
  fetchLevelUpSummary
} from "../actions/programs-rating.actions";
import { LEVELS } from "../programs-rating-table";

export const getProgramsRating = filters => dispatch => {
  const { tab, managerId, itemsOnPage, currentPage } = filters;
  const requestFilters = {
    managerId,
    levelUpFrom: LEVELS[tab],
    take: itemsOnPage,
    skip: itemsOnPage * (currentPage - 1)
  };
  return dispatch(
    managerId
      ? fetchSelfProgramsRating(requestFilters)
      : fetchProgramsRating(requestFilters)
  );
};

export const getLevelUpSummary = () => dispatch => {
  dispatch(fetchLevelUpSummary());
};
