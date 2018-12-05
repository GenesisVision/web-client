import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import Dialog from "shared/components/dialog/dialog";

const CreateFundNavigationDialog = ({ t, open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <div className="create-fund__navigation-dialog">
      <div className="create-fund__navigation-dialog-text">
        {t("manager.create-fund-page.navigation-back-text")}
      </div>
      <GVButton
        className="create-fund__navigation-dialog-button"
        onClick={onConfirm}
        children={t("buttons.continue")}
      />
    </div>
  </Dialog>
);

export default translate()(CreateFundNavigationDialog);
