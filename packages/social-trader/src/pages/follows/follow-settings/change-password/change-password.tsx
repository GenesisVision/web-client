import GVButton from "components/gv-button";
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
    <SettingsBlock label={t("follow-settings.password.title")}>
      <div>
        <p className="follow-settings__text">
          {t("follow-settings.password.text")}
        </p>
        <GVButton color="primary" onClick={setChangePasswordOpen}>
          {t("follow-details-page.description.change-password")}
        </GVButton>
      </div>
      <ChangePasswordTradingAccountPopup
        followName={title}
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
