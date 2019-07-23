import "./2fa.scss";

import { TwoFactorStatus } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { fetchTwoFactorAction } from "shared/actions/2fa-actions";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { twoFactorSelector } from "shared/reducers/2fa-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { ActionType } from "shared/utils/types";

import TwoFactor, { TYPE_2FA } from "./2fa";

const _TwoFactorAuthContainer: React.FC<Props> = ({
  twoFactorAuth,
  isPending,
  services
}) => {
  const [type, setType] = useState<TYPE_2FA | undefined>(undefined);
  useEffect(() => {
    services.fetchTwoFactor();
  }, []);
  const handleChange = useCallback(
    (event: React.ChangeEvent<any>) => setType(event.target.value),
    []
  );
  const handleClose = useCallback(() => setType(undefined), []);
  const handleSubmit = useCallback(() => services.fetchTwoFactor(), []);
  return (
    <TwoFactor
      condition={!!twoFactorAuth}
      type={type}
      isPending={isPending}
      handleChange={handleChange}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      twoFactorAuth={twoFactorAuth!}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  twoFactorAuth: twoFactorSelector(state),
  isPending: state.accountSettings.twoFactorAuth.isPending
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  services: bindActionCreators(
    {
      fetchTwoFactor: fetchTwoFactorAction,
      fetchProfileHeaderInfo: fetchProfileHeaderInfoAction
    },
    dispatch
  )
});

interface Props extends StateProps, DispatchProps, OwnProps {}

interface StateProps {
  isPending: boolean;
  twoFactorAuth?: TwoFactorStatus;
}

interface DispatchProps {
  services: {
    fetchTwoFactor: () => ActionType;
    fetchProfileHeaderInfo: () => ActionType;
  };
}

interface OwnProps {}

const TwoFactorAuthContainer = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_TwoFactorAuthContainer);
export default TwoFactorAuthContainer;
