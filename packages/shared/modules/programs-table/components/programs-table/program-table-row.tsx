import { ProgramDetailsList } from "gv-api-web";
import * as React from "react";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";
import useIsOpen from "shared/hooks/is-open.hook";

import ProgramTableRowDetailed from "./program-table-row-detailed";
import ProgramTableRowShort from "./program-table-row-short";

const _ProgramTableRow: React.FC<Props> = ({
  title,
  program,
  isAuthenticated,
  toggleFavorite,
  showRating
}) => {
  const [isOpenDetails, setOpenDetails, setCloseDetails] = useIsOpen();
  return isOpenDetails ? (
    <ProgramTableRowDetailed
      title={title}
      program={program}
      onCollapseClick={setCloseDetails}
      isAuthenticated={isAuthenticated}
      toggleFavorite={toggleFavorite}
    />
  ) : (
    <ProgramTableRowShort
      showRating={showRating}
      title={title}
      program={program}
      onExpandClick={setOpenDetails}
      toggleFavorite={toggleFavorite}
      isAuthenticated={isAuthenticated}
    />
  );
};

interface Props {
  title: string;
  showRating?: boolean;
  program: ProgramDetailsList;
  isAuthenticated?: boolean;
  toggleFavorite: TableToggleFavoriteHandlerType;
}

const ProgramTableRow = React.memo(_ProgramTableRow);
export default ProgramTableRow;
