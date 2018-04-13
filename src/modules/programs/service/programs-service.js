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

const getPrograms = () => (dispatch, getState) => {
    const { filtering } = getState().programsData.programs;
    let data = {
        filter: {}
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
    return dispatch(programsActions.fetchPrograms(data));
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

const updateFiltering = filter => dispatch => {
    dispatch(composeFiltering(filter));
    dispatch(getPrograms());
};

const updateAfterInvestment = () => dispatch => {
  return Promise.all([
    dispatch(programsActions.fetchTradersIfNeeded()),
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
    updateAfterInvestment,
    closeFilterPane,
    updateFiltering
};
export default programsService;
