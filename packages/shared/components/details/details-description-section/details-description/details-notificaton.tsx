import "./details-description-control.scss";

import React from "react";
import { TranslationFunction, translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { RingIcon } from "shared/components/icon/ring-icon";
import isAuthenticated from "shared/decorators/is-authenticated";

import DetailsDescriptionControl from "./details-description-control";

export interface IDetailsNotificatonProps {
  t: TranslationFunction;
  url: string;
  hasNotifications: boolean;
  title: string;
}
const DetailsNotificaton: React.SFC<IDetailsNotificatonProps> = ({
  t,
  url,
  hasNotifications,
  title
}) => {
  return (
    <DetailsDescriptionControl
      tag={Link}
      to={{
        pathname: url,
        state: `/ ${title}`
      }}
      text={t("fund-details-page.description.notifications")}
    >
      <RingIcon
        selected={hasNotifications}
        className="details-description-control__icon"
      />
    </DetailsDescriptionControl>
  );
};

export default compose<React.FunctionComponent>(
  translate(),
  isAuthenticated
)(DetailsNotificaton);
