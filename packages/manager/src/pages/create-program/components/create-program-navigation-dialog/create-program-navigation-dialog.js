import Dialog from "shared/components/dialog/dialog";
import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

const CreateProgramNavigationDialog = ({ t, open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <div className="dialog__top">
      <div className="dialog__text">
        {t("create-program-page.navigation-back-text")}
      </div>
      <div className="dialog__buttons">
        <GVButton
          onClick={onConfirm}
          children={t("buttons.continue")}
        />
      </div>
    </div>
  </Dialog>
);

export default translate()(CreateProgramNavigationDialog);
