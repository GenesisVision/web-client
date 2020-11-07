import useApiRequestConstructor from "@pavelzubov/use-api-request";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import authService from "services/auth-service";
import { ActionType } from "utils/types";

export const cacheDispatch = ({
  dispatch,
  updateData = true,
  token = authService.getAuthArg()
}: {
  dispatch: Dispatch<any>;
  updateData?: boolean;
  token?: string;
}) => (action: ActionType) => {
  const cacheKey = action.type;
  const cacheValue = useApiRequestConstructor.getCache(cacheKey, token);
  const cacheAction: ActionType = {
    ...action,
    payload: () => Promise.resolve(cacheValue)
  };
  if (cacheValue) {
    const dispatchAction = dispatch(cacheAction);
    if (!updateData) return dispatchAction;
  }
  if (updateData || !cacheValue) {
    const dispatchAction = dispatch(action);
    // @ts-ignore
    dispatchAction.then(({ value }: { value: any; action: any }) => {
      useApiRequestConstructor.setCache(cacheKey, value, token);
    });
    return dispatchAction;
  }
};

const useCacheDispatch = () => {
  const dispatch = useDispatch();
  return useCallback(cacheDispatch({ dispatch }), []);
};

export default useCacheDispatch;
