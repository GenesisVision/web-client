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
