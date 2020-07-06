import { SortingColumn } from "components/table/components/filtering/filter.type";
import { TradesViewModel } from "gv-api-web";
import { PROGRAM_OPEN_POSITIONS_COLUMNS } from "pages/invest/programs/program-details/program-details.constants";

export const DELAYS_LABELS = {
  None: "Without",
  FiveMinutes: "5 minutes",
  FifteenMinutes: "15 minutes",
  ThirtyMinutes: "30 minutes",
  OneHour: "1 hour",
  SixHours: "6 hours"
};

type DelayType = { label: string; value: any };
export const DELAYS: DelayType[] = [
  {
    label: DELAYS_LABELS["None"],
    value: "None"
  },
  {
    label: DELAYS_LABELS["FiveMinutes"],
    value: "FiveMinutes"
  },
  {
    label: DELAYS_LABELS["FifteenMinutes"],
    value: "FifteenMinutes"
  },
  {
    label: DELAYS_LABELS["ThirtyMinutes"],
    value: "ThirtyMinutes"
  },
  {
    label: DELAYS_LABELS["OneHour"],
    value: "OneHour"
  },
  {
    label: DELAYS_LABELS["SixHours"],
    value: "SixHours"
  }
];

export const OpenPositionsColumnsEmptyObject = {
  showDate: false,
  showDirection: false,
  showPrice: false,
  showPriceOpen: false,
  showProfit: false
};

export const getOpenPositionsColumns = (model?: {
  showDate: boolean;
  showDirection: boolean;
  showPrice: boolean;
  showPriceOpen: boolean;
  showProfit: boolean;
}) => {
  if (!model) return PROGRAM_OPEN_POSITIONS_COLUMNS;
  const {
    showDate,
    showDirection,
    showPrice,
    showPriceOpen,
    showProfit
  } = model;
  return [
    showDate
      ? {
          name: "date",
          sortingName: "ByDate",
          tooltip: true
        }
      : undefined,
    {
      name: "symbol",
      sortingName: "BySymbol",
      tooltip: true
    },
    showDirection
      ? {
          name: "direction",
          sortingName: "ByDirection",
          tooltip: true
        }
      : undefined,
    {
      name: "volume",
      sortingName: "ByVolume",
      tooltip: true
    },
    showPrice
      ? {
          name: "price",
          sortingName: "ByPrice",
          tooltip: true
        }
      : undefined,
    showPriceOpen
      ? {
          name: "priceCurrent",
          sortingName: "ByPriceCurrent",
          tooltip: true
        }
      : undefined,
    showProfit
      ? {
          name: "profit",
          sortingName: "ByProfit",
          tooltip: true
        }
      : undefined
  ].filter(column => column !== undefined) as SortingColumn[];
};
