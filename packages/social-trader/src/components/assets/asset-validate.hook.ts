import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

type TUseAssetValidateProps = {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
};

type TUseAssetValidateOutput = (
  e?: React.FormEvent<HTMLFormElement> | undefined
) => void;

const useAssetValidate = ({
  handleSubmit,
  isValid
}: TUseAssetValidateProps): TUseAssetValidateOutput => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  return useCallback(
    (e?: React.FormEvent<HTMLFormElement> | undefined): void => {
      handleSubmit(e);
      if (isValid) handleSubmit(e);
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
