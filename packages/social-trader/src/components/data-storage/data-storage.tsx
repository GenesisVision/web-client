import useApiRequest, { API_REQUEST_STATUS } from "hooks/api-request.hook";
import React, { createContext, useCallback, useMemo } from "react";
import { AnyObjectType } from "utils/types";

interface Props {
  name: string;
  fetchOnMountData?: any;
  request: (...args: any[]) => Promise<any>;
}

interface DataStorageContextState {
  status: API_REQUEST_STATUS;
  data: any;
  updateData: (...args: any[]) => void;
}

export const DataStorageInitialState = {
  updateData: () => {}
} as DataStorageContextState;

export const DataStorageContext = createContext<DataStorageContextState>(
  DataStorageInitialState
);

export const DataStorageContextProvider: React.FC<Props> = ({
  name,
  fetchOnMountData,
  children,
  request
}) => {
  const { data, sendRequest, status } = useApiRequest({
    cache: true,
    name,
    request,
    fetchOnMount: true,
    fetchOnMountData
  });

  const updateData = useCallback(
    (values?: AnyObjectType) => sendRequest({ ...fetchOnMountData, ...values }),
    [fetchOnMountData, sendRequest]
  );

  const value = useMemo(() => ({ data, updateData, status }), [
    data,
    updateData,
    status
  ]);

  return (
    <DataStorageContext.Provider value={value}>
      {children}
    </DataStorageContext.Provider>
  );
};
