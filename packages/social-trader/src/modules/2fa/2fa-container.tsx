import "./2fa.scss";

import { fetchTwoFactorAction } from "actions/2fa-actions";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twoFactorSelector } from "reducers/2fa-reducer";

import TwoFactor, { TYPE_2FA } from "./2fa";

const _TwoFactorAuthContainer: React.FC = () => {
  const dispatch = useDispatch();
  const twoFactorAuth = useSelector(twoFactorSelector);
  const [type, setType] = useState<TYPE_2FA | undefined>(undefined);
  useEffect(() => {
    dispatch(fetchTwoFactorAction());
  }, []);
  const handleChange = useCallback(
    (event: React.ChangeEvent<any>) => setType(event.target.value),
    []
  );
  const handleClose = useCallback(() => setType(undefined), []);
  const handleSubmit = useCallback(() => dispatch(fetchTwoFactorAction()), []);
  return (
    <TwoFactor
      condition={!!twoFactorAuth}
      type={type}
      handleChange={handleChange}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      twoFactorAuth={twoFactorAuth!}
    />
  );
};
const TwoFactorAuthContainer = React.memo(_TwoFactorAuthContainer);
export default TwoFactorAuthContainer;
