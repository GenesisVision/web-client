import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import React, { Component } from "react";
import { translate } from "react-i18next";

class ClosePeriod extends Component {
  handleApplyClick = () => {
    const { id, service, onApply, onCancel } = this.props;
    service.closePeriod(id, onApply);
    onCancel();
  };

  render() {
    const { t, open, onCancel } = this.props;
    return (
      <ConfirmPopup
        // dialogClassName="program-details-description__close-program-popup"
        open={open}
        onClose={onCancel}
        onCancel={onCancel}
        onApply={this.handleApplyClick}
        header={t("program-details-page.close-period.title")}
        body={t("program-details-page.close-period.body")}
        applyButtonText={t("buttons.confirm")}
      />
    );
  }
}

export default translate()(ClosePeriod);
