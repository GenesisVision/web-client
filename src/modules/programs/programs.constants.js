export const PROGRAMS_ROUTE = "/programs";

export const LEVEL_FILTER_NAME = "level";
export const LEVEL_MIN_FILTER_NAME = "levelMin";
export const LEVEL_MAX_FILTER_NAME = "levelMax";

export const AVG_PROFIT_FILTER_NAME = "profitAvg";
export const AVG_PROFIT_MIN_FILTER_NAME = "profitAvgMin";
export const AVG_PROFIT_MAX_FILTER_NAME = "profitAvgMax";

export const TOTAL_PROFIT_MIN_FILTER_NAME = "profitTotalMin";
export const TOTAL_PROFIT_MAX_FILTER_NAME = "profitTotalMax";
export const BALANCE_MIN_FILTER_NAME = "balanceMin";
export const BALANCE_MAX_FILTER_NAME = "balanceMax";
export const SHOW_AVAILABLE_FILTER_NAME = "showAvailable";

export const LEVEL_MIN_FILTER_VALUE = 1;
export const LEVEL_MAX_FILTER_VALUE = 7;
export const AVG_PROFIT_MIN_FILTER_VALUE = 0;
export const AVG_PROFIT_MAX_FILTER_VALUE = 1000;
export const TOTAL_PROFIT_MIN_FILTER_VALUE = 0;
export const TOTAL_PROFIT_MAX_FILTER_VALUE = 1000;
export const BALANCE_MIN_FILTER_VALUE = 0;
export const BALANCE_MAX_FILTER_VALUE = 1000;
export const SHOW_AVAILABLE_FILTER_VALUE = false;

export const PROGRAMS_DEFAULT_FILTERS = [
  {
    name: LEVEL_FILTER_NAME,
    value: [LEVEL_MIN_FILTER_VALUE, LEVEL_MAX_FILTER_VALUE]
  },
  {
    name: AVG_PROFIT_FILTER_NAME,
    value: {
      min: AVG_PROFIT_MIN_FILTER_VALUE,
      max: AVG_PROFIT_MAX_FILTER_VALUE
    }
  },
  /*{ name: BALANCE_MIN_FILTER_NAME, value: BALANCE_MIN_FILTER_VALUE },
  { name: BALANCE_MAX_FILTER_NAME, value: BALANCE_MAX_FILTER_VALUE },*/
  { name: SHOW_AVAILABLE_FILTER_NAME, value: AVG_PROFIT_MIN_FILTER_VALUE }
];
