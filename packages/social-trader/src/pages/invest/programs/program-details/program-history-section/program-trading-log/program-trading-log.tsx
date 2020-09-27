import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { Text } from "components/text/text";
import React from "react";
import { useTranslation } from "react-i18next";

import { PROGRAM_TRADING_LOG_COLUMNS } from "../../program-details.constants";
import ProgramTradingLogRow from "./program-trading-log-row";

interface Props {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
}

const _ProgramTradingLog: React.FC<Props> = ({ getItems, dataSelector }) => {
  const [t] = useTranslation();
  return (
    <TableContainer
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      paging={DEFAULT_PAGING}
      columns={PROGRAM_TRADING_LOG_COLUMNS}
      renderHeader={({ name }) => (
        <Text>{t(`program-details-page:history.trading-log.${name}`)}</Text>
      )}
      renderBodyRow={trade => <ProgramTradingLogRow trade={trade} />}
    />
  );
};

const ProgramTradingLog = React.memo(_ProgramTradingLog);
export default ProgramTradingLog;
