import { RingIcon } from "components/icon/ring-icon";
import Link, { ToType } from "components/link/link";
import * as React from "react";
import { useTranslation } from "react-i18next";

import DetailsDescriptionControl from "./details-description-control";
import styles from "./details-description-control.module.scss";

const _DetailsNotification: React.FC<Props> = ({ to, hasNotifications }) => {
  const [t] = useTranslation();
  return (
    <DetailsDescriptionControl
      to={to}
      text={t("fund-details-page.description.notifications")}
    >
      <RingIcon
        selected={hasNotifications}
        className={styles["details-description-control__icon"]}
      />
    </DetailsDescriptionControl>
  );
};

interface Props {
  hasNotifications: boolean;
  to: ToType;
}

const DetailsNotification = React.memo(_DetailsNotification);
export default DetailsNotification;
