import { useAlerts } from "hooks/alert.hook";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

type handleSubmitValue = any;

type TUseAssetValidateProps = {
  handleSubmit: (e?: handleSubmitValue) => void;
  isValid: boolean;
};

type TUseAssetValidateOutput = (e?: handleSubmitValue) => void;

const useAssetValidate = ({
  handleSubmit,
  isValid
}: TUseAssetValidateProps): TUseAssetValidateOutput => {
  const [t] = useTranslation();
  const { successAlert } = useAlerts();
  return useCallback(
    (e?: handleSubmitValue): void => {
      if (isValid) return handleSubmit(e);
      else successAlert(t("create-account-page.notifications.validate-error"));
    },
    [handleSubmit, isValid]
  );
};
export default useAssetValidate;
