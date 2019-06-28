import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { closeProgram } from "shared/components/programs/program-details/services/program-details.service";
import { twoFactorEnabledSelector } from "shared/reducers/2fa-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { SetSubmittingType } from "shared/utils/types";

import CloseProgramForm, {
  ICloseProgramFormValues
} from "./close-program-form";

class CloseProgramContainer extends React.Component<
  OwnProps & DispatchProps & StateProps
> {
  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };
  handleSubmit = (
    data: ICloseProgramFormValues,
    setSubmitting: SetSubmittingType
  ) => {
    const { service, onApply, id, onClose } = this.props;
    const applyFn = () => {
      onApply();
      onClose();
    };
    const errorFn = () => {
      setSubmitting(false);
    };
    service.closeProgram(applyFn, errorFn, id, {
      twoFactorCode: data.twoFactorCode
    });
  };

  render() {
    const { open, twoFactorEnabled, onClose } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose} className="dialog--wider">
        <CloseProgramForm
          onSubmit={this.handleSubmit}
          onCancel={onClose}
          twoFactorEnabled={twoFactorEnabled}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  twoFactorEnabled: twoFactorEnabledSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      closeProgram
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloseProgramContainer);

interface OwnProps {
  open: boolean;
  onClose(): void;
  onApply(): void;
  id: string;
}

interface StateProps {
  twoFactorEnabled: boolean;
}

interface DispatchProps {
  service: {
    closeProgram(
      onSuccess: () => void,
      onError: () => void,
      programId: string,
      opts?: {
        twoFactorCode?: string | undefined;
      }
    ): void;
  };
}
