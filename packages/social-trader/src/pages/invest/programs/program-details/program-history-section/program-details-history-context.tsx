import { TableRequestData } from "components/table/components/table.types";
import useApiRequest from "hooks/api-request.hook";
import { IProgramHistoryCounts } from "pages/invest/programs/program-details/program-details.types";
import { getInitProgramHistoryCounts } from "pages/invest/programs/program-details/service/program-details.service";
import React, { createContext, useEffect, useMemo, useState } from "react";

interface Props {
  isProgram?: boolean;
  id: string;
}

export type ProgramHistoryFilteringType = {
  [keys: string]: TableRequestData | undefined;
};

interface ProgramHistoryState {
  filtering: ProgramHistoryFilteringType;
  setFiltering: (value: ProgramHistoryFilteringType) => void;
  counts: IProgramHistoryCounts;
  setCounts: (value: IProgramHistoryCounts) => void;
}

export const ProgramHistoryFilteringInitialState: ProgramHistoryFilteringType = {};

export const ProgramHistoryCountsInitialState: IProgramHistoryCounts = {
  trades: 0,
  periods: 0,
  tradingLog: 0,
  openPositions: 0,
  subscriptions: 0,
  financialStatistic: 0
};

export const ProgramHistoryInitialState: ProgramHistoryState = {
  filtering: {},
  setFiltering: () => {},
  counts: ProgramHistoryCountsInitialState,
  setCounts: () => {}
};

export const ProgramHistoryContext = createContext<ProgramHistoryState>(
  ProgramHistoryInitialState
);

export const ProgramHistoryContextProvider: React.FC<Props> = ({
  isProgram,
  id,
  children
}) => {
  const [filtering, setFiltering] = useState<ProgramHistoryFilteringType>(
    ProgramHistoryFilteringInitialState
  );
  const [counts, setCounts] = useState<IProgramHistoryCounts>(
    ProgramHistoryCountsInitialState
  );
  const value = useMemo(
    () => ({ counts, setCounts, filtering, setFiltering }),
    [counts, setCounts, filtering, setFiltering]
  );

  const { data } = useApiRequest({
    request: () => getInitProgramHistoryCounts(id, isProgram),
    fetchOnMount: true
  });

  useEffect(() => {
    data && setCounts(data);
  }, [data]);

  return (
    <ProgramHistoryContext.Provider value={value}>
      {children}
    </ProgramHistoryContext.Provider>
  );
};
