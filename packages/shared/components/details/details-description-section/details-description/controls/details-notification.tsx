import "./details-description-control.scss";

import React, { ComponentType, PureComponent } from "react";
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

class DetailsNotification extends PureComponent<IDetailsNotificationProps> {
  render() {
    const { t, url, hasNotifications, title } = this.props;

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
  }
}

export default compose<ComponentType<IDetailsNotificationOwnProps>>(
  translate(),
  isAuthenticated
)(DetailsNotification);
