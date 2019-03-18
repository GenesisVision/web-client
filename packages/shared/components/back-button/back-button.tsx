import "./back-button.scss";

import { CallHistoryMethodAction, goBack } from "connected-react-router";
import { GVButton } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import RootState from "shared/reducers/root-reducer";
import { ActionType } from "shared/utils/types";

interface IBackButtonStateProps {
  backPath: string;
}

export interface IAssetStatusRequestsDispatchProps {
  service: {
    goBack(): CallHistoryMethodAction<[]>;
  };
}

const BackButton: React.FC<
  IBackButtonStateProps &
    InjectedTranslateProps &
    IAssetStatusRequestsDispatchProps
> = ({ t, service, backPath }) => {
  if (!backPath) return null;

  return (
    <div className="back-button">
      <GVButton
        variant="text"
        onClick={service.goBack}
        color="secondary"
        className="back-button__container"
      >
        <React.Fragment>
          <div className="back-button__back-arrow">&larr;</div>
          <div className="back-button__back">{t("buttons.back")}</div>
        </React.Fragment>
      </GVButton>
      <div className="back-button__path">{backPath}</div>
    </div>
  );
};

const mapStateToProps = (state: RootState): IBackButtonStateProps => ({
  backPath: state.router.location.state
});

const mapDispatchToProps = (
  dispatch: Dispatch<ActionType>
): IAssetStatusRequestsDispatchProps => ({
  service: bindActionCreators({ goBack }, dispatch)
});

export default compose<React.FunctionComponent>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BackButton);
