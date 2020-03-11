import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  return useCallback(
    (e?: handleSubmitValue): void => {
      if (isValid) return handleSubmit(e);
      else
        dispatch(
          alertMessageActions.error(
            t("create-program-page.notifications.validate-error")
          )
        );
    },
    [handleSubmit, isValid]
  );
};
export default useAssetValidate;
