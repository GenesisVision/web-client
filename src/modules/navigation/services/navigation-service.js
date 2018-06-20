import { navigationClose, navigationOpen } from "../actions/navigation-actions";

const toggleNavigationState = () => (dispatch, getState) => {
  const { isOpen } = getState().navigationData;
  dispatch(isOpen ? navigationClose() : navigationOpen());
};

const navigationService = { toggleNavigationState };
export default navigationService;
