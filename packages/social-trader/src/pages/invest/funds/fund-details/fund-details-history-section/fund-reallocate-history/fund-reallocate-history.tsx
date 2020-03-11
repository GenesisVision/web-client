import "components/details/details-description-section/details-statistic-section/details-history/structure.scss";

import { FUND_ASSET_TYPE } from "components/fund-asset/fund-asset";
import FundAssetContainer from "components/fund-asset/fund-asset-container";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  FilteringType,
  SortingColumn
} from "components/table/components/filtering/filter.type";
import TableCell from "components/table/components/table-cell";
import TableContainer from "components/table/components/table-container";
import TableRow from "components/table/components/table-row";
import { UpdateFilterFunc } from "components/table/components/table.types";
import { ReallocationModel } from "gv-api-web";
import { FUND_REALLOCATE_HISTORY_COLUMNS } from "pages/invest/funds/fund-details/fund-details.constants";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/dates";

import { fundReallocateHistoryTableSelector } from "../../reducers/fund-reallocate-history.reducer";
import { getFundReallocateHistory } from "../../services/fund-details.service";
import FundStructureHeaderCell from "../fund-structure/fund-structure-header-cell";

const _FundReallocateHistory: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  return (
    <TableContainer
      getItems={getFundReallocateHistory(id)}
      dataSelector={fundReallocateHistoryTableSelector}
      isFetchOnMount={true}
      columns={FUND_REALLOCATE_HISTORY_COLUMNS}
      renderFilters={(
        updateFilter: UpdateFilterFunc,
        filtering: FilteringType
      ) => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.fund-start")}
        />
      )}
      renderHeader={(column: SortingColumn) => (
        <FundStructureHeaderCell column={column} />
      )}
      renderBodyRow={(item: ReallocationModel) => (
        <TableRow stripy>
          <TableCell className="details-structure__cell details-structure__cell--reallocate-date">
            {formatDate(item.date)}
          </TableCell>
          <TableCell className="details-structure__cell details-structure__cell--reallocate-funds">
            <div className="details-structure__funds-asset">
              <FundAssetContainer
                noWrap
                assets={item.parts}
                type={FUND_ASSET_TYPE.SHORT}
                size={13}
                length={item.parts.length}
                hasPopoverList
              />
            </div>
          </TableCell>
        </TableRow>
      )}
    />
  );
};

interface Props {
  id: string;
}

const FundReallocateHistory = React.memo(_FundReallocateHistory);
export default FundReallocateHistory;
