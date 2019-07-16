import "./back-button.scss";

import { CallHistoryMethodAction, goBack, push } from "connected-react-router";
import Router, { useRouter } from "next/router";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVButton from "shared/components/gv-button";
import { WithTranslation, withTranslation } from "shared/i18n";
import { RootState } from "shared/reducers/root-reducer";
import { ActionType } from "shared/utils/types";

import { updateCurrency } from "../../modules/currency-select/services/currency-select.service";

export const _BackButton: React.FC<
  /*StateProps & */ WithTranslation /* & DispatchProps*/
> = ({ t }) => {
  // if (!backPath) return null;

  return (
    <div className="back-button">
      <GVButton
        variant="text"
        onClick={() => Router.back()}
        color="secondary"
        className="back-button__container"
      >
        <>
          <div className="back-button__back-arrow">&larr;</div>
          <div className="back-button__back">{t("buttons.back")}</div>
        </>
      </GVButton>
      {/*<div className="back-button__path">{backPath}</div>*/}
    </div>
  );
};

// const mapStateToProps = (state: RootState): StateProps => ({
//   backPath: state.router.location.state,
//   prevPath: state.router.location.prevPath
// });

// const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
//   service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
//     { goBack, push },
//     dispatch
//   )
// });

const BackButton = compose<React.FC>(
  withTranslation(),
  // connect(
  //   mapStateToProps,
  //   mapDispatchToProps
  // ),
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
