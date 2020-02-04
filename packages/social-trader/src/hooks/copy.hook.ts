import copy from "copy-to-clipboard";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { useDispatch } from "react-redux";

const useCopy = (successMessage?: string): ((value: string) => void) => {
  const dispatch = useDispatch();
  return (value: string) => {
    try {
      copy(value);
      dispatch(
        alertMessageActions.success(
          successMessage || "alerts.copy-success",
          true
        )
      );
    } catch (error) {
      dispatch(alertMessageActions.error("alerts.copy-error", true));
    }
  };
};

export default useCopy;
