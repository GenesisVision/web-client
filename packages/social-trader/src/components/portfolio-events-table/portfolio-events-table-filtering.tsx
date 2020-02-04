import {
  getEventTypes,
  THistoryType
} from "components/portfolio-events-table/portfolio-events-table.service";
import { ASSET_TYPE_FILTER_NAME } from "components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  EVENT_TYPE_FILTER_DEFAULT_VALUE,
  EVENT_TYPE_FILTER_NAME
} from "components/table/components/filtering/event-type-filter/event-type-filter.constants";
import {
  FilteringType,
  SelectFilterValue
} from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "components/table/components/filtering/select-filter/select-filter.constants";
import { UpdateFilterFunc } from "components/table/components/table.types";
import { AssetType, EventFilters } from "gv-api-web";
import React from "react";

const _PortfolioEventsTableFiltering: React.FC<Props> = ({
  assetType,
  historyType,
  updateFilter,
  filtering,
  eventTypeFilterValues,
  assetTypeValues,
  dateRangeStartLabel
}) => {
  const eventTypes = getEventTypes(
    eventTypeFilterValues,
    historyType,
    filtering[ASSET_TYPE_FILTER_NAME] || assetType
  );
  const assetHasEventType = hasEventType(
    filtering[EVENT_TYPE_FILTER_NAME],
    eventTypes
  );
  const eventTypeValue = assetHasEventType
    ? filtering[EVENT_TYPE_FILTER_NAME]
    : EVENT_TYPE_FILTER_DEFAULT_VALUE;
  if (!assetHasEventType)
    updateFilter({ name: EVENT_TYPE_FILTER_NAME, value: eventTypeValue });
  return (
    <>
      {filtering[EVENT_TYPE_FILTER_NAME] && (
        <SelectFilter
          name={EVENT_TYPE_FILTER_NAME}
          label="Type"
          value={eventTypeValue as SelectFilterType} //TODO fix filtering types
          values={eventTypes}
          onChange={updateFilter}
        />
      )}
      {filtering[ASSET_TYPE_FILTER_NAME] && (
        <SelectFilter
          name={ASSET_TYPE_FILTER_NAME}
          label="Assets type"
          value={filtering[ASSET_TYPE_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
          values={assetTypeValues}
          onChange={updateFilter}
        />
      )}
      {filtering[DATE_RANGE_FILTER_NAME] && (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={dateRangeStartLabel}
        />
      )}
    </>
  );
};

const hasEventType = (
  type: string,
  types: SelectFilterValue<string>[]
): boolean => !!types.find(({ value }) => value === type);

interface Props {
  assetType?: AssetType;
  historyType: THistoryType;
  assetTypeValues: SelectFilterValue<string>[];
  dateRangeStartLabel: string;
  eventTypeFilterValues: EventFilters;
  updateFilter: UpdateFilterFunc;
  filtering: FilteringType;
}

const PortfolioEventsTableFiltering = React.memo(
  _PortfolioEventsTableFiltering
);
export default PortfolioEventsTableFiltering;
