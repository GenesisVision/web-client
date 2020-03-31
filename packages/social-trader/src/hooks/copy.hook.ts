import copyToClipboard from "copy-to-clipboard";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { postponeFunc } from "utils/hook-form.helpers";

const useCopy = (): { copy: (value: string) => void; isSuccess: boolean } => {
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const copy = useCallback(
    (value: string) => {
      try {
        setIsSuccess(true);
        copyToClipboard(value);
      } catch (error) {
        dispatch(alertMessageActions.error("alerts.copy-error", true));
      }
      postponeFunc(() => setIsSuccess(false));
    },
    [setIsSuccess]
  );
  return { isSuccess, copy };
};

export default useCopy;
