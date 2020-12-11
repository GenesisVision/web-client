import { Button } from "components/button/button";
import ConfirmPopup from "components/confirm-popup/confirm-popup";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { api } from "services/api-client/swagger-custom-client";

const _CancelRequestButton: React.FC<{
  onApplyCancelRequest: () => void;
  id: string;
}> = ({ onApplyCancelRequest, id }) => {
  const [t] = useTranslation();
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const { sendRequest, isPending: disabled } = useApiRequest({
    successMessage: "asset-details:request-line.success-message",
    request: (id: string) => api.investments().cancelRequest(id),
    middleware: [onApplyCancelRequest, setClosePopup]
  });
  const handleApplyCancelRequest = useCallback(() => {
    sendRequest(id);
  }, [id]);
  return (
    <>
      <Button
        size={"small"}
        color={"secondary"}
        variant={"contained"}
        onClick={setOpenPopup}
      >
        {t("buttons.cancel")}
      </Button>
      <ConfirmPopup
        open={isOpenPopup}
        onClose={setClosePopup}
        onCancel={setClosePopup}
        onApply={handleApplyCancelRequest}
        header={t("asset-details:request-line.cancel-header")}
        body={t("asset-details:request-line.cancel-body")}
        applyButtonText={t("buttons.confirm")}
        disabled={disabled}
      />
    </>
  );
};
export const CancelRequestButton = React.memo(_CancelRequestButton);
