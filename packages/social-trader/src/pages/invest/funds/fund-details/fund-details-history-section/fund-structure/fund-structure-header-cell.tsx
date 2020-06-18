import classNames from "classnames";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

export const _FundStructureHeaderCell: React.FC<WithTranslation & {
  column: SortingColumn;
}> = ({ t, column }) => {
  const renderCell = () => (
    <span
      className={classNames(
        `details-structure__head-cell fund-details-structure__cell--${column.name}`,
        {
          tooltip__label: column.tooltip
        }
      )}
    >
      {t(`fund-details-page.history.structure.${column.name}`)}
    </span>
  );
  return column.tooltip ? (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.LEFT}
      render={() => (
        <TooltipContent>
          {t(`fund-details-page.tooltip.${column.name}`)}
        </TooltipContent>
      )}
    >
      {renderCell()}
    </Tooltip>
  ) : (
    renderCell()
  );
};

const FundStructureHeaderCell = React.memo(
  translate()(_FundStructureHeaderCell)
);
export default FundStructureHeaderCell;
