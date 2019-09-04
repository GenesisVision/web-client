import "./details-description-control.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { RingIcon } from "shared/components/icon/ring-icon";
import Link from "shared/components/link/link";

import DetailsDescriptionControl from "./details-description-control";

const _DetailsNotification: React.FC<Props> = ({
  url,
  hasNotifications,
  title
}) => {
  const [t] = useTranslation();
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

interface Props {
  url: string;
  hasNotifications: boolean;
  title: string;
}

const DetailsNotification = React.memo(_DetailsNotification);
export default DetailsNotification;
