import { PasswordModel, RecoveryCodesViewModel } from "gv-api-web";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import Dialog from "shared/components/dialog/dialog";
import GVButton from "shared/components/gv-button";
import useApiRequest from "shared/hooks/api-request.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import { SetSubmittingType } from "shared/utils/types";

import { sendPassword } from "../../services/2fa.service";
import GoogleAuthCodes from "../google-auth-codes";
import GenerateRecoveryWithFormik from "./generate-recovery-form";

const GenerateRecoveryCode: React.FC<Props> = ({ disabled }) => {
  const [t] = useTranslation();
  const { errorMessage, data, sendRequest } = useApiRequest<
    RecoveryCodesViewModel
  >({ request: sendPassword });
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const handleSubmit = useCallback(
    (values: PasswordModel, setSubmitting: SetSubmittingType) =>
      sendRequest(values, setSubmitting),
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

interface Props {
  disabled: boolean;
}

export default React.memo(GenerateRecoveryCode);
