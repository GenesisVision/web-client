import "./details-description-control.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

export interface IDetailsChangePassword {
  id: string;
  onClick(): void;
}

const DetailsChangePassword: React.FC<InjectedTranslateProps & IDetailsChangePassword> = ({ t, id, onClick }) => {
  return (
    <GVButton
      variant="text"
      color="secondary"
      className={"profile-settings__password"}
      onClick={onClick}
    >
      {`${t("profile-page.settings.change-password")} `}
      <span className="profile-settings__password-arrow">&#8250;</span>
    </GVButton>
  );
};

export default compose<React.FunctionComponent>(
  translate(),
  isAuthenticated
)(DetailsChangePassword);
