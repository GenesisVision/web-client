import { TranslationFunction } from "i18next";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";

export interface IProgramUnfollowProps {
  t: TranslationFunction;
  open: boolean;
  onClose(): void;
  onApply(): void;
  onCancel?(): void;
}

const ProgramUnfollow: React.FC<IProgramUnfollowProps> = ({
  t,
  open,
  onClose,
  onApply
}) => {
  return (
    <ConfirmPopup
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onApply={onApply}
      header={t("unfollow-program.title")}
      body={t("unfollow-program.text")}
      applyButtonText={t("buttons.confirm")}
      className="dialog--wider"
    />
  );
};

export default compose(translate())(ProgramUnfollow);
