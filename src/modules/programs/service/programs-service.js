import programsActions from "../actions/programs-actions";
import walletActions from "../../wallet/actions/wallet-actions";
import walletPaneActions from "../../wallet-pane/actions/wallet-pane-actions";

import {
  LEVEL_MAX,
  LEVEL_MIN,
  PROFIT_PROGRAM_PROCENT_MAX,
  PROFIT_PROGRAM_PROCENT_MIN
} from "../programs.constants";
import * as actionTypes from "../actions/programs-actions.constants";
import authService from "../../../services/auth-service";
import filteringActionsFactory from "../../filtering/actions/filtering-actions";
import filterPaneActionsFactory from "../../filter-pane/actions/filter-pane-actions";
import {
  calculateSkipAndTake,
  calculateTotalPages
} from "../../paging/helpers/paging-helpers";
import pagingActionsFactory from "../../paging/actions/paging-actions";
import filesService from "../../../shared/services/file-service";

const getPrograms = () => (dispatch, getState) => {
  const { paging } = getState().programsData.programs;
  const { skip, take } = calculateSkipAndTake(paging);

  const { filtering } = getState().programsData.programs;

  let data = {
    filter: { skip, take }
  };
  if (authService.getAuthArg()) {
    data.authorization = authService.getAuthArg();
  }
  if (filtering.levelMin && filtering.levelMin !== LEVEL_MIN) {
    data.filter.levelMin = filtering.levelMin;
  }
  if (filtering.levelMax && filtering.levelMax !== LEVEL_MAX) {
    data.filter.levelMax = filtering.levelMax;
  }
  if (
    filtering.profitAvgPercentMin &&
    filtering.profitAvgPercentMin !== PROFIT_PROGRAM_PROCENT_MIN
  ) {
    data.filter.profitAvgPercentMin = filtering.profitAvgPercentMin;
  }
  if (
    filtering.profitAvgPercentMax &&
    filtering.profitAvgPercentMax !== PROFIT_PROGRAM_PROCENT_MAX
  ) {
    data.filter.profitAvgPercentMax = filtering.profitAvgPercentMax;
  }
  if (filtering.sorting) {
    data.filter.sorting = filtering.sorting + filtering.sortingDirection;
  }

  const setLogoAndOrder = response => {
    response.investmentPrograms.forEach((x, idx) => {
      x.logo = filesService.getFileUrl(x.logo);
      x.order = skip + idx + 1;
    });

    return response;
  };

  return dispatch(programsActions.fetchPrograms(data, setLogoAndOrder)).then(
    response => {
      const totalPages = calculateTotalPages(response.value.total, take);
      dispatch(updateProgramListPaging({ totalPages }));
      return response;
    }
  );
};

const composeFiltering = filter => {
  const filteringActions = filteringActionsFactory(actionTypes.PROGRAMS);
  let filtering = {};
  switch (filter.name) {
    case "traderLevel": {
      filtering.levelMin = filter.value.min;
      filtering.levelMax = filter.value.max;
      break;
    }
    case "profitAvgPercent": {
      filtering.profitAvgPercentMin = filter.value.min;
      filtering.profitAvgPercentMax = filter.value.max;
      break;
    }
    default: {
      filtering[filter.name] = filter.value;
    }
  }
  return filteringActions.updateFiltering(filtering);
};

const updateProgramListPaging = paging => {
  const pagingActionsProgramList = pagingActionsFactory(actionTypes.PROGRAMS);
  return pagingActionsProgramList.updatePaging(paging);
};

const changeProgramListPage = paging => dispatch => {
  dispatch(updateProgramListPaging(paging));
  dispatch(getPrograms());
};

const updateFiltering = filter => dispatch => {
  dispatch(composeFiltering(filter));
  dispatch(updateProgramListPaging({ currentPage: 0 }));
  dispatch(getPrograms());
};

const updateAfterInvestment = () => dispatch => {
  return Promise.all([
    dispatch(getPrograms()),
    dispatch(walletPaneActions.fetchWalletPaneChart()),
    dispatch(walletPaneActions.fetchWalletPaneTransactions()),
    dispatch(walletActions.fetchWallet())
  ]);
};

const closeFilterPane = () => {
  const filterPaneActions = filterPaneActionsFactory(actionTypes.PROGRAMS);
  return filterPaneActions.closeFilter();
};

const programsService = {
  getPrograms,
  changeProgramListPage,
  updateAfterInvestment,
  closeFilterPane,
  updateFiltering
};
export default programsService;
