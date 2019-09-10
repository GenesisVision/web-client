import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import { PROGRAM_OPEN_POSITIONS_COLUMNS } from "shared/components/programs/program-details/program-details.constants";
import TableContainer from "shared/components/table/components/table-container";
import { CurrencyEnum } from "shared/utils/types";

import { openPositionsTableSelector } from "../../reducers/program-history.reducer";
import { getOpenPositions } from "../../services/program-details.service";
import ProgramOpenPositionsRow from "./program-open-positions-row";

const _ProgramOpenPositions: React.FC<Props> = ({ currency, programId }) => {
  const [t] = useTranslation();
  return (
    <TableContainer
      getItems={getOpenPositions(programId)}
      dataSelector={openPositionsTableSelector}
      isFetchOnMount={true}
      columns={PROGRAM_OPEN_POSITIONS_COLUMNS}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${
            column.name
          }`}
        >
          {t(`program-details-page.history.open-positions.${column.name}`)}
        </span>
      )}
      renderBodyRow={position => (
        <ProgramOpenPositionsRow position={position} currency={currency} />
      )}
    />
  );
};

interface Props {
  currency: CurrencyEnum;
  programId: string;
}

const ProgramOpenPositions = React.memo(_ProgramOpenPositions);
export default ProgramOpenPositions;
