import copy from "copy-to-clipboard";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

export interface InjectedCopyProps {
  copy(message: string): void;
}

interface ICopyProps {
  successMessage?: string;
  errorMessage?: string;
  children(props: InjectedCopyProps): JSX.Element;
}

interface IDispatchMap {
  success(string: string): void;
  error(string: string): void;
}

type IOwnProps = ICopyProps & IDispatchMap;

const voidFunction = (): void => {};

class CopyHOC extends React.Component<IOwnProps> {
  onCopy = (message: string): void => {
    const { error, success, errorMessage, successMessage } = this.props;
    try {
      copy(message);
      successMessage ? success(successMessage) : voidFunction();
    } catch (e) {
      errorMessage ? error(errorMessage) : voidFunction();
    }
  };

  render() {
    return this.props.children({ copy: this.onCopy });
  }
}

const mapDispatchToProps: IDispatchMap = {
  success: alertMessageActions.success,
  error: alertMessageActions.error
};

const Copy = compose<React.FC<ICopyProps>>(
  connect<undefined, IDispatchMap, IOwnProps>(undefined, mapDispatchToProps)
)(CopyHOC);

export default Copy;
