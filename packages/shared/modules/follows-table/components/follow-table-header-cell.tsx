import * as React from "react";
import { useTranslation } from "react-i18next";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import withLoader from "shared/decorators/with-loader";

const _FollowTableHeaderCell: React.FC<{ column: SortingColumn }> = ({
  column
}) => {
  const { t } = useTranslation();
  return (
    <span
      className={`programs-table__cell  programs-table__cell--${column.name}`}
    >
      {t(`follows-page.follows-header.${column.name}`)}
    </span>
  );
};

const FollowTableHeaderCell = withLoader(React.memo(_FollowTableHeaderCell));
export default FollowTableHeaderCell;
