import * as actionTypes from "./filter-actions.constants";

const toggleFilter = () => (dispatch, getState) => {
  const isOpen = getState().filterData.isOpen;
  dispatch({
    type: actionTypes.FILTER,
    isOpen: !isOpen
  });
};

const openFilter = () => dispatch => {
  dispatch({
    type: actionTypes.FILTER,
    isOpen: true
  });
};

const closeFilter = () => dispatch => {
  dispatch({
    type: actionTypes.FILTER,
    isOpen: false
  });
};

const filterActions = {
  toggleFilter,
  openFilter,
  closeFilter
};

export default filterActions;
