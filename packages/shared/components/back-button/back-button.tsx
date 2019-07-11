import "./back-button.scss";

import { CallHistoryMethodAction, goBack, push } from "connected-react-router";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVButton from "shared/components/gv-button";
import { RootState } from "shared/reducers/root-reducer";
import { ActionType } from "shared/utils/types";

import { updateCurrency } from "../../modules/currency-select/services/currency-select.service";

export const _BackButton: React.FC<
  StateProps & WithTranslation & DispatchProps
> = ({ t, service, backPath, prevPath }) => {
  if (!backPath) return null;

  return (
    <div className="back-button">
      <GVButton
        variant="text"
        onClick={prevPath ? () => service.push(prevPath) : service.goBack}
        color="secondary"
        className="back-button__container"
      >
        <>
          <div className="back-button__back-arrow">&larr;</div>
          <div className="back-button__back">{t("buttons.back")}</div>
        </>
      </GVButton>
      <div className="back-button__path">{backPath}</div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  backPath: state.router.location.state,
  prevPath: state.router.location.prevPath
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { goBack, push },
    dispatch
  )
});

const BackButton = compose<React.FC>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_BackButton);
export default BackButton;

interface StateProps {
  backPath: string;
  prevPath?: string;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  goBack: typeof goBack;
  push: typeof push;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
