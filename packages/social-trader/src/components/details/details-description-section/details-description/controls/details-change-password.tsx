import "./details-description-control.scss";

import { MoreIcon } from "components/icon/more-icon";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import DetailsDescriptionControl from "./details-description-control";

export interface IDetailsChangePassword {
  onClick(): void;
}

const DetailsChangePassword: React.FC<
  WithTranslation & IDetailsChangePassword
> = ({ t, onClick }) => {
  return (
    <DetailsDescriptionControl
      tag="button"
      className="details-description-control--button"
      onClick={onClick}
      text={t("program-details-page.description.change-password")}
    >
      <MoreIcon className="details-description-control__icon" />
    </DetailsDescriptionControl>
  );
};

export default translate()(DetailsChangePassword);
