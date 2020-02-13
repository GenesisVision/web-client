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

export const getOpenPositionsColumns = (model?: TradesViewModel) => {
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
          sortingName: "ByDate"
        }
      : undefined,
    {
      name: "symbol",
      sortingName: "BySymbol"
    },
    showDirection
      ? {
          name: "direction",
          sortingName: "ByDirection"
        }
      : undefined,
    {
      name: "volume",
      sortingName: "ByVolume"
    },
    showPrice
      ? {
          name: "price",
          sortingName: "ByPrice"
        }
      : undefined,
    showPriceOpen
      ? {
          name: "priceCurrent",
          sortingName: "ByPriceCurrent"
        }
      : undefined,
    showProfit
      ? {
          name: "profit",
          sortingName: "ByProfit"
        }
      : undefined
  ].filter(column => column !== undefined) as SortingColumn[];
};
