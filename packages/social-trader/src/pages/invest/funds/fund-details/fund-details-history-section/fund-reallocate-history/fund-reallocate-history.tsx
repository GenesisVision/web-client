import React from "react";
import { useTranslation } from "react-i18next";

const _FundReallocateHistory: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  return null;
  /*  return (
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
          <TableCell
            className={clsx(
              styles["details-structure__cell"],
              styles["details-structure__cell--reallocate-date"]
            )}
          >
            {formatDate(item.date)}
          </TableCell>
          <TableCell
            className={clsx(
              styles["details-structure__cell"],
              styles["details-structure__cell--reallocate-funds"]
            )}
          >
            <div className={styles["details-structure__funds-asset"]}>
              <FundAssetContainer
                noWrap
                assets={item.parts}
                type={"short"}
                size={13}
                length={item.parts.length}
                hasPopoverList
              />
            </div>
          </TableCell>
        </TableRow>
      )}
    />
  );*/
};

interface Props {
  id: string;
}

const FundReallocateHistory = React.memo(_FundReallocateHistory);
export default FundReallocateHistory;
