import classnames from "classnames";
import Dialog from "shared/components/dialog/dialog";
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
  className
}) => {
  applyButtonText = applyButtonText || t("buttons.apply");
  cancelButtonText = cancelButtonText || t("buttons.cancel");
  return (
    <Dialog open={open} onClose={onClose} className="dialog--wider">
      <div className={classnames("dialog__top", className)}>
        <h2>
          {header}
        </h2>
        <div className="dialog__text">
          <p>
            {body}
          </p>
        </div>
        <div className="dialog__buttons">
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
