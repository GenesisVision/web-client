import { CopyTradingDetailsList } from "gv-api-web";
import * as React from "react";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";
import useIsOpen from "shared/hooks/is-open.hook";

import FollowTableRowDetailed from "./follow-table-row-detailed";
import ProgramTableRowShort from "./follow-table-row-short";

const _FollowTableRow: React.FC<Props> = ({
  title,
  follow,
  isAuthenticated,
  toggleFavorite,
  showRating
}) => {
  const [isOpenDetails, setOpenDetails, setCloseDetails] = useIsOpen();
  return isOpenDetails ? (
    <FollowTableRowDetailed
      title={title}
      follow={follow}
      onCollapseClick={setCloseDetails}
      isAuthenticated={isAuthenticated}
      toggleFavorite={toggleFavorite}
    />
  ) : (
    <ProgramTableRowShort
      showRating={showRating}
      title={title}
      follow={follow}
      onExpandClick={setOpenDetails}
      toggleFavorite={toggleFavorite}
      isAuthenticated={isAuthenticated}
    />
  );
};

interface Props {
  title: string;
  showRating?: boolean;
  follow: CopyTradingDetailsList;
  isAuthenticated?: boolean;
  toggleFavorite: TableToggleFavoriteHandlerType;
}

const FollowTableRow = React.memo(_FollowTableRow);
export default FollowTableRow;
