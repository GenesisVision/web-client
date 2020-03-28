import { CloseCircleButton } from "components/close-circle-button/close-circle-button";
import ConfirmPopup from "components/confirm-popup/confirm-popup";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

const _ClosePositionButton: React.FC<Props> = ({
  id,
  symbol,
  volume,
  onApply
}) => {
  const [t] = useTranslation();
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const { sendRequest, isPending: disabled } = useApiRequest({
    successMessage: "copytrading-tables.close-trade-confirm.success-message",
    request: async (id: string) => {},
    middleware: [
      () => {
        onApply && onApply();
      },
      setClosePopup
    ]
  });
  const handleOpenClose = useCallback(() => {
    setOpenPopup();
  }, []);
  const handleApplyCancelRequest = useCallback(() => {
    return sendRequest({ id });
  }, [id]);
  return (
    <>
      <CloseCircleButton onClick={handleOpenClose} />
      <ConfirmPopup
        open={isOpenPopup}
        onClose={setClosePopup}
        onCancel={setClosePopup}
        onApply={handleApplyCancelRequest}
        header={t("copytrading-tables.close-trade-confirm.header")}
        body={t("copytrading-tables.close-trade-confirm.body", {
          symbol,
          volume
        })}
        applyButtonText={t("buttons.confirm")}
        className="dialog--wider"
        disabled={disabled}
      />
    </>
  );
};

interface Props {
  onApply?: () => void;
  symbol: string;
  volume: number;
  id: string;
}

export const ClosePositionButton = React.memo(_ClosePositionButton);
