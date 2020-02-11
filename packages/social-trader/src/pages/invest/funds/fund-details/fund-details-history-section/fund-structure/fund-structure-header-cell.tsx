import classNames from "classnames";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

export const _FundStructureHeaderCell: React.FC<WithTranslation & {
  column: SortingColumn;
}> = ({ t, column }) => (
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

const FundStructureHeaderCell = React.memo(
  translate()(_FundStructureHeaderCell)
);
export default FundStructureHeaderCell;
