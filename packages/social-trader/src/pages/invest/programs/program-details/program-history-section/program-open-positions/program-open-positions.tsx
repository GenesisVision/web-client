import "components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import { PROGRAM_OPEN_POSITIONS_COLUMNS } from "pages/invest/programs/program-details/program-details.constants";
import { getOpenPositionsColumns } from "pages/invest/programs/program-details/program-history-section/program-open-positions/program-open-positions.helpers";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CurrencyEnum } from "utils/types";

import { openPositionsSelector } from "../../reducers/program-history.reducer";
import { TradesDelayHint } from "../trades-delay-hint";
import ProgramOpenPositionsRow from "./program-open-positions-row";

const _ProgramOpenPositions: React.FC<Props> = ({
  getItems,
  dataSelector,
  currency,
  programId
}) => {
  const [t] = useTranslation();
  const openPositions = useSelector(openPositionsSelector);
  const {
    itemsData: { data }
  } = openPositions;
  const delay = data ? data.tradesDelay : "None";
  if (!programId) return null;
  return (
    <TableContainer
      exportButtonToolbarRender={() => <TradesDelayHint delay={delay} />}
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      columns={getOpenPositionsColumns(data)}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${column.name}`}
        >
          {t(`program-details-page.history.open-positions.${column.name}`)}
        </span>
      )}
      renderBodyRow={position => (
        <ProgramOpenPositionsRow
          data={data!}
          position={position}
          currency={currency}
        />
      )}
    />
  );
};

interface Props {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  currency: CurrencyEnum;
  programId: string;
}

const ProgramOpenPositions = React.memo(_ProgramOpenPositions);
export default ProgramOpenPositions;
