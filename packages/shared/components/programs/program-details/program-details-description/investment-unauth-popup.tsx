import { ProgramDetailsFull } from "gv-api-web";
import { GVButton } from "gv-react-components";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import DepositTop from "shared/components/deposit/components/deposit-top";
import Dialog from "shared/components/dialog/dialog";
import { ASSET, ROLE } from "shared/constants/constants";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "shared/pages/login.routes";

const _InvestmentUnauthPopup: React.FC<Props> = ({
  open,
  onClose,
  description,
  t
}) => {
  const role = process.env.REACT_APP_PLATFORM as ROLE;
  const isOwnProgram = description.personalProgramDetails
    ? description.personalProgramDetails.isOwnProgram
    : false;
  let message = t(
    "To invest in the selected program/fund selected please login as an investor or create a new investor account."
  );

  if (role === ROLE.MANAGER && !isOwnProgram) {
    message = t(
      "In order to invest in investment programs and funds of other managers please login as an investor or create a new investor account."
    );
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DepositTop
        asset={ASSET.PROGRAM}
        role={role}
        currency={description.currency}
        title={description.title}
        availableToInvestBase={description.availableInvestmentBase}
      />
      <div className={"dialog__bottom"}>
        {message}
        <Link to={LOGIN_ROUTE}>
          <GVButton>login</GVButton>
        </Link>
        <Link to={SIGNUP_ROUTE}>
          <GVButton>signup</GVButton>
        </Link>
      </div>
    </Dialog>
  );
};

const InvestmentUnauthPopup = compose<React.FC<OwnProps>>(translate())(
  _InvestmentUnauthPopup
);

export default InvestmentUnauthPopup;

interface OwnProps {
  open: boolean;
  onClose: () => void;
  description: ProgramDetailsFull;
}

interface Props extends InjectedTranslateProps, OwnProps {}
