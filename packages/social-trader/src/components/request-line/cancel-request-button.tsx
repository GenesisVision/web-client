import ConfirmPopup from "components/confirm-popup/confirm-popup";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { api, Token } from "services/api-client/swagger-custom-client";

const _CancelRequestButton: React.FC<{
  onApplyCancelRequest: () => void;
  id: string;
}> = ({ onApplyCancelRequest, id }) => {
  const [t] = useTranslation();
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const { sendRequest, isPending: disabled } = useApiRequest({
    successMessage: "request-line.success-message",
    request: (id: string) => api.investments().cancelRequest(id),
    middleware: [onApplyCancelRequest, setClosePopup]
  });
  const handleApplyCancelRequest = useCallback(() => {
    sendRequest(id);
  }, [id]);
  return (
    <>
      <GVButton
        size={GV_BTN_SIZE.SMALL}
        color={"secondary"}
        variant={"contained"}
        onClick={setOpenPopup}
      >
        {t("buttons.cancel")}
      </GVButton>
      <ConfirmPopup
        open={isOpenPopup}
        onClose={setClosePopup}
        onCancel={setClosePopup}
        onApply={handleApplyCancelRequest}
        header={t("request-line.cancel-header")}
        body={t("request-line.cancel-body")}
        applyButtonText={t("buttons.confirm")}
        className="dialog--wider"
        disabled={disabled}
      />
    </>
  );
};
export const CancelRequestButton = React.memo(_CancelRequestButton);
