import * as React from "react";
import { connect } from "react-redux";
import { Action, Dispatch, bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { closeProgram } from "shared/components/programs/program-details/services/program-details.service";
import RootState from "shared/reducers/root-reducer";

import CloseProgramForm, {
  ICloseProgramFormValues
} from "./close-program-form";

interface OwnProps {
  open: boolean;
  onClose(): void;
  onCancel(): void;
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
      programId: string,
      opts?: {
        twoFactorCode?: string | undefined;
      }
    ): Promise<void>;
  };
}

class CloseProgramContainer extends React.Component<
  OwnProps & DispatchProps & StateProps
> {
  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };
  handleSubmit = (data: ICloseProgramFormValues) => {
    const { service, onApply, id, onClose } = this.props;
    service.closeProgram(onApply, id, { twoFactorCode: data.twoFactorCode });
    onClose();
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

const mapStateToProps = (state: RootState): StateProps => {
  const twoFactorEnabled = state.accountSettings.twoFactorAuth.data
    ? state.accountSettings.twoFactorAuth.data.twoFactorEnabled
    : false;
  return { twoFactorEnabled };
};

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
