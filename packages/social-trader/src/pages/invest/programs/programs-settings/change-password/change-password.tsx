import FormTextField from "components/assets/fields/form-text-field";
import GVButton from "components/gv-button";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";

import ChangePasswordTradingAccountPopup from "./change-password-trading-account-popup";

const _ChangePassword: React.FC<Props> = ({ id, t, title }) => {
  const [
    isChangePasswordOpen,
    setChangePasswordOpen,
    setChangePasswordClose
  ] = useIsOpen();
  return (
    <SettingsBlock label={t("asset-settings:password.title")}>
      <div>
        <FormTextField>{t("asset-settings:password.text")}</FormTextField>
        <Row large>
          <GVButton color="primary" onClick={setChangePasswordOpen}>
            {t("asset-details:description.change-password")}
          </GVButton>
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

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  title: string;
  id: string;
}

const ChangePassword = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  React.memo
)(_ChangePassword);
export default ChangePassword;
