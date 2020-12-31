import { Button } from "components/button/button";
import ConfirmPopup from "components/confirm-popup/confirm-popup";
import useApiRequest from "hooks/api-request.hook";
import useFlag from "hooks/flag.hook";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

import { ApiKeysContext } from "../../api-keys.context";
import { deleteApiKey } from "../../services/api-keys.service";

interface Props {
  id: string;
  title: string;
}

const _DeleteApiKeyButton: React.FC<Props> = ({ id, title }) => {
  const [t] = useTranslation();
  const [isOpen, setIsOpen, setIsClose] = useFlag();
  const { updateTable } = useContext(ApiKeysContext);

  const { sendRequest, errorMessage } = useApiRequest({
    request: () => deleteApiKey(id),
    middleware: [updateTable, setIsClose]
  });

  const handleApply = useCallback(sendRequest, [sendRequest]);

  const body = `${t("api-keys:key-dialog.delete-text")} ${title} ?`;

  return (
    <>
      <Button size={"small"} onClick={setIsOpen}>
        {t("api-keys:delete-button")}
      </Button>
      <ConfirmPopup
        errorMessage={errorMessage}
        open={isOpen}
        onClose={setIsClose}
        onCancel={setIsClose}
        onApply={handleApply}
        header={t("api-keys:key-dialog.delete-title")}
        body={body}
        applyButtonText={t("buttons.confirm")}
      />
    </>
  );
};

export const DeleteApiKeyButton = React.memo(_DeleteApiKeyButton);
