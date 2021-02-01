import { Button } from "components/button/button";
import useFlag from "hooks/flag.hook";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { ApiKeysContext } from "../../api-keys.context";
import { AddApiKeyDialog } from "./add-api-key.dialog";

interface Props {
  id: string;
}

const _AddApiKeyButton: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const [isOpen, setIsOpen, setIsClose] = useFlag();
  const { updateTable } = useContext(ApiKeysContext);

  return (
    <>
      <Button size={"xlarge"} onClick={setIsOpen}>
        {t("api-keys:add-button")}
      </Button>
      <AddApiKeyDialog
        id={id}
        open={isOpen}
        onClose={() => {
          setIsClose();
          updateTable();
        }}
      />
    </>
  );
};

export const AddApiKeyButton = React.memo(_AddApiKeyButton);
