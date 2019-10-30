import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import SettingsBlock from "shared/components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useIsOpen from "shared/hooks/is-open.hook";

import ChangePasswordTradingAccountPopup from "./change-password-trading-account-popup";

const _ChangePassword: React.FC<Props> = ({ id, t, title }) => {
  const [
    isChangePasswordOpen,
    setChangePasswordOpen,
    setChangePasswordClose
  ] = useIsOpen();
  return (
    <SettingsBlock label={t("program-settings.password.title")}>
      <div>
        <p className="program-settings__text">
          {t("program-settings.password.text")}
        </p>
        <GVButton color="primary" onClick={setChangePasswordOpen}>
          {t("program-details-page.description.change-password")}
        </GVButton>
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
