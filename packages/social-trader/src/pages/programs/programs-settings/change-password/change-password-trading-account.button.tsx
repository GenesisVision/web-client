import React from "react";
import GVButton from "shared/components/gv-button";
import useIsOpen from "shared/hooks/is-open.hook";
import { useTranslation } from "shared/i18n";

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
      <GVButton
        variant="text"
        color="secondary"
        onClick={setChangePasswordOpen}
      >
        {t("program-actions.change-password")}
      </GVButton>
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
