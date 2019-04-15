import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { SetSubmittingType } from "shared/utils/types";

class _ClosePeriod extends React.PureComponent<
  IClosePeriodProps & InjectedTranslateProps
> {
  handleApplyClick = (setSubmitting: SetSubmittingType) => {
    const { id, service, onApply, onClose } = this.props;
    const successFn = () => {
      onApply();
      onClose();
    };
    const errorFn = () => {
      setSubmitting(false);
    };
    service.closePeriod(id, successFn, errorFn);
  };

  render() {
    const { t, open, onClose } = this.props;
    return (
      <ConfirmPopup
        open={open}
        onClose={onClose}
        onCancel={onClose}
        onApply={this.handleApplyClick}
        header={t("program-details-page.close-period.title")}
        body={t("program-details-page.close-period.body")}
        applyButtonText={t("buttons.confirm")}
        className="dialog--wider"
      />
    );
  }
}

const ClosePeriod = translate()(_ClosePeriod);
export default ClosePeriod;

export interface IClosePeriodProps {
  id: string;
  service: {
    closePeriod: (
      programId: string,
      onSuccess: () => void,
      onError: () => void
    ) => void;
  };
  open: boolean;
  onApply(): void;
  onClose(): void;
}
