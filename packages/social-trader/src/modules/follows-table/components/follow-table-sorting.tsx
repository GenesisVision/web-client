import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

const _FollowTableSortingValue: React.FC<{ column: SortingColumn }> = ({
  column
}) => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  if (!isAuthenticated && column.name === "favorite") return null;
  const renderValue = () => <>{t(`header-fields.${column.name}`)}</>;
  return column.tooltip ? (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.LEFT}
      render={() => (
        <TooltipContent>
          {t(`follows-page:tooltips.${column.name}`)}
        </TooltipContent>
      )}
    >
      <div>{renderValue()}</div>
    </Tooltip>
  ) : (
    renderValue()
  );
};

const FollowTableSortingValue = React.memo(_FollowTableSortingValue);
export default FollowTableSortingValue;
