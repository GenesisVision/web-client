import copyToClipboard from "copy-to-clipboard";
import { useAlerts } from "hooks/alert.hook";
import { useCallback, useState } from "react";
import { postponeFunc } from "utils/hook-form.helpers";

const useCopy = (): { copy: (value: string) => void; isSuccess: boolean } => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { successAlert } = useAlerts();
  const copy = useCallback(
    (value: string) => {
      try {
        setIsSuccess(true);
        copyToClipboard(value);
      } catch (error) {
        successAlert("alerts.copy-error");
      }
      postponeFunc(() => setIsSuccess(false));
    },
    [setIsSuccess]
  );
  return { isSuccess, copy };
};

export default useCopy;
