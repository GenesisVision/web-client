import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { fetchRate } from "shared/services/rate-service";

type TUseCreateAssetValidateProps = {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
};

type TUseCreateAssetValidateOutput = (
  e?: React.FormEvent<HTMLFormElement> | undefined
) => void;

const useCreateAssetValidate = ({
  handleSubmit,
  isValid
}: TUseCreateAssetValidateProps): TUseCreateAssetValidateOutput => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  return useCallback(
    (e?: React.FormEvent<HTMLFormElement> | undefined): void => {
      handleSubmit(e);
      if (isValid) handleSubmit(e);
      else
        dispatch(
          alertMessageActions.error(
            t("manager.create-program-page.notifications.validate-error")
          )
        );
      if (e) e.preventDefault();
    },
    [handleSubmit, isValid]
  );
};
export default useCreateAssetValidate;
