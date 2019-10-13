import "shared/components/details/details-description-section/details-statistic-section/details-history/structure.scss";

import { ReallocationsViewModel } from "gv-api-web";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import { FUND_REALLOCATE_HISTORY_COLUMNS } from "shared/components/funds/fund-details/fund-details.constants";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  FilteringType,
  SortingColumn
} from "shared/components/table/components/filtering/filter.type";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { UpdateFilterFunc } from "shared/components/table/components/table.types";

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
      renderHeader={(column: SortingColumn) => {
        return <FundStructureHeaderCell column={column} />;
      }}
      renderBodyRow={(item: any) => (
        <TableRow stripy>
          <TableCell className="details-structure__cell details-structure__cell--reallocate-date">
            {moment(item.date).format()}
          </TableCell>
          <TableCell className="details-structure__cell details-structure__cell--reallocate-funds">
            <div className="details-structure__funds-asset">
              <FundAssetContainer
                //@ts-ignore
                assets={item.parts}
                type={FUND_ASSET_TYPE.SHORT}
                size={13}
                //@ts-ignore
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

const FundReallocateHistory = React.memo(_FundReallocateHistory);

export default FundReallocateHistory;

interface OwnProps {
  id: string;
}

interface Props extends OwnProps {}
