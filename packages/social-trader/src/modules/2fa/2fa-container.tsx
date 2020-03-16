import React, { useCallback, useState } from "react";
import { useTFAStatus } from "utils/2fa";

import TwoFactor, { TYPE_2FA } from "./2fa";

const _TwoFactorAuthContainer: React.FC = () => {
  const { twoFactorEnabled, updateTFAStatus } = useTFAStatus();
  const [type, setType] = useState<TYPE_2FA | undefined>(undefined);
  const handleChange = useCallback(
    (event: React.ChangeEvent<any>) => setType(event.target.value),
    []
  );
  const handleClose = useCallback(() => setType(undefined), []);
  const handleSubmit = useCallback(() => updateTFAStatus(), []);
  return (
    <TwoFactor
      condition={twoFactorEnabled !== undefined}
      type={type}
      handleChange={handleChange}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      twoFactorEnabled={twoFactorEnabled!}
    />
  );
};
const TwoFactorAuthContainer = React.memo(_TwoFactorAuthContainer);
export default TwoFactorAuthContainer;
