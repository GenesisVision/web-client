import FormTextField from "components/assets/fields/form-text-field";
import { Button } from "components/button/button";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import withLoader from "decorators/with-loader";
import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { useTranslation } from "react-i18next";

import ChangePasswordTradingAccountPopup from "./change-password-trading-account-popup";

interface Props {
  title: string;
  id: string;
}

const _ChangePassword: React.FC<Props> = ({ id, title }) => {
  const [t] = useTranslation();
  const [
    isChangePasswordOpen,
    setChangePasswordOpen,
    setChangePasswordClose
  ] = useIsOpen();
  return (
    <SettingsBlock label={t("asset-settings:password.title")}>
      <div>
        <FormTextField>{t("asset-settings:password.text")}</FormTextField>
        <Row size={"large"}>
          <Button color="primary" onClick={setChangePasswordOpen}>
            {t("asset-details:description.change-password")}
          </Button>
        </Row>
      </div>
      <ChangePasswordTradingAccountPopup
        programName={title}
        open={isChangePasswordOpen}
        id={id}
        onClose={setChangePasswordClose}
      />
    </SettingsBlock>
  );
};

const ChangePassword = withLoader(React.memo(_ChangePassword));
export default ChangePassword;
