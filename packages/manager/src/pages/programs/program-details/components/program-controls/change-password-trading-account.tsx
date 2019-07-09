import "./signal-provider-controls.scss";

import ChangePasswordTradingAccountPopup from "modules/change-password-trading-account/change-password-trading-account-popup";
import * as React from "react";
import DetailsChangePassword from "shared/components/details/details-description-section/details-description/controls/details-change-password";
import { IChangePasswordTradingAccountProps } from "shared/components/programs/program-details/program-details.types";
import useIsOpen from "shared/hooks/is-open.hook";

const ChangePasswordTradingAccount: React.FC<
  IChangePasswordTradingAccountProps
> = React.memo(({ programDescription }) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  return (
    <>
      <DetailsChangePassword onClick={setOpenPopup} />
      <ChangePasswordTradingAccountPopup
        programName={programDescription.title}
        open={isOpenPopup}
        id={programDescription.id}
        onClose={setClosePopup}
      />
    </>
  );
});

export default ChangePasswordTradingAccount;
