import "./confirm-popup.scss";

import classnames from "classnames";
import Dialog from "components/dialog/dialog";
import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";

const ConfirmPopup = ({
  t,
  open,
  onClose,
  onApply,
  onCancel,
  header,
  body,
  applyButtonText,
  cancelButtonText,
  dialogClassName,
  className,
  headerClassName,
  bodyClassName
}) => {
  applyButtonText = applyButtonText || t("buttons.apply");
  cancelButtonText = cancelButtonText || t("buttons.cancel");
  return (
    <Dialog open={open} onClose={onClose} className={dialogClassName}>
      <div className={classnames("confirm-popup", className)}>
        <div className={classnames("confirm-popup__header", headerClassName)}>
          {header}
        </div>
        <div className={classnames("confirm-popup__body", bodyClassName)}>
          {body}
        </div>
        <div className="confirm-popup__btns">
          <GVButton onClick={onApply}>{applyButtonText}</GVButton>
          {onCancel && (
            <GVButton color="secondary" variant="outlined" onClick={onCancel}>
              {cancelButtonText}
            </GVButton>
          )}
        </div>
      </div>
    </Dialog>
  );
};

ConfirmPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onApply: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.node,
  body: PropTypes.node,
  applyButtonText: PropTypes.string
};

export default translate()(ConfirmPopup);
