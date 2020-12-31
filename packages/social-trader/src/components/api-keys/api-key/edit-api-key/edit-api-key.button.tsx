import { Button } from "components/button/button";
import useFlag from "hooks/flag.hook";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { ApiKeysContext } from "../../api-keys.context";
import { IApiKeyFormValues } from "../form/api-key.helpers";
import { EditApiKeyDialog } from "./edit-api-key.dialog";

interface Props {
  defaultValues: Partial<IApiKeyFormValues>;
}

const _EditApiKeyButton: React.FC<Props> = ({ defaultValues }) => {
  const [t] = useTranslation();
  const [isOpen, setIsOpen, setIsClose] = useFlag();
  const { updateTable } = useContext(ApiKeysContext);

  return (
    <>
      <Button size={"small"} onClick={setIsOpen}>
        {t("api-keys:edit-button")}
      </Button>
      <EditApiKeyDialog
        defaultValues={defaultValues}
        open={isOpen}
        onClose={() => {
          setIsClose();
          updateTable();
        }}
      />
    </>
  );
};

export const EditApiKeyButton = React.memo(_EditApiKeyButton);
