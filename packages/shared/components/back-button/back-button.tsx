import "./back-button.scss";

import { goBack, push } from "connected-react-router";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { RootState } from "shared/reducers/root-reducer";

import BackButtonBody from "./back-button-body";

export const _BackButton: React.FC<StateProps & DispatchProps> = ({
  service,
  backPath,
  prevPath
}) => {
  if (!backPath) return null;
  return (
    <BackButtonBody
      onClick={prevPath ? () => service.push(prevPath) : service.goBack}
      backPath={backPath}
    />
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
