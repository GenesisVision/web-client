import "./details-description-control.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { RingIcon } from "shared/components/icon/ring-icon";
import isAuthenticated from "shared/decorators/is-authenticated";

import DetailsDescriptionControl from "./details-description-control";

interface IDetailsNotificationOwnProps {
  url: string;
  hasNotifications: boolean;
  title: string;
}

interface IDetailsNotificationProps
  extends IDetailsNotificationOwnProps,
    InjectedTranslateProps {}

const DetailsNotification: React.FC<IDetailsNotificationProps> = ({
  t,
  url,
  hasNotifications,
  title
}) => (
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

export default compose<React.ComponentType<IDetailsNotificationOwnProps>>(
  translate(),
  isAuthenticated,
  React.memo
)(DetailsNotification);
