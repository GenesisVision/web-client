import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { SetSubmittingType } from "utils/types";

type TUseAssetValidateProps = {
  handleSubmit: (
    e?: React.FormEvent<HTMLFormElement>,
    setSubmitting?: SetSubmittingType
  ) => void;
  isValid: boolean;
};

type TUseAssetValidateOutput = (
  e?: React.FormEvent<HTMLFormElement> | undefined,
  setSubmitting?: SetSubmittingType
) => void;

const useAssetValidate = ({
  handleSubmit,
  isValid
}: TUseAssetValidateProps): TUseAssetValidateOutput => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  return useCallback(
    (
      e?: React.FormEvent<HTMLFormElement> | undefined,
      setSubmitting?: SetSubmittingType
    ): void => {
      if (isValid) handleSubmit(e, setSubmitting);
      else
        dispatch(
          alertMessageActions.error(
            t("create-program-page.notifications.validate-error")
          )
        );
      if (e) e.preventDefault();
    },
    [handleSubmit, isValid]
  );
};
export default useAssetValidate;
