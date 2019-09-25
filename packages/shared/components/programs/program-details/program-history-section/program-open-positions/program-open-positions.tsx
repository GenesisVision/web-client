import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import { PROGRAM_OPEN_POSITIONS_COLUMNS } from "shared/components/programs/program-details/program-details.constants";
import TableContainer from "shared/components/table/components/table-container";
import { CurrencyEnum } from "shared/utils/types";

import {
  openPositionsSelector,
  openPositionsTableSelector
} from "../../reducers/program-history.reducer";
import { getOpenPositions } from "../../services/program-details.service";
import ProgramOpenPositionsRow from "./program-open-positions-row";
import { useSelector } from "react-redux";
import { TradesDelayHint } from "../trades-delay-hint";

export const DELAYS_LABELS = {
  None: "Without",
  FiveMinutes: "5 minutes",
  FifteenMinutes: "15 minutes",
  ThirtyMinutes: "30 minutes",
  OneHour: "1 hour",
  SixHours: "6 hours"
};

export const DELAYS = [
  {
    label: DELAYS_LABELS["None"],
    value: "None"
  },
  {
    label: DELAYS_LABELS["FiveMinutes"],
    value: "FiveMinutes"
  },
  {
    label: DELAYS_LABELS["FifteenMinutes"],
    value: "FifteenMinutes"
  },
  {
    label: DELAYS_LABELS["ThirtyMinutes"],
    value: "ThirtyMinutes"
  },
  {
    label: DELAYS_LABELS["OneHour"],
    value: "OneHour"
  },
  {
    label: DELAYS_LABELS["SixHours"],
    value: "SixHours"
  }
];

const _ProgramOpenPositions: React.FC<Props> = ({ currency, programId }) => {
  const [t] = useTranslation();
  const {
    itemsData: { data }
  } = useSelector(openPositionsSelector);
  const delay = data ? data.tradesDelay : "None";
  if (!programId) return null;
  return (
    <TableContainer
      exportButtonToolbarRender={() => <TradesDelayHint delay={delay} />}
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
