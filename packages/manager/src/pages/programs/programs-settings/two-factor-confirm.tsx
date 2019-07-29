import ConfirmContainer from "modules/confirm/confirm-container";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useIsOpen from "shared/hooks/is-open.hook";

import SettingsBlock from "./settings-block";

const _TwoFactorConfirm: React.FC<Props> = ({ id, t }) => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <SettingsBlock
      label={t("manager.program-settings.two-factor-confirm.title")}
      content={
        <>
          <p className="program-settings__text">
            {t("manager.program-settings.two-factor-confirm.text")}
          </p>
          <GVButton color="primary" onClick={setOpen}>
            {t("manager.program-settings.buttons.two-factor-confirm")}
          </GVButton>
          <ConfirmContainer
            open={isOpen}
            onClose={setClose}
            onApply={setClose}
            programId={id}
          />
        </>
      }
    />
  );
};

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  id: string;
}

const TwoFactorConfirm = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  React.memo
)(_TwoFactorConfirm);
export default TwoFactorConfirm;
