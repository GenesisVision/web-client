import { PasswordModel, RecoveryCodesViewModel } from "gv-api-web";
import React, { useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import Dialog from "shared/components/dialog/dialog";
import GVButton from "shared/components/gv-button";
import useErrorMessage from "shared/hooks/error-message.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";
import { SetSubmittingType } from "shared/utils/types";

import GoogleAuthCodes from "../google-auth-codes";
import GenerateRecoveryWithFormik from "./generate-recovery-form";

const GenerateRecoveryCode: React.FC<Props> = ({ disabled, t }) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [data, setData] = useState<RecoveryCodesViewModel | undefined>(
    undefined
  );
  const handleSubmit = useCallback(
    (values: PasswordModel, setSubmitting: SetSubmittingType) =>
      authApi
        .v10Auth2faRecoverycodesNewPost(authService.getAuthArg(), {
          model: values
        })
        .then(setData)
        .catch(setErrorMessage)
        .finally(() => {
          setSubmitting(false);
        }),
    []
  );
  if (!disabled) return null;
  return (
    <div className="generate-recovery-codes">
      <GVButton variant="text" type="button" onClick={setOpenPopup}>
        {t("2fa-page.codes.generate-recovery-codes")}
      </GVButton>
      <Dialog open={isOpenPopup} onClose={setClosePopup}>
        {data ? (
          <GoogleAuthCodes codes={(data as RecoveryCodesViewModel).codes} />
        ) : (
          <GenerateRecoveryWithFormik
            onSubmit={handleSubmit}
            errorMessage={errorMessage}
          />
        )}
      </Dialog>
    </div>
  );
};

interface Props extends WithTranslation {
  disabled: boolean;
}

export default translate()(React.memo(GenerateRecoveryCode));
