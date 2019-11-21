import { SortingColumn } from "components/table/components/filtering/filter.type";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _FollowTableHeaderCell: React.FC<{ column: SortingColumn }> = ({
  column
}) => {
  const { t } = useTranslation();
  return (
    <span
      className={`programs-table__cell  programs-table__cell--${column.name}`}
    >
      {t(`follows-page.header.${column.name}`)}
    </span>
  );
};

const FollowTableHeaderCell = withLoader(React.memo(_FollowTableHeaderCell));
export default FollowTableHeaderCell;
