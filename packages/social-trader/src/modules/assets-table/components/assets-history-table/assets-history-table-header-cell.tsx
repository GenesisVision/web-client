import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  column: SortingColumn;
}

const _AssetsHistoryTableHeaderCell: React.FC<Props> = ({ column }) => {
  const { t } = useTranslation();
  const renderCell = () => <span>{t(`assets-page:header-fields.${column.name}`)}</span>;
  return column.tooltip ? (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.LEFT}
      render={() => (
        <TooltipContent>
          {t(`assets-page:tooltips.${column.name}`)}
        </TooltipContent>
      )}
    >
      {renderCell()}
    </Tooltip>
  ) : (
    renderCell()
  );
};

const AssetsHistoryTableHeaderCell = React.memo(
  _AssetsHistoryTableHeaderCell
);
export default AssetsHistoryTableHeaderCell;
