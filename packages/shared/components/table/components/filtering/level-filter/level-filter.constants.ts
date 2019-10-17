export type LevelFilterType = number[];

export type ComposedRequestLevelFilterNames = "levelMin" | "levelMax";
export type ComposedRequestLevelFilterValues = LevelFilterType;
export type ComposedRequestLevelFilterValue = {
  [key in ComposedRequestLevelFilterNames]?: ComposedRequestLevelFilterValues;
};
