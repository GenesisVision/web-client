import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useAlerts = () => {
  const dispatch = useDispatch();
  const successAlert = useCallback((text: string) => {
    dispatch(alertMessageActions.success(text, true));
  }, []);
  const warningAlert = useCallback((text: string) => {
    dispatch(alertMessageActions.warning(text, true));
  }, []);
  const errorAlert = useCallback(
    (text: string, isUseLocalization: boolean = true) => {
      dispatch(alertMessageActions.error(text, isUseLocalization));
    },
    []
  );
  const clearAllAlerts = useCallback(() => {
    dispatch(alertMessageActions.clearAll());
  }, []);
  return {
    successAlert,
    warningAlert,
    errorAlert,
    clearAllAlerts
  };
};
