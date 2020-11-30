import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

interface Props {
  column: SortingColumn;
}

const _FundsTableHeaderCell: React.FC<Props> = ({ column }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { t } = useTranslation();
  if (!isAuthenticated && column.name === "favorite") return null;
  const renderCell = () => <span>{t(`header-fields.${column.name}`)}</span>;
  return column.tooltip ? (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.LEFT}
      render={() => (
        <TooltipContent>
          {t(`funds-page:tooltips.${column.name}`)}
        </TooltipContent>
      )}
    >
      {renderCell()}
    </Tooltip>
  ) : (
    renderCell()
  );
};

const FundsTableHeaderCell = React.memo(_FundsTableHeaderCell);
export default FundsTableHeaderCell;
