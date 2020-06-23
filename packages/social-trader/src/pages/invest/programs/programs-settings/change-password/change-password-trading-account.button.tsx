import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import useIsOpen from "hooks/is-open.hook";
import { useTranslation } from "i18n";
import React from "react";

import ChangePasswordTradingAccountPopup from "./change-password-trading-account-popup";

const _ChangeAccountPasswordButton: React.FC<{ title: string; id: string }> = ({
  title,
  id
}) => {
  const [
    isChangePasswordOpen,
    setChangePasswordOpen,
    setChangePasswordClose
  ] = useIsOpen();
  const [t] = useTranslation();
  return (
    <>
      <TableCardActionsItem onClick={setChangePasswordOpen}>
        {t("asset-actions.change-password")}
      </TableCardActionsItem>
      <ChangePasswordTradingAccountPopup
        programName={title}
        open={isChangePasswordOpen}
        id={id}
        onClose={setChangePasswordClose}
      />
    </>
  );
};

const ChangeAccountPasswordButton = React.memo(_ChangeAccountPasswordButton);
export default ChangeAccountPasswordButton;
