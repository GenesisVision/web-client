import copy from "copy-to-clipboard";
import * as React from "react";
import { TranslationFunction, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

export interface InjectedCopyProps {
  copy(message: string): void;
}

interface ITranslatable {
  t: TranslationFunction;
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

type IOwnProps = ITranslatable & ICopyProps & IDispatchMap;

class CopyHOC extends React.Component<IOwnProps> {
  onCopy = (message: string): void => {
    const { t, error, success, errorMessage, successMessage } = this.props;
    const sMessage = successMessage || t("copy.success");
    const eMessage = errorMessage || t("copy.error");
    try {
      copy(message);
      success(sMessage);
    } catch (error) {
      error(eMessage);
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

const Copy = compose<React.FunctionComponent<ICopyProps>>(
  connect<undefined, IDispatchMap, IOwnProps>(
    undefined,
    mapDispatchToProps
  ),
  translate()
)(CopyHOC);

export default Copy;
