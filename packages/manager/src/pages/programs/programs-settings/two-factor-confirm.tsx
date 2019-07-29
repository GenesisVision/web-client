import ConfirmContainer from "modules/confirm/confirm-container";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import useIsOpen from "shared/hooks/is-open.hook";

const _TwoFactorConfirm: React.FC<Props> = ({ id, t }) => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <section className="program-settings__block">
      <h3>{t("manager.program-settings.two-factor-confirm.title")}</h3>
      <div className="program-settings__block-wrapper">
        <p className="program-settings__text">
          {t("manager.program-settings.two-factor-confirm.text")}
        </p>
        <GVButton color="primary" onClick={setOpen}>
          {t("manager.program-settings.buttons.two-factor-confirm")}
        </GVButton>
      </div>
      <ConfirmContainer
        open={isOpen}
        onClose={setClose}
        onApply={setClose}
        programId={id}
      />
    </section>
  );
};

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  id: string;
}

const TwoFactorConfirm = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_TwoFactorConfirm);
export default TwoFactorConfirm;
